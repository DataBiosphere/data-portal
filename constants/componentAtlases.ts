import { IntegratedAtlasRow } from "../@types/network";
import { buildAtlas } from "../utils/atlases";
import { UCSC_CELL_BROWSER } from "./analysisPortals";

const NORMAL = "normal";
const TODO = "--";

export const COMPONENT_ATLASES: Record<string, IntegratedAtlasRow[]> = {
  adipose: [],
  breast: [],
  development: [],
  "eye-retina": [
    buildAtlas(
      [
        {
          url: "https://cells.ucsc.edu/?ds=retina+hrca+atac",
          ...UCSC_CELL_BROWSER,
        },
      ],
      ["10x ATAC"],
      354776,
      [NORMAL],
      "snATAC-seq of human retina",
      [TODO],
      [TODO]
    ),
  ],
  "genetic-diversity": [],
  gut: [],
  heart: [],
  immune: [],
  kidney: [],
  liver: [],
  lung: [],
  musculoskeletal: [],
  "nervous-system": [],
  oral: [],
  organoid: [],
  pancreas: [],
  reproduction: [],
  skin: [],
};
