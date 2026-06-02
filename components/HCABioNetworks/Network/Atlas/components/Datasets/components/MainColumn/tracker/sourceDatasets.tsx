import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/components/FluidPaper/fluidPaper";
import { GridPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { JSX } from "react";
import { ColumnFilters } from "../../../../../../../../common/Filters/components/ColumnFilters/columnFilters";
import { ColumnFilterTags } from "../../../../../../../../common/Filters/components/ColumnFilterTags/columnFilterTags";
import { Table } from "../../../../../../../../common/Table/table";
import { useTable } from "./components/table/hook";
import { StyledBox } from "./sourceDatasets.styles";
import { Props } from "./types";

/**
 * Tracker source datasets view for the Datasets tab.
 * @param props - Component props.
 * @param props.data - Tracker source datasets.
 * @returns tracker source datasets view.
 */
export const SourceDatasets = ({ data }: Props): JSX.Element => {
  const table = useTable(data);

  return (
    <>
      <ColumnFilters table={table} />
      <ColumnFilterTags table={table} />
      <FluidPaper elevation={0}>
        {table.getRowCount() === 0 ? (
          <StyledBox>No Source Datasets</StyledBox>
        ) : (
          <GridPaper>
            <Table table={table} />
          </GridPaper>
        )}
      </FluidPaper>
    </>
  );
};
