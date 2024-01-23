import { buildDataset } from "../utils/datasets";

const NORMAL = "normal";
const TODO = "TODO";

export const DATASETS = {
  adipose: [],
  breast: [],
  development: [],
  eye: [
    // Rui Chen (Baylor College of Medicine).
    buildDataset(
      [NORMAL],
      1699879,
      [TODO],
      ["10x 3' v3"],
      [TODO],
      "Rui Chen (Baylor College of Medicine)"
    ),
    // Rui Chen (Baylor College of Medicine).
    buildDataset(
      [NORMAL],
      354776,
      [TODO],
      ["10x ATAC"],
      [TODO],
      "Rui Chen (Baylor College of Medicine)"
    ),
  ],
  "genetic-diversity": [],
  gut: [],
  heart: [],
  immune: [],
  kidney: [],
  liver: [],
  lung: [
    // Study name: Jain_Misharin_2021.
    buildDataset(
      [NORMAL],
      45557,
      [TODO],
      ["10X 5' v1", "v2"],
      [TODO],
      "Expansion of profibrotic monocyte-derived alveolar macrophages in patients with persistent respiratory symptoms and radiographic abnormalities after COVID-19",
      {
        doi: "10.1101/2023.07.30.551145",
        officialHcaPublication: null,
        publicationTitle:
          "Expansion of profibrotic monocyte-derived alveolar macrophages in patients with persistent respiratory symptoms and radiographic abnormalities after COVID-19",
        publicationUrl:
          "https://www.biorxiv.org/content/10.1101/2023.07.30.551145v1",
      }
    ),
    // Study name: Barbry_unpubl.
    buildDataset(
      ["IPF"],
      100211,
      [TODO],
      ["10X 3' v3"],
      [TODO],
      "Barbry_unpubl"
    ),
    // Study name:Duong_lungMAP_unpubl.
    buildDataset(
      [NORMAL],
      53904,
      [TODO],
      ["10X 3' v3"],
      [TODO],
      "Duong_lungMAP_unpubl"
    ),
    // Study name: Schiller_2021.
    buildDataset(
      ["Cancer (non-cancerous tissue used for samples)"],
      35984,
      [TODO],
      ["10X 3' v3"],
      [TODO],
      "Schiller_2021"
    ),
    // Study name: Schultze_unpubl.
    buildDataset(
      ["Cancer (non-cancerous tissue used for samples)"],
      8016,
      [TODO],
      ["Seq-Well"],
      [TODO],
      "Schultze_unpubl"
    ),
  ],
  musculoskeletal: [],
  "nervous-system": [],
  oral: [],
  organoid: [],
  pancreas: [],
  reproduction: [],
  skin: [],
};
