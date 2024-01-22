import { buildDataset } from "../utils/datasets";

const HOMO_SAPIENS = "Homo sapiens";

export const DATASETS = {
  adipose: [],
  breast: [],
  development: [],
  eye: [
    // Rui Chen (Baylor College of Medicine).
    buildDataset(
      ["normal"],
      1699879,
      [HOMO_SAPIENS],
      ["10x 3' v3"],
      ["TODO"],
      "Rui Chen (Baylor College of Medicine)"
    ),
    buildDataset(
      ["normal"],
      6061,
      [HOMO_SAPIENS],
      ["10x 3'"],
      ["TODO"],
      "Molecular characterization of foveal versus peripheral human retina by single-cell RNA sequencing",
      {
        doi: "10.1016/j.exer.2019.05.001",
        officialHcaPublication: null,
        publicationTitle:
          "Molecular characterization of foveal versus peripheral human retina by single-cell RNA sequencing",
        publicationUrl: "https://pubmed.ncbi.nlm.nih.gov/31075224/",
      }
    ),
    // Rui Chen (Baylor College of Medicine).
    buildDataset(
      ["normal"],
      354776,
      [HOMO_SAPIENS],
      ["10x ATAC"],
      ["TODO"],
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
      ["normal"],
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
      ["normal"],
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
  ],
  musculoskeletal: [],
  "nervous-system": [],
  oral: [],
  organoid: [],
  pancreas: [],
  reproduction: [],
  skin: [],
};
