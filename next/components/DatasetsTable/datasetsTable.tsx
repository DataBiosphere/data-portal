import { Table } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/Table/table";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { ProjectResponse } from "apis/azul/hca-dcp/common/entities";
import { NETWORKS_ROUTE } from "constants/routes";
import React from "react";

interface DatasetsTableProps {
  datasets: ProjectResponse[];
  networkPath: string;
}

export const DatasetsTable = ({
  datasets,
  networkPath,
}: DatasetsTableProps): JSX.Element => {
  console.dir(datasets);
  return (
    <Table<ProjectResponse>
      items={datasets}
      gridTemplateColumns="minmax(388px, 1fr) repeat(2, minmax(124px, 1fr)) max-content"
      columns={[
        {
          cell: ({ row }) => (
            <Link
              url={`${NETWORKS_ROUTE}/${networkPath}/${row.original.projectTitle}`}
              label={row.original.projectTitle}
            />
          ),
          header: "Project Title",
          id: "projectTitle",
          meta: {
            width: { max: "1fr", min: "200px" },
          },
        },
        // {
        //   cell: ({row}) => <Typography>{row.original.}</Typography>,
        //   header: "Species",
        //   id: "species",
        //   meta: {
        //     width: { max: "1fr", min: "200px" },
        //   },
        // },
      ]}
    />
  );
};
