import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { getDefaultConfig } from "@databiosphere/findable-ui/lib/config/utils";
import React, { createContext, ReactNode } from "react";

export type ConfigContextProps = {
  config: SiteConfig;
};

export interface ConfigProps {
  children: ReactNode | ReactNode[];
  config: SiteConfig;
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: getDefaultConfig(),
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
