import { ColumnFiltersTableMeta } from "@databiosphere/findable-ui/lib/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/types";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";

/**
 * Table meta for the source datasets table: the column-filter config plus the
 * environment's browser URL, which `renderPrimaryData` needs to build HCA Data
 * Explorer links. Typed so the producer (`useTable`) and the consumer cannot
 * drift - an unchecked cast would let a renamed key silently empty the column.
 */
export interface SourceDatasetsTableMeta extends ColumnFiltersTableMeta<TrackerSourceDataset> {
  browserUrl: string;
}

export const META: ColumnFiltersTableMeta<TrackerSourceDataset> = {
  categoryGroups: [
    {
      categoryConfigs: [
        { key: "assay", label: "Assay" },
        { key: "tissue", label: "Tissue" },
        { key: "disease", label: "Disease" },
        { key: "sourceStudy", label: "Source Study" },
        { key: "integratedObject", label: "Integrated Object" },
        { key: "journal", label: "Journal" },
        { key: "referenceAuthor", label: "Reference Author" },
      ],
      label: "",
    },
  ],
};
