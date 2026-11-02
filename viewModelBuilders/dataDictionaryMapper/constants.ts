import type { DataDictionaryDownload } from "@databiosphere/findable-ui/lib/common/entities";

/**
 * Download link for the Tier 1 metadata dictionary: the XLSX that scripts/build-tier-1-metadata-xlsx.ts writes to public/ at build time.
 */
export const TIER_1_DOWNLOAD: DataDictionaryDownload = {
  href: "/downloads/hca-tier-1-metadata.xlsx",
  label: "Download",
};
