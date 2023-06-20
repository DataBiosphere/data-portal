import { DESCRIPTION_COMPONENTS, NETWORKS } from "constants/networks";
import { createContext, useContext } from "react";
import {
  MDXComponent,
  NetworkContext as NetworkContextType,
} from "../@types/network";

export const NetworkContext = createContext<NetworkContextType>({
  datasets: [],
  network: NETWORKS[0],
});

export const NetworkProvider = NetworkContext.Provider;

export const useNetwork = (): NetworkContextType => {
  return useContext(NetworkContext);
};

export const useNetworkDescription = (): MDXComponent => {
  const {
    network: { descriptionKey },
  } = useNetwork();

  return DESCRIPTION_COMPONENTS[descriptionKey];
};
