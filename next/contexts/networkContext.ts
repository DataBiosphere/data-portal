import { DESCRIPTION_COMPONENTS, NETWORKS } from "constants/networks";
import { createContext, ElementType, useContext } from "react";
import { NetworkContext as NetworkContextType } from "../@types/network";

export const NetworkContext = createContext<NetworkContextType>({
  network: NETWORKS[0],
  projectsResponses: [],
});

export const NetworkProvider = NetworkContext.Provider;

export const useNetwork = (): NetworkContextType => {
  return useContext(NetworkContext);
};

export const useNetworkDescription = (): ElementType => {
  const { network } = useNetwork();
  const { key } = network;

  return DESCRIPTION_COMPONENTS[key];
};
