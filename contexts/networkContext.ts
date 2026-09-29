import { NETWORKS, NETWORK_CONTENT } from "@/constants/networks";
import {
  NetworkContext as NetworkContextType,
  NetworkModule,
} from "@/types/network";
import { createContext, useContext } from "react";

export const NetworkContext = createContext<NetworkContextType>({
  network: NETWORKS[0],
});

export const NetworkProvider = NetworkContext.Provider;

export const useNetwork = (): NetworkContextType => {
  return useContext(NetworkContext);
};

export const useNetworkContent = (): NetworkModule => {
  const { network } = useNetwork();
  const { key } = network;
  return NETWORK_CONTENT[key];
};
