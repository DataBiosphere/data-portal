import type {
  TrackerComponentAtlas,
  TrackerSourceDatasetResponse,
  TrackerSourceStudy,
} from "@/types/network";
import type { PublishedAtlas } from "./types";

// Module-level cache for published atlases during build, keyed by
// `publishedAtlasKey`. Stores the in-flight Promise so concurrent callers share
// a single fetch.
let publishedAtlasesPromise: Promise<Map<string, PublishedAtlas>> | null = null;

// Fields every item must carry as strings: the publication gate matches on
// them, so a renamed or missing field has to fail the build rather than make
// every atlas silently read as unpublished.
const PUBLISHED_ATLAS_MATCH_KEYS = [
  "shortNameSlug",
  "version",
] as const satisfies readonly (keyof PublishedAtlas)[];

/**
 * Validates the published-atlases response. Checks that the body is an array
 * and that every item carries the fields the publication gate matches on, so
 * any item missing a string `shortNameSlug` or `version` fails the build.
 * Fields used only once an atlas is resolved (e.g. `id`) are checked by
 * `resolveTrackerAtlas`, so a record for an atlas this portal does not
 * configure cannot fail the build over those.
 * @param data - Parsed response body.
 * @returns the body typed as published atlases.
 */
function assertPublishedAtlases(data: unknown): PublishedAtlas[] {
  if (!Array.isArray(data)) {
    throw new Error("Tracker /api/published-atlases returned a non-array body");
  }
  data.forEach((item, i) => {
    for (const key of PUBLISHED_ATLAS_MATCH_KEYS) {
      if (typeof item?.[key] !== "string") {
        throw new Error(
          `Tracker /api/published-atlases item ${i} has no string "${key}"`
        );
      }
    }
  });
  return data as PublishedAtlas[];
}

/**
 * Describes an error for a log message, appending its `cause` when it has one
 * (e.g. the ECONNREFUSED behind undici's "fetch failed").
 * @param err - Error to describe.
 * @returns the error and its cause as text.
 */
function describeError(err: unknown): string {
  if (err instanceof Error && err.cause) return `${err} (cause: ${err.cause})`;
  return String(err);
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
 * Returns the cached published atlases keyed by `publishedAtlasKey`, fetching
 * on first call. Failures (network error, non-2xx, malformed body or items,
 * missing tracker URL) are rethrown so the build fails deterministically rather
 * than silently omitting tracker atlases. Next.js runs getStaticPaths and
 * getStaticProps across several worker processes, each with its own
 * module-level cache, so degrading to an empty list could not be made
 * consistent across callers — one page could treat an atlas as published while
 * another omitted it, shipping tabs that 404 (see #3203). The rejected promise
 * is cleared so a long-lived `next dev` server can retry on the next request.
 * @returns published atlases keyed by slug and version.
 */
function getPublishedAtlases(): Promise<Map<string, PublishedAtlas>> {
  if (!publishedAtlasesPromise) {
    publishedAtlasesPromise = fetchTrackerApi<unknown>(
      "/api/published-atlases",
      "published atlases"
    )
      .then(assertPublishedAtlases)
      .then(mapPublishedAtlases)
      .catch((err) => {
        publishedAtlasesPromise = null;
        // The reason goes in the message, not `cause`: Next's build workers
        // send only an error's name, message and stack back to the main
        // process, so a `cause` would never reach the build log.
        throw new Error(
          `[tracker] Published atlases are unavailable: ${describeError(err)}`
        );
      });
  }
  return publishedAtlasesPromise;
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
  const atlases = await getPublishedAtlases();
  return atlases.has(publishedAtlasKey(shortNameSlug, version));
}

/**
 * Keys published atlases by `publishedAtlasKey`. When two records share a
 * slug and version the first is kept, as the previous list lookup did.
 * @param atlases - Validated published atlases.
 * @returns published atlases keyed by slug and version.
 */
function mapPublishedAtlases(
  atlases: PublishedAtlas[]
): Map<string, PublishedAtlas> {
  const byKey = new Map<string, PublishedAtlas>();
  for (const atlas of atlases) {
    const key = publishedAtlasKey(atlas.shortNameSlug, atlas.version);
    if (!byKey.has(key)) byKey.set(key, atlas);
  }
  return byKey;
}

/**
 * Returns the key a published atlas is cached under.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns key combining slug and version.
 */
function publishedAtlasKey(shortNameSlug: string, version: string): string {
  return `${shortNameSlug}@${version}`;
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
  const atlases = await getPublishedAtlases();
  const match = atlases.get(publishedAtlasKey(shortNameSlug, version));
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
