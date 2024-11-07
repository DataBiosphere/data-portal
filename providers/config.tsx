import { getDefaultConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { createContext, ReactNode } from "react";
import { SiteConfig } from "../site-config/common/entities";

export type ConfigContextProps = {
  config: SiteConfig;
};

export interface ConfigProps {
  children: ReactNode | ReactNode[];
  config: SiteConfig;
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: { ...getDefaultConfig(), portalURL: "" },
});

export function ConfigProvider({ children, config }: ConfigProps): JSX.Element {
  return (
    <ConfigContext.Provider
      value={{
        config,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
