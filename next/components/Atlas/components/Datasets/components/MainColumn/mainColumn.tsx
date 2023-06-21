import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import React from "react";
import { DetailViewTable } from "../../../../../common/Table/table.styles";

export const MainColumn = (): JSX.Element => {
  return (
    <DetailViewTable
      columns={[]}
      gridTemplateColumns="minmax(522px, 1fr) repeat(4, minmax(124px, 1fr)) max-content" // TODO review gridTemplateColumns.
      items={[]}
      noResultsTitle={"No Datasets"}
      Paper={FluidPaper}
      tools={null}
    />
  );
};
