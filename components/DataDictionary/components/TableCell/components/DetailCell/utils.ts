import { Row } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";
import { LinkProps } from "@mui/material";

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
