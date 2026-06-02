import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/FluidPaper/fluidPaper";
import { GridPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { JSX } from "react";
import { Table } from "../../../../../../../../common/Table/table";
import { useTable } from "./components/Table/hook";
import { Props } from "./types";

/**
 * Tracker source studies view for the Source Studies tab.
 * @param props - Component props.
 * @param props.data - Tracker source studies.
 * @returns tracker source studies view.
 */
export const SourceStudies = ({ data }: Props): JSX.Element => {
  const table = useTable(data);

  return (
    <FluidPaper elevation={0}>
      <GridPaper>
        {table.getRowCount() === 0 ? (
          <div>No Source Studies</div>
        ) : (
          <Table table={table} />
        )}
      </GridPaper>
    </FluidPaper>
  );
};
