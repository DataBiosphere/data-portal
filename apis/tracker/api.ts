import type {
  TrackerComponentAtlas,
  TrackerSourceDatasetResponse,
  TrackerSourceStudy,
} from "@/types/network";
import { readFile } from "fs/promises";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { inspect } from "util";
import { PUBLISHED_ATLASES_SNAPSHOT_ENV } from "./constants";
import type { PublishedAtlas } from "./types";

// Module-level cache for published atlases during build. Stores the in-flight
// Promise so concurrent callers share a single load.
let publishedAtlasesPromise: Promise<PublishedAtlas[]> | null = null;

// Advice appended when `next build` runs without a snapshot path.
const BUILD_HINT =
  "(run `npm run build`, which snapshots the published atlases before `next build`)";

// Advice appended when the build's snapshot file is gone, e.g. removed by a tmp
// cleaner mid-build.
const SNAPSHOT_MISSING_HINT =
  "(the snapshot `scripts/build.sh` wrote for this build was removed; run the build again)";

// Fields an item must carry as strings for the publication gate to match on
// it. Items missing one are skipped, and a body where every item is missing one
// fails the build, so a renamed field cannot make every atlas silently read as
// unpublished.
const PUBLISHED_ATLAS_MATCH_KEYS = [
  "shortNameSlug",
  "version",
] as const satisfies readonly (keyof PublishedAtlas)[];

/**
 * Fetches and validates the tracker's published atlases. Used directly by
 * `next dev` and by the snapshot script that runs before `next build`.
 * Failures (network error, non-2xx, malformed body, missing tracker URL) are
 * rethrown with the reason in the message.
 * @returns published atlases.
 */
export async function fetchPublishedAtlases(): Promise<PublishedAtlas[]> {
  try {
    const data = await fetchTrackerApi<unknown>(
      "/api/published-atlases",
      "published atlases"
    );
    return parsePublishedAtlases(data);
  } catch (err) {
    throw publishedAtlasesError(err);
  }
}

/**
 * Fetches JSON from a tracker API endpoint.
 * @param path - API path (e.g., "/api/published-atlases").
 * @param label - Human-readable label for error messages.
 * @returns parsed JSON response.
 */
