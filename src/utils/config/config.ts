/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal config.
 */

// App dependencies
import { Partner } from "../../components/searchPortal/searchPartner/searchPartner";
import { getCurrentEnvironmentURL } from "../environment/environment.service";

export interface SearchConfig {
  partners: Partner[];
  searchEngineId?: string;
}

interface Config {
  searchConfig: SearchConfig;
}

interface SiteConfig {
  hca: Config;
  lungmap: Config;
  portalUrl: string;
}

const Config: SiteConfig = {
  hca: {
    searchConfig: {
      partners: [
        { active: true, label: "All Results", value: "" },
        { active: false, label: "Projects", value: "projects" },
        { active: false, label: "Pipeline Docs", value: "pipelines" },
        { active: false, label: "Metadata Schema", value: "metadata" },
      ],
      searchEngineId: process.env.GATSBY_ATLAS,
    },
  },
  lungmap: {
    searchConfig: {
      partners: [
        { active: true, label: "All Results", value: "" },
        { active: false, label: "Projects", value: "lungmap-only" },
      ],
      searchEngineId: process.env.GATSBY_ATLAS,
    },
  },
  portalUrl: getCurrentEnvironmentURL() || "",
};

export default Config;
