import { BIO_NETWORK_COUNT } from "@/components/DataDictionary/components/TableCell/components/DetailCell/constants";
import { ROUTES } from "@/routes/constants";
import tier1 from "@/site-config/data-portal/dev/dataDictionary/tier-1.json";
import { buildRequired } from "@/viewModelBuilders/dataDictionaryMapper/accessorFn";
import { TIER_1_DOWNLOAD } from "@/viewModelBuilders/dataDictionaryMapper/constants";
import { buildDataDictionary } from "@/viewModelBuilders/dataDictionaryMapper/dataDictionaryMapper";
import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import { REQUIREMENT_LABEL } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { DataDictionary } from "@databiosphere/findable-ui/lib/common/entities";
import { mkdirSync } from "fs";
import { dirname } from "path";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import slugify from "slugify";
import { unified } from "unified";
import writeXlsxFile, { type Column } from "write-excel-file/node";

// The file is served from public/ at the dictionary's download link.
const OUTPUT_PATH = `public${TIER_1_DOWNLOAD.href}`;

// The live Tier 1 dictionary, for links back to a field's row.
const DICTIONARY_URL = `https://data.humancellatlas.org${ROUTES.METADATA_TIER_1}`;

interface FieldRow {
  attribute: Attribute;
  className: string;
}

const COLUMNS: Column<FieldRow>[] = [
  column("#", 5, (_, i) => i + 1),
  column("Field name", 30, ({ attribute }) => attribute.title),
  column("Field programmatic name", 34, ({ attribute }) => attribute.name),
  column("Description", 60, ({ attribute }) =>
    toPlainText(attribute.name, attribute.description)
  ),
  column("Data type", 12, ({ attribute }) => attribute.range),
  column("Categorical values", 40, ({ attribute }) =>
    toPlainText(attribute.name, attribute.values)
  ),
  column("Examples", 30, ({ attribute }) => attribute.example),
  column("Required", 26, ({ attribute }) => formatRequired(attribute)),
  column("Encoded by", 16, ({ className }) => className),
  column("BioNetworks", 30, ({ attribute }) =>
    formatBioNetworks(attribute.annotations?.bioNetworks)
  ),
  column(
    "AnnData Location",
    18,
    ({ attribute }) => attribute.annotations?.annDataLocation
  ),
  column("Multivalued", 12, ({ attribute }) => attribute.multivalued),
];

const markdownParser = unified().use(remarkParse).use(remarkGfm);

// Separators between the children of block-level nodes: list items by "; ", other blocks by a space. All other nodes join their children directly.
const BLOCK_SEPARATORS: Record<string, string> = {
  blockquote: " ",
  list: "; ",
  listItem: " ",
  root: " ",
};

interface MarkdownNode {
  children?: MarkdownNode[];
  type: string;
  url?: string;
  value?: string;
}

/**
 * Builds the Tier 1 metadata dictionary as an XLSX file in public/downloads, one row per field.
 */
async function buildTier1MetadataXlsx(): Promise<void> {
  const { classes } = buildDataDictionary(tier1 as unknown as DataDictionary);
  const rows = classes.flatMap((cls) =>
    cls.attributes.map((attribute) => ({ attribute, className: cls.title }))
  );

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  await writeXlsxFile(
    rows,
    { columns: COLUMNS, sheet: "Tier 1 metadata", stickyRowsCount: 1 },
    // Declares the font explicitly, as the sheet has no theme to take it from.
    { fontFamily: "Calibri", fontSize: 11 }
  ).toFile(OUTPUT_PATH);
  console.log(`Wrote ${OUTPUT_PATH} (${rows.length} fields)`);
}

/**
 * Builds a column with a bold header cell and a fixed width. List values are joined with ", ".
 * @param header - Header text.
 * @param width - Column width, in characters.
 * @param value - Returns the cell value for a row and its zero-based index.
 * @returns The column.
 */
function column(
  header: string,
  width: number,
  value: (
    row: FieldRow,
    index: number
  ) => boolean | number | string | string[] | undefined
): Column<FieldRow> {
  return {
    cell: (row, index): boolean | number | string | undefined => {
      const cellValue = value(row, index);
      return Array.isArray(cellValue) ? cellValue.join(", ") : cellValue;
    },
    header: { fontWeight: "bold", value: header },
    width,
  };
}

/**
 * Formats the bioNetworks for a cell, as "ALL" when the field applies to every bioNetwork.
 * @param bioNetworks - BioNetworks.
 * @returns The bioNetworks cell value.
 */
function formatBioNetworks(
  bioNetworks?: string | string[]
): string | string[] | undefined {
  if (Array.isArray(bioNetworks) && isAllBioNetworks(bioNetworks)) return "ALL";
  return bioNetworks;
}

/**
 * Formats the requirement level for a cell, listing the bioNetworks for required fields that apply to only some bioNetworks.
 * @param attribute - Attribute.
 * @returns The requirement cell value, e.g. "Required (Adipose, Gut)".
 */
function formatRequired(attribute: Attribute): string {
  const level = buildRequired(attribute);
  if (level !== REQUIREMENT_LABEL.REQUIRED) return level;
  const bioNetworks = attribute.annotations?.bioNetworks;
  if (!Array.isArray(bioNetworks) || isAllBioNetworks(bioNetworks))
    return level;
  return `${level} (${bioNetworks.join(", ")})`;
}

/**
 * Returns true when the bioNetworks are every bioNetwork.
 * @param bioNetworks - BioNetworks.
 * @returns True when the field applies to every bioNetwork.
 */
function isAllBioNetworks(bioNetworks: string[]): boolean {
  return bioNetworks.length === BIO_NETWORK_COUNT;
}

/**
 * Converts a parsed Markdown node to plain text.
 * Tables are replaced by a link to the field's row in the dictionary, list items are separated by "; ", and links keep their text, followed by their URL unless it points within the page or is the link text.
 * @param node - Markdown node.
 * @param fieldUrl - URL of the field's row in the dictionary.
 * @returns Plain text.
 */
function nodeToText(node: MarkdownNode, fieldUrl: string): string {
  if (node.type === "table") return `(See the table at ${fieldUrl})`;
  if (node.type === "break") return " ";
  if (node.value !== undefined) return node.value;
  const separator = BLOCK_SEPARATORS[node.type] ?? "";
  const text = (node.children ?? [])
    .map((child) => nodeToText(child, fieldUrl))
    .join(separator);
  // Bare URLs become links whose text is the URL, so only add the URL when it differs.
  if (
    node.type === "link" &&
    node.url &&
    !node.url.startsWith("#") &&
    text !== node.url
  )
    return `${text} (${node.url})`;
  return text;
}

/**
 * Converts the dictionary's Markdown to single-line plain text for spreadsheet cells.
 * @param fieldName - Field name, for links back to the field's row.
 * @param markdown - Markdown text.
 * @returns Plain text.
 */
function toPlainText(fieldName: string, markdown?: string): string | undefined {
  if (!markdown) return markdown;
  const root = markdownParser.parse(markdown) as MarkdownNode;
  const fieldUrl = `${DICTIONARY_URL}#${slugify(fieldName)}`;
  return (
    nodeToText(root, fieldUrl)
      .replace(/\s+/g, " ")
      // Drop the list item separator after an item that already ends in punctuation.
      .replace(/([.!?:;]); /g, "$1 ")
      .trim()
  );
}

buildTier1MetadataXlsx().catch((err) => {
  console.error(err);
  process.exit(1);
});
