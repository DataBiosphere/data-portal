import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import devConfig from "../dev/config";

const config: SiteConfig = {
  ...devConfig,
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
