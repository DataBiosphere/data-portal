import { AnalysisPortal, ANALYSIS_PORTAL } from "../@types/network";

/**
 * Cell By Gene analysis portal.
 */
export const CZ_CELLXGENE: Omit<AnalysisPortal, "url"> = {
  icon: "/hca-bio-networks/network/atlas/icons/cxg.png",
  label: "CZ CELLxGENE",
  name: ANALYSIS_PORTAL.CZ_CELLXGENE,
};

/**
 * UCSC Cell Browser analysis portal.
 */
export const UCSC_CELL_BROWSER: Omit<AnalysisPortal, "url"> = {
  icon: "/hca-bio-networks/network/atlas/icons/ucsc-cell.svg",
  label: "UCSC Cell Browser",
  name: ANALYSIS_PORTAL.UCSC_CELL_BROWSER,
};
