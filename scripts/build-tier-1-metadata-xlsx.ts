import { BIO_NETWORK_COUNT } from "@/components/DataDictionary/components/TableCell/components/DetailCell/constants";
import { buildRequiredLabel } from "@/components/DataDictionary/components/TableCell/components/FieldCell/utils";
import tier1 from "@/site-config/data-portal/dev/dataDictionary/tier-1.json";
import { buildRequired } from "@/viewModelBuilders/dataDictionaryMapper/accessorFn";
import { buildDataDictionary } from "@/viewModelBuilders/dataDictionaryMapper/dataDictionaryMapper";
import type { DataDictionary } from "@databiosphere/findable-ui/lib/common/entities";
import ExcelJS from "exceljs";
import { mkdirSync } from "fs";

const OUTPUT_DIR = "public/downloads";
const OUTPUT_PATH = `${OUTPUT_DIR}/hca-tier-1-metadata.xlsx`;

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
 * Converts the dictionary's Markdown to plain text for spreadsheet cells.
 * In-page links keep their text, other links keep their text and URL, and code and emphasis markers are removed.
 * Line breaks and repeated spaces become single spaces so every cell stays on one line.
 * @param markdown - Markdown text.
 * @returns Plain text.
 */
function toPlainText(markdown?: string): string | undefined {
  return markdown
    ?.replace(/\[([^\]]{1,200})\]\(#[^)]{0,200}\)/g, "$1")
    .replace(/\[([^\]]{1,200})\]\(([^)]{1,200})\)/g, "$1 ($2)")
    .replace(/`/g, "")
    .replace(/\*\*([^*]{1,200})\*\*/g, "$1")
    .replace(/\*([^\s*][^*\n]{0,200})\*/g, "$1")
    .replace(/\s+/g, " ");
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
        description: toPlainText(attribute.description),
        example: attribute.example,
        index: ++index,
        multivalued: attribute.multivalued,
        name: attribute.name,
        range: attribute.range,
        required: buildRequiredLabel(attribute, buildRequired(attribute)),
        title: attribute.title,
        values: toPlainText(attribute.values),
      });
    });
  });

  mkdirSync(OUTPUT_DIR, { recursive: true });
  await workbook.xlsx.writeFile(OUTPUT_PATH);
  console.log(`Wrote ${OUTPUT_PATH} (${index} fields)`);
}

buildTier1MetadataXlsx();
