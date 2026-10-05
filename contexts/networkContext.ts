import { NETWORKS, NETWORK_CONTENT } from "@/constants/networks";
import type {
  Network,
  NetworkContext as NetworkContextType,
  NetworkModule,
} from "@/types/network";
import { createContext, useContext } from "react";

// Default network for contexts rendered without a provider. It lists no
// atlases, so such a component cannot list unpublished tracker atlases whose
// pages were never generated (see #3203).
export const DEFAULT_NETWORK: Network = { ...NETWORKS[0], atlases: [] };

export const NetworkContext = createContext<NetworkContextType>({
  network: DEFAULT_NETWORK,
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
