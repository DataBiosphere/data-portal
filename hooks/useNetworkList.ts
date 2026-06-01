import { createContext, useContext } from "react";
import { Network } from "../@types/network";
import { NETWORKS } from "../constants/networks";

const NetworkListContext = createContext<Network[]>(NETWORKS);

export const NetworkListProvider = NetworkListContext.Provider;

export const useNetworkList = (): Network[] => useContext(NetworkListContext);
