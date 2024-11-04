import { useContext } from "react";
import { ConfigContext, ConfigContextProps } from "../providers/config";

/**
 * Returns configuration context.
 * @returns configuration context.
 */
export const useConfig = (): ConfigContextProps => {
  return useContext(ConfigContext);
};
