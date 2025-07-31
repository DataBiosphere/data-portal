import { Row, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";
import { LinkProps } from "@mui/material";
import { BIO_NETWORK_COUNT } from "./constants";

/**
 * Build bioNetwork string from the given row.
 * @param row - The row.
 * @returns The bioNetwork string.
 */
export function buildBioNetworks(row: Row<Attribute>): string {
  // Grab the bioNetwork value from the row.
  const value = row.getValue(COLUMN_IDENTIFIERS.BIO_NETWORK);

  // If the value is an array, and the number of unique values is equal to the length of the array, return "All".
  if (Array.isArray(value)) {
    if (value.length === BIO_NETWORK_COUNT) return "All";

    // Otherwise, return the value joined by ", ".
    return value.join(", ");
  }

  // Throw an error if the value is not an array.
  throw new Error("Invalid bioNetwork value");
}

/**
 * Build example string array from the given attribute.
 * @param attribute - The attribute.
 * @returns The example string array.
 */
export function buildExample(attribute: Attribute): string[] {
  if (!attribute.example) return [];
  return attribute.example.split(";").map((value) => value.trim());
}

/**
 * Build source LinkProps from the given row.
 * Replaces LinkProps with HCA LinkProps for source value "HCA".
 * @param row - The row.
 * @returns LinkProps.
 */
export function buildSource(row: Row<Attribute>): LinkProps {
  const value = row.getValue(COLUMN_IDENTIFIERS.SOURCE);
  if (value === "HCA") return { children: "HCA", href: "" };
  return row.original.source;
}

/**
 * Checks if the tier column is configured in the table, and tier is present in the annotations.
 * @param table - The table.
 * @param row - The row.
 * @returns True if the tier column is configured and tier is present in the annotations, false otherwise.
 */
export function shouldShowTierColumn(
  table: Table<Attribute>,
  row: Row<Attribute>
): boolean {
  // Tier column is configured.
  const isConfigured = table
    .getAllColumns()
    .some((col) => col.id === COLUMN_IDENTIFIERS.TIER);

  if (!isConfigured) return false;

  return Boolean(row.original.annotations?.tier);
}
