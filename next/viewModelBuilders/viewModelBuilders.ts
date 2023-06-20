import { ColumnDef } from "@tanstack/react-table";
import { Atlas } from "../@types/network";
import * as C from "../components";
import { NETWORKS_ROUTE } from "../constants/routes";

/**
 * Returns the table column definition model for the atlases table.
 * @param networkPath - Network path.
 * @returns atlases table column definition.
 */
export function getAtlasesTableColumns(
  networkPath: string
): ColumnDef<Atlas>[] {
  return [
    getAtlasesAtlasNameColumnDef(networkPath),
    getAtlasesTissueColumnDef(),
    getAtlasesDiseaseColumnDef(),
    getAtlasesCellCountColumnDef(),
  ];
}

/**
 * Returns atlases atlas name column def.
 * @param networkPath - Network path.
 * @returns atlas name column def.
 */
function getAtlasesAtlasNameColumnDef(networkPath: string): ColumnDef<Atlas> {
  return {
    accessorKey: "name",
    cell: ({ row }) =>
      C.Link({
        label: row.original.name,
        url: `${NETWORKS_ROUTE}/${networkPath}/${row.original.path}`,
      }),
    header: "Atlas name",
  };
}

/**
 * Returns atlases cell count column def.
 * @returns cell count column def.
 */
function getAtlasesCellCountColumnDef(): ColumnDef<Atlas> {
  return {
    accessorKey: "count",
    cell: "TBD",
    header: "Cell Count Est.",
  };
}

/**
 * Returns atlases disease column def.
 * @returns disease column def.
 */
function getAtlasesDiseaseColumnDef(): ColumnDef<Atlas> {
  return {
    accessorKey: "disease",
    cell: () => C.NTagCell({ label: "diseases", values: ["TBD"] }),
    header: "Disease",
  };
}

/**
 * Returns atlases tissue column def.
 * @returns tissue column def.
 */
function getAtlasesTissueColumnDef(): ColumnDef<Atlas> {
  return {
    accessorKey: "tissue",
    cell: () => C.NTagCell({ label: "tissues", values: ["TBD"] }),
    header: "Tissue",
  };
}
