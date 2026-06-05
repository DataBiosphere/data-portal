import type { TrackerSourceStudy } from "../../../../../../../../../../../@types/network";

/**
 * Returns the names of the integrated objects for a source study.
 * @param row - Tracker source study.
 * @returns array of integrated-object names.
 */
export function buildIntegratedObjects(row: TrackerSourceStudy): string[] {
  return row.integratedObjects?.map(({ name }) => name) ?? [];
}

/**
 * Builds a formatted citation string for a source study.
 * - No DOI: "Author - Unpublished"
 * - DOI but missing date/journal: "Author"
 * - DOI with date and journal: "Author (Year) Journal"
 * @param row - Tracker source study.
 * @returns formatted citation string.
 */
export function buildSourceStudy(row: TrackerSourceStudy): string {
  if (!row.doi) return `${row.referenceAuthor} - Unpublished`;

  if (!row.publicationDate || !row.journal) return row.referenceAuthor;

  const publicationYear = new Date(row.publicationDate).getFullYear();

  return `${row.referenceAuthor} (${publicationYear}) ${row.journal}`;
}