async function fetchTrackerApi<T>(path: string, label: string): Promise<T> {
  const response = await fetch(`${getTrackerUrl()}${path}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${label}: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

/**
 * Fetches component atlases (integrated objects) for a tracker atlas.
 * @param atlasId - Atlas ID (UUID).
 * @returns list of component atlases.
 */
export function fetchTrackerComponentAtlases(
  atlasId: string
): Promise<TrackerComponentAtlas[]> {
  return fetchTrackerApi(
    `/api/atlases/${atlasId}/component-atlases`,
    "component atlases"
  );
}

/**
 * Fetches source datasets for a tracker atlas.
 * @param atlasId - Atlas ID (UUID).
 * @returns list of source datasets.
 */
export function fetchTrackerSourceDatasets(
  atlasId: string
): Promise<TrackerSourceDatasetResponse[]> {
  return fetchTrackerApi(
    `/api/atlases/${atlasId}/source-datasets`,
    "source datasets"
  );
}

/**
 * Fetches source studies for a tracker atlas.
 * @param atlasId - Atlas ID (UUID).
 * @returns list of source studies.
 */
export function fetchTrackerSourceStudies(
  atlasId: string
): Promise<TrackerSourceStudy[]> {
  return fetchTrackerApi(
    `/api/atlases/${atlasId}/source-studies`,
    "source studies"
  );
}

/**
 * Finds the published atlas with the given slug and version. When two records
 * match, the first is returned.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns the published atlas, or undefined when it is not published.
 */
async function findPublishedAtlas(
  shortNameSlug: string,
  version: string
): Promise<PublishedAtlas | undefined> {
  const atlases = await getPublishedAtlases();
  return atlases.find(
    (atlas) =>
      atlas.shortNameSlug === shortNameSlug && atlas.version === version
  );
}

/**
 * Returns the cached published atlases, loading them on first call. Failures
 * are rethrown so the build fails deterministically rather than silently
 * omitting tracker atlases; the rejected promise is cleared so a long-lived
 * `next dev` server can retry on the next request.
 * @returns published atlases.
 */
function getPublishedAtlases(): Promise<PublishedAtlas[]> {
  if (!publishedAtlasesPromise) {
    publishedAtlasesPromise = loadPublishedAtlases().catch((err) => {
      publishedAtlasesPromise = null;
      throw err;
    });
  }
  return publishedAtlasesPromise;
}

/**
 * Returns the tracker base URL, read at call time to ensure env vars are loaded.
 * @returns tracker base URL.
 */
function getTrackerUrl(): string {
  const url = process.env.NEXT_PUBLIC_ATLAS_TRACKER_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_ATLAS_TRACKER_URL is not configured");
  }
  return url;
}

/**
 * Checks whether a tracker atlas is currently published.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns true if the atlas is published.
 */
export async function isTrackerAtlasPublished(
  shortNameSlug: string,
  version: string
): Promise<boolean> {
  return (await findPublishedAtlas(shortNameSlug, version)) !== undefined;
}

/**
 * Loads the published atlases. `next build` reads the snapshot that
 * `scripts/build.sh` writes before the build: Next runs getStaticPaths and
 * getStaticProps across several worker processes, each with its own
 * module-level cache, so fetching per worker could let pages disagree on which
 * atlases are published if the tracker changed mid-build, shipping tabs that
 * 404 (see #3203). A `next build` without the snapshot (e.g. a bare `npx next
 * build`) therefore fails. Anything else, such as `next dev`, fetches live,
 * even if the snapshot variable leaked into its environment.
 * @returns published atlases.
 */
function loadPublishedAtlases(): Promise<PublishedAtlas[]> {
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    return fetchPublishedAtlases();
  }
  const snapshotPath = process.env[PUBLISHED_ATLASES_SNAPSHOT_ENV];
  if (!snapshotPath) {
    return Promise.reject(
      publishedAtlasesError(
        `${PUBLISHED_ATLASES_SNAPSHOT_ENV} is not set`,
        BUILD_HINT
      )
    );
  }
  return readPublishedAtlasesSnapshot(snapshotPath);
}

/**
 * Validates the published-atlases response. The body must be an array. Items
 * missing a string `shortNameSlug` or `version` are skipped with a warning, so
 * a malformed record for an atlas this portal does not configure cannot fail
 * the build, but a body where every item is malformed fails it. Fields used
 * only once an atlas is resolved (e.g. `id`) are checked by
 * `resolveTrackerAtlas`.
 * @param data - Parsed response body.
 * @returns the well-formed items, typed as published atlases.
 */
function parsePublishedAtlases(data: unknown): PublishedAtlas[] {
  if (!Array.isArray(data)) {
    throw new Error("Tracker /api/published-atlases returned a non-array body");
  }
  const atlases = data.filter((item, i) => {
    const missingKey = PUBLISHED_ATLAS_MATCH_KEYS.find(
      (key) => typeof item?.[key] !== "string"
    );
    if (missingKey === undefined) return true;
    console.warn(
      `[tracker] Skipping /api/published-atlases item ${i}: no string "${missingKey}"`
    );
    return false;
  });
  if (data.length > 0 && atlases.length === 0) {
    throw new Error(
      `Tracker /api/published-atlases has no item with string ${PUBLISHED_ATLAS_MATCH_KEYS.join(" and ")} fields`
    );
  }
  return atlases;
}

/**
 * Builds the error thrown when the published atlases cannot be loaded. The
 * reason goes in the message, not `cause`: Next's build workers send only an
 * error's name, message and stack back to the main process, so a `cause` would
 * never reach the build log. A string reason is used as is; anything else is
 * printed with `util.inspect`, which includes the underlying error's stack,
 * Node error details (code, address, port), `cause` chain and AggregateError
 * `errors`.
 * @param reason - The underlying failure, or a description of it.
 * @param hint - Optional advice on how to fix it.
 * @returns error describing the failure.
 */
function publishedAtlasesError(reason: unknown, hint?: string): Error {
  const text =
    typeof reason === "string"
      ? reason
      : inspect(reason, { breakLength: Infinity, depth: 5 });
  const parts = [`[tracker] Published atlases are unavailable: ${text}`, hint];
  return new Error(parts.filter(Boolean).join("\n"));
}

/**
 * Reads this build's published-atlases snapshot.
 * @param snapshotPath - Path of the snapshot written by `scripts/build.sh`.
 * @returns published atlases.
 */
async function readPublishedAtlasesSnapshot(
  snapshotPath: string
): Promise<PublishedAtlas[]> {
  try {
    const text = await readFile(snapshotPath, "utf8");
    return parsePublishedAtlases(JSON.parse(text));
  } catch (err) {
    const missing = (err as NodeJS.ErrnoException).code === "ENOENT";
    throw publishedAtlasesError(
      err,
      missing ? SNAPSHOT_MISSING_HINT : undefined
    );
  }
}

/**
 * Resolves the published atlas record from the slug and version.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns published atlas.
 */
export async function resolveTrackerAtlas(
  shortNameSlug: string,
  version: string
): Promise<PublishedAtlas> {
  const match = await findPublishedAtlas(shortNameSlug, version);
  if (!match) {
    throw new Error(
      `No published atlas found for slug="${shortNameSlug}" version="${version}"`
    );
  }
  if (typeof match.id !== "string") {
    throw new Error(
      `Published atlas slug="${shortNameSlug}" version="${version}" has no string "id"`
    );
  }
  return match;
}

/**
 * Resolves the tracker atlas ID from the slug and version.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns atlas ID (UUID).
 */
export async function resolveTrackerAtlasId(
  shortNameSlug: string,
  version: string
): Promise<string> {
  const { id } = await resolveTrackerAtlas(shortNameSlug, version);
  return id;
}
