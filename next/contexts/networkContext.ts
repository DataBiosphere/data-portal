import { Network } from "../@types/network";
import { NETWORKS } from "constants/networks";
import { createContext, useContext } from "react";


export const NetworkContext = createContext<Network>(NETWORKS[0])

export const NetworkProvider = NetworkContext.Provider

export const useNetwork = (): Network => {
    return useContext(NetworkContext)
}