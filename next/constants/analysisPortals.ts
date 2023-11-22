import { AnalysisPortal, ANALYSIS_PORTAL } from "../@types/network";
import cxgIcon from "../public/hca-bio-networks/network/atlas/icons/cxg.png";

/**
 * Cell By Gene analysis portal.
 */
export const CZ_CELLXGENE: Omit<AnalysisPortal, "url"> = {
  icon: cxgIcon,
  label: "CZ CELLxGENE",
  name: ANALYSIS_PORTAL.CZ_CELLXGENE,
};
