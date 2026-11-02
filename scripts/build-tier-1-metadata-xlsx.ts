import { BIO_NETWORK_COUNT } from "@/components/DataDictionary/components/TableCell/components/DetailCell/constants";
import { ROUTES } from "@/routes/constants";
import tier1 from "@/site-config/data-portal/dev/dataDictionary/tier-1.json";
import { buildRequired } from "@/viewModelBuilders/dataDictionaryMapper/accessorFn";
import { TIER_1_DOWNLOAD } from "@/viewModelBuilders/dataDictionaryMapper/constants";
import { buildDataDictionary } from "@/viewModelBuilders/dataDictionaryMapper/dataDictionaryMapper";
import type { Attribute } from "@/viewModelBuilders/dataDictionaryMapper/types";
import { REQUIREMENT_LABEL } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { DataDictionary } from "@databiosphere/findable-ui/lib/common/entities";
import ExcelJS from "exceljs";
import { mkdirSync } from "fs";
import { dirname } from "path";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import slugify from "slugify";
import { unified } from "unified";

// The file is served from public/ at the dictionary's download link.
const OUTPUT_PATH = `public${TIER_1_DOWNLOAD.href}`;

// The live Tier 1 dictionary, for links back to a field's row.
const DICTIONARY_URL = `https://data.humancellatlas.org${ROUTES.METADATA_TIER_1}`;

const COLUMNS: Partial<ExcelJS.Column>[] = [
  { header: "#", key: "index", width: 5 },
  { header: "Field name", key: "title", width: 30 },
  { header: "Field programmatic name", key: "name", width: 34 },
  { header: "Description", key: "description", width: 60 },
  { header: "Data type", key: "range", width: 12 },
  { header: "Categorical values", key: "values", width: 40 },
  { header: "Examples", key: "example", width: 30 },
  { header: "Required", key: "required", width: 26 },
  { header: "Encoded by", key: "class", width: 16 },
  { header: "BioNetworks", key: "bioNetworks", width: 30 },
  { header: "AnnData Location", key: "annDataLocation", width: 18 },
  { header: "Multivalued", key: "multivalued", width: 12 },
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
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Tier 1 metadata", {
    views: [{ state: "frozen", ySplit: 1 }],
  });
  sheet.columns = COLUMNS;

  sheet.getRow(1).font = { bold: true };

  const rows = classes.flatMap((cls) =>
    cls.attributes.map((attribute) => ({ attribute, cls }))
  );
  rows.forEach(({ attribute, cls }, i) => {
    sheet.addRow({
      annDataLocation: attribute.annotations?.annDataLocation,
      bioNetworks: formatBioNetworks(attribute.annotations?.bioNetworks),
      class: cls.title,
      description: toPlainText(attribute.name, attribute.description),
      example: attribute.example,
      index: i + 1,
      multivalued: attribute.multivalued,
      name: attribute.name,
      range: attribute.range,
      required: formatRequired(attribute),
      title: attribute.title,
      values: toPlainText(attribute.name, attribute.values),
    });
  });

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  await workbook.xlsx.writeFile(OUTPUT_PATH);
  console.log(`Wrote ${OUTPUT_PATH} (${rows.length} fields)`);
}

/**
 * Formats the bioNetworks for a cell, as "ALL" when the field applies to every bioNetwork.
 * @param bioNetworks - BioNetworks.
 * @returns The bioNetworks cell value.
 */
function formatBioNetworks(
  bioNetworks?: string | string[]
): string | undefined {
  if (!Array.isArray(bioNetworks)) return bioNetworks;
  if (isAllBioNetworks(bioNetworks)) return "ALL";
  return bioNetworks.join(", ");
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
