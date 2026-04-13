import type {
  TrackerComponentAtlas,
  TrackerSourceDataset,
  TrackerSourceStudy,
} from "../../@types/network";
import type { PublishedAtlas } from "./types";

const TRACKER_URL = process.env.NEXT_PUBLIC_ATLAS_TRACKER_URL || "";

// Module-level cache for published atlases during build.
let publishedAtlasesCache: PublishedAtlas[] | null = null;

/**
 * Fetches JSON from a tracker API endpoint.
 * @param path - API path (e.g., "/api/published-atlases").
 * @param label - Human-readable label for error messages.
 * @returns parsed JSON response.
 */
async function fetchTrackerApi<T>(path: string, label: string): Promise<T> {
  if (!TRACKER_URL) {
    throw new Error("NEXT_PUBLIC_ATLAS_TRACKER_URL is not configured");
  }
  const response = await fetch(`${TRACKER_URL}${path}`);
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
 * Resolves the tracker atlas ID from the slug and version.
 * @param shortNameSlug - Atlas short name slug (e.g., "gut").
 * @param version - Atlas version (e.g., "v1.0").
 * @returns atlas ID (UUID).
 */
export async function resolveTrackerAtlasId(
  shortNameSlug: string,
  version: string
): Promise<string> {
  if (!publishedAtlasesCache) {
    publishedAtlasesCache = await fetchTrackerApi<PublishedAtlas[]>(
      "/api/published-atlases",
      "published atlases"
    );
  }
  const match = publishedAtlasesCache.find(
    (a) => a.shortNameSlug === shortNameSlug && a.version === version
  );
  if (!match) {
    throw new Error(
      `No published atlas found for slug="${shortNameSlug}" version="${version}"`
    );
  }
  return match.id;
}
