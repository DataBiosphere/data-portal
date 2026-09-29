import { NETWORKS } from "@/constants/networks";
import type { Network } from "@/types/network";
import { createContext, useContext } from "react";

const NetworkListContext = createContext<Network[]>(NETWORKS);

export const NetworkListProvider = NetworkListContext.Provider;

export const useNetworkList = (): Network[] => useContext(NetworkListContext);
