import type { Network } from "@/types/network";
import { createContext, useContext } from "react";

// Empty by default: pages must provide the publication-gated list from
// `getAvailableNetworks`, so a page that forgets to cannot list unpublished
// tracker atlases linking to pages that were never generated (see #3203).
const NetworkListContext = createContext<Network[]>([]);

export const NetworkListProvider = NetworkListContext.Provider;

export const useNetworkList = (): Network[] => useContext(NetworkListContext);
