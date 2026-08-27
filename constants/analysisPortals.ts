import { ANALYSIS_PORTAL, AnalysisPortal } from "../@types/network";

/**
 * Cell Annotation Platform (CAP) analysis portal.
 */
export const CAP: Omit<AnalysisPortal, "url"> = {
  icon: "/hca-bio-networks/network/atlas/icons/cap.svg",
  label: "CAP",
  name: ANALYSIS_PORTAL.CAP,
};

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
