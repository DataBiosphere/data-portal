import hcaConfig from "../config/hca/config";
import { SiteConfig } from "../config/entities";
import lungmapConfig from "../config/lungmap/config";

export enum SITE {
  HCA = "HCA",
  LUNGMAP = "LUNGMAP",
}

const CONFIGS = {
  HCA: hcaConfig,
  LUNGMAP: lungmapConfig,
};

export const useConfig = (site: SITE): SiteConfig => {
  return CONFIGS[site];
};
