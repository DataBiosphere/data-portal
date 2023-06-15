import { ATLASES, NETWORKS } from "constants/networks";
import { createContext, useContext } from "react";
import {
  AtlasContext as AtlasContextType,
  AtlasModule,
} from "../@types/network";

const DEFAULT_NETWORK = NETWORKS[0];

const DEFAULT_ATLAS = DEFAULT_NETWORK.atlases[0];

export const AtlasContext = createContext<AtlasContextType>({
  network: DEFAULT_NETWORK,
  atlas: DEFAULT_ATLAS,
});

export const AtlasProvider = AtlasContext.Provider;

export const useAtlas = (): AtlasContextType => {
  return useContext(AtlasContext);
};

export const useAtlasContent = (): AtlasModule => {
  const {
    atlas: { key },
  } = useAtlas();

  return ATLASES[key];
};
