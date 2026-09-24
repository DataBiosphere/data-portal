import type {
  TrackerComponentAtlas,
  TrackerSourceDatasetResponse,
  TrackerSourceStudy,
} from "../../@types/network";
import type { PublishedAtlas } from "./types";

// Module-level cache for published atlases during build. Stores the in-flight
// Promise so concurrent callers share a single fetch.
let publishedAtlasesPromise: Promise<PublishedAtlas[]> | null = null;

// Fields the publication gate matches on or resolves; each must be a string.
const PUBLISHED_ATLAS_REQUIRED_KEYS = [
  "id",
  "shortNameSlug",
  "version",
] as const satisfies readonly (keyof PublishedAtlas)[];

/**
 * Validates the published-atlases response. Checks that the body is an array
 * and that every item carries the fields the publication gate matches on, so
 * a renamed or missing field fails the build instead of every atlas silently
 * reading as unpublished.
 * @param data - Parsed response body.
 * @returns the body typed as published atlases.
 */
function assertPublishedAtlases(data: unknown): PublishedAtlas[] {
  if (!Array.isArray(data)) {
    throw new Error("Tracker /api/published-atlases returned a non-array body");
  }
  data.forEach((item, i) => {
    for (const key of PUBLISHED_ATLAS_REQUIRED_KEYS) {
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
 * Returns the cached list of published atlases, fetching on first call.
 * Failures (network error, non-2xx, malformed body or items, missing tracker
 * URL) are rethrown so the build fails deterministically rather than silently
 * omitting tracker atlases. Next.js runs getStaticPaths and getStaticProps
 * across several worker processes, each with its own module-level cache, so
 * degrading to an empty list could not be made consistent across callers —
 * one page could treat an atlas as published while another omitted it,
 * shipping tabs that 404 (see #3203). The rejected promise is cleared so a
 * long-lived `next dev` server can retry on the next request.
 * @returns list of published atlases.
 */
function getPublishedAtlases(): Promise<PublishedAtlas[]> {
  if (!publishedAtlasesPromise) {
    publishedAtlasesPromise = fetchTrackerApi<unknown>(
      "/api/published-atlases",
      "published atlases"
    )
      .then(assertPublishedAtlases)
      .catch((err) => {
        publishedAtlasesPromise = null;
        // Keep the original error as `cause` so the underlying reason (e.g.
        // ECONNREFUSED behind undici's "fetch failed") reaches the log.
        throw new Error("[tracker] Published atlases are unavailable", {
          cause: err,
        });
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
  return atlases.some(
    (a) => a.shortNameSlug === shortNameSlug && a.version === version
  );
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
  const match = atlases.find(
    (a) => a.shortNameSlug === shortNameSlug && a.version === version
  );
  if (!match) {
    throw new Error(
      `No published atlas found for slug="${shortNameSlug}" version="${version}"`
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
