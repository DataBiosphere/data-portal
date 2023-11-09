import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
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
          label: "Explore",
          target: ANCHOR_TARGET.BLANK,
          url: BROWSER_URL,
        },
        {
          label: "BioNetworks",
          url: "/bio-networks",
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
          label: "Pipelines",
          url: `${PORTAL_URL}/pipelines`,
        },
        {
          label: "Contribute",
          url: `${PORTAL_URL}/contribute`,
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
