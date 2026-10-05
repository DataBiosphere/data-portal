import { NETWORKS, NETWORK_ATLAS_CONTENT } from "@/constants/networks";
import type {
  AtlasContext as AtlasContextType,
  AtlasModule,
} from "@/types/network";
import { createContext, useContext } from "react";
import { DEFAULT_NETWORK } from "./networkContext";

const DEFAULT_ATLAS = NETWORKS[0].atlases[0];

export const AtlasContext = createContext<AtlasContextType>({
  atlas: DEFAULT_ATLAS,
  network: DEFAULT_NETWORK,
  projectsResponses: [],
  trackerSourceDatasets: [],
});

export const AtlasProvider = AtlasContext.Provider;

export const useAtlas = (): AtlasContextType => {
  return useContext(AtlasContext);
};

export const useAtlasContent = (): AtlasModule | undefined => {
  const {
    atlas: { key },
    network: { key: networkKey },
  } = useAtlas();
  return NETWORK_ATLAS_CONTENT[networkKey]?.[key];
};
