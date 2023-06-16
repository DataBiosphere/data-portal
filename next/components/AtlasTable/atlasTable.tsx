import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Table } from "@clevercanary/data-explorer-ui/lib/components/Table/table";
import { Typography } from "@mui/material";
import { NETWORKS_ROUTE } from "constants/routes";
import React from "react";
import { Atlas } from "../../@types/network";

interface AtlasTableProps {
  atlases: Atlas[];
  networkPath: string;
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
          cell: ({ row }) => (
            <Link
              url={`${NETWORKS_ROUTE}/${networkPath}/${row.original.path}`}
              label={row.original.name}
            />
          ),
          header: "Atlas name",
          id: "name",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        {
          cell: () => <Typography>TBD</Typography>,
          header: "Tissue",
          id: "tissue",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        {
          cell: () => <Typography>TBD</Typography>,
          header: "Disease",
          id: "disease",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        {
          cell: () => <Typography>TBD</Typography>,
          header: "Cell Count Est.",
          id: "count",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
      ]}
    />
  );
};
