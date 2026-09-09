import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";

// Facet value for a source study with no journal, matching the label the
// removed Source Studies table used.
const JOURNAL_UNPUBLISHED = "Unpublished";

/**
 * Returns the names of the integrated objects (sourced from the legacy
 * `componentAtlases` field on the tracker API) for a source dataset.
 * @param row - Tracker source dataset.
 * @returns array of integrated-object names.
 */
export function buildIntegratedObjects(row: TrackerSourceDataset): string[] {
  return row.componentAtlases?.map(({ name }) => name) ?? [];
}

/**
 * Returns the journal of a source dataset's source study, falling back to
 * "Unpublished" when the study has no journal (or the build-time join missed).
 * @param row - Tracker source dataset.
 * @returns journal name, or "Unpublished".
 */
export function buildJournal(row: TrackerSourceDataset): string {
  return row.journal || JOURNAL_UNPUBLISHED;
}

/**
 * Returns the reference author of a source dataset's source study. The tracker
 * always sets this on a source study, so the fallback covers only a missed
 * build-time join — hence "Unspecified" rather than "Unpublished".
 * @param row - Tracker source dataset.
 * @returns reference author, or "Unspecified".
 */
export function buildReferenceAuthor(row: TrackerSourceDataset): string {
  return row.referenceAuthor || LABEL.UNSPECIFIED;
}
