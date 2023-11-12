import { AnalysisPortal, ANALYSIS_PORTAL } from "../@types/network";
import cellxgeneIcon from "../public/hca-bio-networks/network/atlas/icons/cellxgene.svg";

/**
 * Cell By Gene analysis portal.
 */
export const CELLXGENE: Omit<AnalysisPortal, "url"> = {
  icon: cellxgeneIcon,
  label: "Cellxgene",
  name: ANALYSIS_PORTAL.CELLXGENE,
};
