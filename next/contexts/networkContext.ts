import { DESCRIPTION_COMPONENTS, NETWORKS } from "constants/networks";
import { createContext, ElementType, useContext } from "react";
import { Network } from "../@types/network";

export const NetworkContext = createContext<Network>(NETWORKS[0]);

export const NetworkProvider = NetworkContext.Provider;

export const useNetwork = (): Network => {
  return useContext(NetworkContext);
};

export const useNetworkDescription = (): ElementType => {
  const { key } = useNetwork();

  return DESCRIPTION_COMPONENTS[key];
};
