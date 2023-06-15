import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Table } from "@clevercanary/data-explorer-ui/lib/components/Table/table";
import { Typography } from "@mui/material";
import { NETWORKS_ROUTE } from "constants/routes";
import React from "react";
import { Atlas } from "../../@types/network";

interface AtlasTableProps {
  networkPath: string;
  atlases: Atlas[];
}

export const AtlasTable = ({
  atlases,
  networkPath,
}: AtlasTableProps): JSX.Element => {
  return (
    <Table<Atlas>
      items={atlases}
      pageSize={atlases.length}
      initialState={{}}
      listView={{
        disablePagination: true,
      }}
      columns={[
        {
          id: "name",
          cell: ({ row }) => (
            <Link
              url={`${NETWORKS_ROUTE}/${networkPath}/${row.original.path}`}
              label={row.original.name}
            />
          ),
          header: "Atlas name",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        {
          id: "tissue",
          cell: () => <Typography>TBD</Typography>,
          header: "Tissue",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        {
          id: "disease",
          cell: () => <Typography>TBD</Typography>,
          header: "Disease",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        {
          id: "count",
          cell: () => <Typography>TBD</Typography>,
          header: "Cell Count Est.",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
      ]}
    />
  );
};
