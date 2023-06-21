import { AzulListParams } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { transformFilters } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/filterTransformer";

export const filterSpecimenOrgan = (value: string[]): AzulListParams => {
  return {
    filters: transformFilters([
      {
        categoryKey: "specimenOrgan",
        value,
      },
    ]),
  };
};

export const filterProjectId = (value: string[]): AzulListParams => {
  return {
    filters: transformFilters([
      {
        categoryKey: "projectId",
        value,
      },
    ]),
  };
};
