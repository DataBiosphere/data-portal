import { SiteConfig } from "../../common/entities";
import { DATA_URL, GIT_HUB_REPO_URL, makeConfig } from "../dev/config";

const EXPLORER_URL = "https://explore.data.humancellatlas.org";
const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

const config: SiteConfig = {
  ...makeConfig(EXPLORER_URL, PORTAL_URL, DATA_URL, GIT_HUB_REPO_URL),
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
