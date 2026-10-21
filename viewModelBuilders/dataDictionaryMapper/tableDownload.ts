import { buildRequiredLabel } from "@/components/DataDictionary/components/TableCell/components/FieldCell/utils";
import { formatDataToTSV } from "@databiosphere/findable-ui/lib/components/Table/features/TableDownload/onDownload/utils";
import type { Table } from "@tanstack/react-table";
import { buildRequired } from "./accessorFn";
import type { Attribute } from "./types";

const TIER_1_TSV_HEADERS = [
  "Class",
  "Field Name",
  "Title",
  "Description",
  "Requirement",
  "BioNetworks",
  "AnnData Location",
  "Range",
  "Allowed Values",
  "Example",
  "Multivalued",
];

/**
 * Builds the Tier 1 TSV row for the given attribute.
 * @param attribute - Attribute.
 * @returns The TSV row values.
 */
function buildTier1TsvRow(attribute: Attribute): unknown[] {
  return [
    attribute.classKey,
    attribute.name,
    attribute.title,
    attribute.description,
    buildRequiredLabel(attribute, buildRequired(attribute)),
    attribute.annotations?.bioNetworks,
    attribute.annotations?.annDataLocation,
    attribute.range,
    attribute.values,
    attribute.example,
    attribute.multivalued,
  ];
}

/**
 * Downloads the full Tier 1 dictionary as a TSV file, one row per field.
 * The UTF-8 byte order mark lets Excel read non-ASCII characters correctly.
 * @param table - Table.
 */
export function onTier1TableDownload(table: Table<Attribute>): void {
  const rows = table
    .getCoreRowModel()
    .rows.map((row) => buildTier1TsvRow(row.original));
  const tsv = formatDataToTSV([TIER_1_TSV_HEADERS, ...rows]);
  const url = URL.createObjectURL(
    new Blob(["﻿", tsv], { type: "text/tab-separated-values" })
  );
  const anchorEl = document.createElement("a");
  anchorEl.href = url;
  anchorEl.download = "hca-tier-1-metadata.tsv";
  anchorEl.click();
  URL.revokeObjectURL(url);
}
