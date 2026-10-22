import { BIO_NETWORK_COUNT } from "@/components/DataDictionary/components/TableCell/components/DetailCell/constants";
import { buildRequiredLabel } from "@/components/DataDictionary/components/TableCell/components/FieldCell/utils";
import tier1 from "@/site-config/data-portal/dev/dataDictionary/tier-1.json";
import { buildRequired } from "@/viewModelBuilders/dataDictionaryMapper/accessorFn";
import { buildDataDictionary } from "@/viewModelBuilders/dataDictionaryMapper/dataDictionaryMapper";
import type { DataDictionary } from "@databiosphere/findable-ui/lib/common/entities";
import ExcelJS from "exceljs";
import { mkdirSync } from "fs";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import slugify from "slugify";
import { unified } from "unified";

const OUTPUT_DIR = "public/downloads";
const OUTPUT_PATH = `${OUTPUT_DIR}/hca-tier-1-metadata.xlsx`;

// The live Tier 1 dictionary, for links back to a field's row.
const DICTIONARY_URL = "https://data.humancellatlas.org/metadata/tier-1";

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

// Block-level nodes whose children are separated by a space; all other nodes join their children directly.
const BLOCK_TYPES = new Set(["blockquote", "list", "listItem", "root"]);

interface MarkdownNode {
  children?: MarkdownNode[];
  type: string;
  url?: string;
  value?: string;
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
  if (bioNetworks.length === BIO_NETWORK_COUNT) return "ALL";
  return bioNetworks.join(", ");
}

/**
 * Converts a parsed Markdown node to plain text.
 * Tables are replaced by a link to the field's row in the dictionary, and links keep their text, followed by their URL unless it points within the page.
 * @param node - Markdown node.
 * @param fieldUrl - URL of the field's row in the dictionary.
 * @returns Plain text.
 */
function nodeToText(node: MarkdownNode, fieldUrl: string): string {
  if (node.type === "table") return `(See the table at ${fieldUrl})`;
  if (node.type === "break") return " ";
  if (node.value !== undefined) return node.value;
  const separator = BLOCK_TYPES.has(node.type) ? " " : "";
  const text = (node.children ?? [])
    .map((child) => nodeToText(child, fieldUrl))
    .join(separator);
  if (node.type === "link" && node.url && !node.url.startsWith("#"))
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
  return nodeToText(root, fieldUrl).replace(/\s+/g, " ").trim();
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

  let index = 0;
  classes.forEach((cls) => {
    cls.attributes.forEach((attribute) => {
      sheet.addRow({
        annDataLocation: attribute.annotations?.annDataLocation,
        bioNetworks: formatBioNetworks(attribute.annotations?.bioNetworks),
        class: cls.title,
        description: toPlainText(attribute.name, attribute.description),
        example: attribute.example,
        index: ++index,
        multivalued: attribute.multivalued,
        name: attribute.name,
        range: attribute.range,
        required: buildRequiredLabel(attribute, buildRequired(attribute)),
        title: attribute.title,
        values: toPlainText(attribute.name, attribute.values),
      });
    });
  });

  mkdirSync(OUTPUT_DIR, { recursive: true });
  await workbook.xlsx.writeFile(OUTPUT_PATH);
  console.log(`Wrote ${OUTPUT_PATH} (${index} fields)`);
}

buildTier1MetadataXlsx();
