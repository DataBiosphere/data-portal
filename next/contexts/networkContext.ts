import { DESCRIPTION_COMPONENTS, NETWORKS } from "constants/networks";
import { createContext, ElementType, useContext } from "react";
import { NetworkContext as NetworkContextType } from "../@types/network";

export const NetworkContext = createContext<NetworkContextType>({
  datasets: [],
  network: NETWORKS[0],
});

export const NetworkProvider = NetworkContext.Provider;

export const useNetwork = (): NetworkContextType => {
  return useContext(NetworkContext);
};

export const useNetworkDescription = (): ElementType => {
  const {
    network: { key },
  } = useNetwork();

  return DESCRIPTION_COMPONENTS[key];
};
