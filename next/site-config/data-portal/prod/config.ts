import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import devConfig, { PORTAL_URL } from "../dev/config";

const BROWSER_URL = "https://explore.data.humancellatlas.org";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
  layout: {
    ...devConfig.layout,
    header: {
      ...devConfig.layout.header,
      navLinks: [
        {
          label: "Datasets",
          target: ANCHOR_TARGET.BLANK,
          url: BROWSER_URL,
        },
        {
          label: "HCA BioNetworks",
          url: "/hca-bio-networks",
        },
        {
          label: "Guides",
          url: `${PORTAL_URL}/guides`,
        },
        {
          label: "Metadata",
          url: `${PORTAL_URL}/metadata`,
        },
        {
          label: "APIs",
          url: `${PORTAL_URL}/apis`,
        },
        {
          label: "Updates",
          url: `${PORTAL_URL}/dcp-updates`,
        },
      ],
    },
  },
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
