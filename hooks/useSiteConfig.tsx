import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { SiteConfig } from "../site-config/common/entities";

export const useSiteConfig = (): SiteConfig => {
  const { config } = useConfig();
  // Return site configuration with portalURL configured.
  if ("portalURL" in config) return config as SiteConfig;
  // Throw an error if the portalURL is not configured.
  throw new Error("Site config is not available");
};
