import { buildDataset } from "../utils/datasets";

const NORMAL = "normal";
const TODO = "--";

export const DATASETS = {
  adipose: [],
  breast: [],
  development: [],
  "eye-retina": [
    // Chen (2023) Research Square.
    buildDataset(
      [TODO],
      2999939,
      [TODO],
      ["10x Genomics Single Cell 3' v3"],
      [TODO],
      "Integrated multi-omics single cell atlas of the human retina",
      {
        doi: "10.21203/rs.3.rs-3471275/v1",
        officialHcaPublication: null,
        publicationTitle:
          "Integrated multi-omics single cell atlas of the human retina",
        publicationUrl: "https://www.researchsquare.com/article/rs-3471275/v1",
      }
    ),
    // Hahn (2023) Nature.
    buildDataset(
      [TODO],
      0,
      [TODO],
      [TODO],
      [TODO],
      "Evolution of neuronal cell classes and types in the vertebrate retina",
      {
        doi: "10.1038/s41586-023-06638-9",
        officialHcaPublication: null,
        publicationTitle:
          "Evolution of neuronal cell classes and types in the vertebrate retina",
        publicationUrl: "https://www.nature.com/articles/s41586-023-06638-9",
      }
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
