import { buildDataset } from "../utils/datasets";

export const DATASETS = {
  adipose: [],
  breast: [],
  development: [],
  eye: [],
  "genetic-diversity": [],
  gut: [],
  heart: [],
  immune: [],
  kidney: [],
  liver: [],
  lung: [
    // Study name: Jain_Misharin_2021.
    buildDataset(
      ["Normal"],
      45557,
      ["TODO"],
      ["10X 5' v1", "v2"],
      ["TODO"],
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
    // Study name: Lafyatis_Rojas_2019.
    buildDataset(
      ["Normal"],
      24181,
      ["TODO"],
      ["10X 3' v1", "v2"],
      ["TODO"],
      "Proliferating SPP1/MERTK-expressing macrophages in idiopathic pulmonary fibrosis",
      {
        doi: "10.1183/13993003.02441-2018",
        officialHcaPublication: null,
        publicationTitle:
          "Proliferating SPP1/MERTK-expressing macrophages in idiopathic pulmonary fibrosis",
        publicationUrl: "https://doi.org/10.1183/13993003.02441-2018",
      }
    ),
    // Study name: Barbry_unpubl.
    buildDataset(
      ["IPF"],
      100211,
      ["TODO"],
      ["10X 3' v3"],
      ["TODO"],
      "Barbry_unpubl"
    ),
    // Study name:Duong_lungMAP_unpubl.
    buildDataset(
      ["Normal"],
      53904,
      ["TODO"],
      ["10X 3' v3"],
      ["TODO"],
      "Duong_lungMAP_unpubl"
    ),
    // Study name: Schiller_2021.
    buildDataset(
      ["Cancer (non-cancerous tissue used for samples)"],
      35984,
      ["TODO"],
      ["10X 3' v3"],
      ["TODO"],
      "Schiller_2021"
    ),
    // Study name: Schultze_unpubl.
    buildDataset(
      ["Cancer (non-cancerous tissue used for samples)"],
      8016,
      ["TODO"],
      ["Seq-Well"],
      ["TODO"],
      "Schultze_unpubl"
    ),
    // Study name: Zhang_2021.
    buildDataset(
      ["Normal", "moderate COVID-19", "severe COVID-19"],
      62469,
      ["TODO"],
      ["10X 3' v2", "v3"],
      ["TODO"],
      "Single-cell landscape of bronchoalveolar immune cells in patients with COVID-19",
      {
        doi: "10.1038/s41591-020-0901-9",
        officialHcaPublication: null,
        publicationTitle:
          "Single-cell landscape of bronchoalveolar immune cells in patients with COVID-19",
        publicationUrl: "https://doi.org/10.1038/s41591-020-0901-9",
      }
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
