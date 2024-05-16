import { AzulListParams } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { transformFilters } from "@databiosphere/findable-ui/lib/apis/azul/common/filterTransformer";

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
