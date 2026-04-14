import type { TrackerSourceStudy } from "../../../../../../../../../../@types/network";

/**
 * Builds a formatted citation string for a source study.
 * Published studies display as "Author (Year) Journal".
 * Unpublished studies display as "Author - Unpublished".
 * @param row - Tracker source study.
 * @returns formatted citation string.
 */
export function buildSourceStudy(row: TrackerSourceStudy): string {
  if (!row.doi) return `${row.referenceAuthor} - Unpublished`;

  if (!row.publicationDate || !row.journal) return row.referenceAuthor;

  const publicationYear = new Date(row.publicationDate).getFullYear();

  return `${row.referenceAuthor} (${publicationYear}) ${row.journal}`;
}
