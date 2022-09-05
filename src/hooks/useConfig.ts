import anvilConfig from "../config/hca/config";
import { SiteConfig } from "../config/entities";
import ncpiConfig from "../config/lungmap/config";

export enum SITE {
  HCA = "HCA",
  LUNGMAP = "LUNGMAP",
}

const CONFIGS = {
  HCA: anvilConfig,
  LUNGMAP: ncpiConfig,
};

export const useConfig = (site: SITE): SiteConfig => {
  return CONFIGS[site];
};
