import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/FluidPaper/fluidPaper";
import { GridPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { JSX } from "react";
import { Table as CommonTable } from "../../../../../../../../../common/Table/table";
import { useTable } from "./hook";
import { Props } from "./types";

/**
 * Tracker source datasets table for the Datasets tab.
 * @param props - Component props.
 * @param props.data - Tracker source datasets.
 * @returns table of tracker source datasets, or empty state if no data.
 */
export const Table = ({ data }: Props): JSX.Element => {
  const table = useTable(data);
  return (
    <FluidPaper elevation={0}>
      <GridPaper>
        {table.getRowCount() === 0 ? (
          <div>No Source Datasets</div>
        ) : (
          <CommonTable table={table} />
        )}
      </GridPaper>
    </FluidPaper>
  );
};
