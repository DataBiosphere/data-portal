import type {
  TrackerComponentAtlas,
  TrackerSourceDataset,
  TrackerSourceStudy,
} from "../../@types/network";
import type { PublishedAtlas } from "./types";

// Module-level cache for published atlases during build. Stores the in-flight
// Promise so concurrent callers share a single fetch.
let publishedAtlasesPromise: Promise<PublishedAtlas[]> | null = null;

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
): Promise<TrackerSourceDataset[]> {
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
 * On failure (network error, non-2xx, malformed body), logs a warning and
 * resolves to an empty list so callers can fall back to "no atlases
 * published" — protecting non-tracker pages from tracker outages.
 * @returns list of published atlases.
 */
function getPublishedAtlases(): Promise<PublishedAtlas[]> {
  if (!publishedAtlasesPromise) {
    publishedAtlasesPromise = fetchTrackerApi<unknown>(
      "/api/published-atlases",
      "published atlases"
    )
      .then((data) => {
        if (!Array.isArray(data)) {
          console.warn(
            `Tracker /api/published-atlases returned a non-array body; treating as empty.`
          );
          return [];
        }
        return data as PublishedAtlas[];
      })
      .catch((err) => {
        console.warn(
          `Failed to fetch published atlases from tracker; treating as empty. ${err}`
        );
        publishedAtlasesPromise = null;
        return [];
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
 * Resolves the tracker atlas ID from the slug and version.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns atlas ID (UUID).
 */
export async function resolveTrackerAtlasId(
  shortNameSlug: string,
  version: string
): Promise<string> {
  const atlases = await getPublishedAtlases();
  const match = atlases.find(
    (a) => a.shortNameSlug === shortNameSlug && a.version === version
  );
  if (!match) {
    throw new Error(
      `No published atlas found for slug="${shortNameSlug}" version="${version}"`
    );
  }
  return match.id;
}
