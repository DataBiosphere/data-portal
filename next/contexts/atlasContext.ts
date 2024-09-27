import { NETWORKS, NETWORK_ATLAS_CONTENT } from "constants/networks";
import { createContext, useContext } from "react";
import {
  AtlasContext as AtlasContextType,
  AtlasModule,
} from "../@types/network";

const DEFAULT_NETWORK = NETWORKS[0];

const DEFAULT_ATLAS = DEFAULT_NETWORK.atlases[0];

export const AtlasContext = createContext<AtlasContextType>({
  atlas: DEFAULT_ATLAS,
  network: DEFAULT_NETWORK,
  projectsResponses: [],
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
