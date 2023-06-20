import {
  FluidPaper,
  GridPaper,
} from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { useNetwork } from "contexts/networkContext";
import React from "react";
import { DatasetsTable } from "../../../components/DatasetsTable/datasetsTable";

export const NetworkDetailMainColumn = (): JSX.Element => {
  const {
    datasets,
    network: { path },
  } = useNetwork();

  return (
    <FluidPaper>
      <GridPaper>
        <DatasetsTable datasets={datasets} networkPath={path} />
      </GridPaper>
    </FluidPaper>
  );
};
