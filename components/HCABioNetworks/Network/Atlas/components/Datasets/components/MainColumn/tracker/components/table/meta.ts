import { ColumnFiltersTableMeta } from "@databiosphere/findable-ui/lib/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/types";
import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";

export const META: ColumnFiltersTableMeta<TrackerSourceDataset> = {
  categoryGroups: [
    {
      categoryConfigs: [
        { key: "assay", label: "Assay" },
        { key: "tissue", label: "Tissue" },
        { key: "disease", label: "Disease" },
        { key: "sourceStudy", label: "Source Study" },
        { key: "integratedObject", label: "Integrated Object" },
      ],
      label: "",
    },
  ],
};
