import { DESCRIPTION_COMPONENTS, NETWORKS } from "constants/networks";
import { createContext, useContext } from "react";
import { MDXComponent, Network } from "../@types/network";

export const NetworkContext = createContext<Network>(NETWORKS[0]);

export const NetworkProvider = NetworkContext.Provider;

export const useNetwork = (): Network => {
  return useContext(NetworkContext);
};

export const useNetworkDescription = (): MDXComponent => {
  const { descriptionKey } = useNetwork();

  return DESCRIPTION_COMPONENTS[descriptionKey];
};
