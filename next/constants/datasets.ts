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
  ],
  musculoskeletal: [],
  "nervous-system": [],
  oral: [],
  "organoid-brain": [
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Developmental excitation-inhibition imbalance underlying psychoses revealed by single-cell analyses of discordant twins-derived cerebral organoids",
      {
        doi: "10.1038/s41380-020-0844-z",
        officialHcaPublication: null,
        publicationTitle:
          "Developmental excitation-inhibition imbalance underlying psychoses revealed by single-cell analyses of discordant twins-derived cerebral organoids",
        publicationUrl: "https://doi.org/10.1038/s41380-020-0844-z",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "hESC-Derived Thalamic Organoids Form Reciprocal Projections When Fused with Cortical Organoids",
      {
        doi: "10.1016/j.stem.2018.12.015",
        officialHcaPublication: null,
        publicationTitle:
          "hESC-Derived Thalamic Organoids Form Reciprocal Projections When Fused with Cortical Organoids",
        publicationUrl: "https://doi.org/10.1016/j.stem.2018.12.015",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Generation of Functional Human 3D Cortico-Motor Assembloids",
      {
        doi: "10.1016/j.cell.2020.11.017",
        officialHcaPublication: null,
        publicationTitle:
          "Generation of Functional Human 3D Cortico-Motor Assembloids",
        publicationUrl: "https://doi.org/10.1016/j.cell.2020.11.017",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Generation of human striatal organoids and cortico-striatal assembloids from human pluripotent stem cells",
      {
        doi: "10.1038/s41587-020-00763-w",
        officialHcaPublication: null,
        publicationTitle:
          "Generation of human striatal organoids and cortico-striatal assembloids from human pluripotent stem cells",
        publicationUrl: "https://doi.org/10.1038/s41587-020-00763-w",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Gruffi: an algorithm for computational removal of stressed cells from brain organoid transcriptomic datasets",
      {
        doi: "10.15252/embj.2022111118",
        officialHcaPublication: null,
        publicationTitle:
          "Gruffi: an algorithm for computational removal of stressed cells from brain organoid transcriptomic datasets",
        publicationUrl: "https://doi.org/10.15252/embj.2022111118",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Midbrain_organoid_Treutlein"
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Proper acquisition of cell class identity in organoids allows definition of fate specification programs of the human cerebral cortex",
      {
        doi: "10.1016/j.cell.2022.09.010",
        officialHcaPublication: null,
        publicationTitle:
          "Proper acquisition of cell class identity in organoids allows definition of fate specification programs of the human cerebral cortex",
        publicationUrl: "https://doi.org/10.1016/j.cell.2022.09.010",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Autism genes converge on asynchronous development of shared neuron classes",
      {
        doi: "10.1038/s41586-021-04358-6",
        officialHcaPublication: null,
        publicationTitle:
          "Autism genes converge on asynchronous development of shared neuron classes",
        publicationUrl: "https://doi.org/10.1038/s41586-021-04358-6",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Generation of hypothalamic arcuate organoids from human induced pluripotent stem cells",
      {
        doi: "10.1016/j.stem.2021.04.006",
        officialHcaPublication: null,
        publicationTitle:
          "Generation of hypothalamic arcuate organoids from human induced pluripotent stem cells",
        publicationUrl: "https://doi.org/10.1016/j.stem.2021.04.006",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Individual brain organoids reproducibly form cell diversity of the human cerebral cortex",
      {
        doi: "10.1038/s41586-019-1289-x",
        officialHcaPublication: null,
        publicationTitle:
          "Individual brain organoids reproducibly form cell diversity of the human cerebral cortex",
        publicationUrl: "https://doi.org/10.1038/s41586-019-1289-x",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Human Astrocyte Maturation Captured in 3D Cerebral Cortical Spheroids Derived from Pluripotent Stem Cells",
      {
        doi: "10.1016/j.neuron.2017.07.035",
        officialHcaPublication: null,
        publicationTitle:
          "Human Astrocyte Maturation Captured in 3D Cerebral Cortical Spheroids Derived from Pluripotent Stem Cells",
        publicationUrl: "https://doi.org/10.1016/j.neuron.2017.07.035",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Cell stress in cortical organoids impairs molecular subtype specification",
      {
        doi: "10.1038/s41586-020-1962-0",
        officialHcaPublication: null,
        publicationTitle:
          "Cell stress in cortical organoids impairs molecular subtype specification",
        publicationUrl: "https://doi.org/10.1038/s41586-020-1962-0",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Differentiation and maturation of oligodendrocytes in human three-dimensional neural cultures",
      {
        doi: "10.1038/s41593-018-0316-9",
        officialHcaPublication: null,
        publicationTitle:
          "Differentiation and maturation of oligodendrocytes in human three-dimensional neural cultures",
        publicationUrl: "https://doi.org/10.1038/s41593-018-0316-9",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Human CNS barrier-forming organoids with cerebrospinal fluid production",
      {
        doi: "10.1126/science.aaz5626",
        officialHcaPublication: null,
        publicationTitle:
          "Human CNS barrier-forming organoids with cerebrospinal fluid production",
        publicationUrl: "https://doi.org/10.1126/science.aaz5626",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Assembly of functionally integrated human forebrain spheroids",
      {
        doi: "10.1038/nature22330",
        officialHcaPublication: null,
        publicationTitle:
          "Assembly of functionally integrated human forebrain spheroids",
        publicationUrl: "https://doi.org/10.1038/nature22330",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Cerebellar_organoid_Quadrato"
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Sliced Human Cortical Organoids for Modeling Distinct Cortical Layer Formation",
      {
        doi: "10.1016/j.stem.2020.02.002",
        officialHcaPublication: null,
        publicationTitle:
          "Sliced Human Cortical Organoids for Modeling Distinct Cortical Layer Formation",
        publicationUrl: "https://doi.org/10.1016/j.stem.2020.02.002",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Complex Oscillatory Waves Emerging from Cortical Organoids Model Early Human Brain Network Development",
      {
        doi: "10.1016/j.stem.2019.08.002",
        officialHcaPublication: null,
        publicationTitle:
          "Complex Oscillatory Waves Emerging from Cortical Organoids Model Early Human Brain Network Development",
        publicationUrl: "https://doi.org/10.1016/j.stem.2019.08.002",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Reliability of human cortical organoid generation",
      {
        doi: "10.1038/s41592-018-0255-0",
        officialHcaPublication: null,
        publicationTitle: "Reliability of human cortical organoid generation",
        publicationUrl: "https://doi.org/10.1038/s41592-018-0255-0",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single-cell transcriptomics captures features of human midbrain development and dopamine neuron diversity in brain organoids",
      {
        doi: "10.1038/s41467-021-27464-5",
        officialHcaPublication: null,
        publicationTitle:
          "Single-cell transcriptomics captures features of human midbrain development and dopamine neuron diversity in brain organoids",
        publicationUrl: "https://doi.org/10.1038/s41467-021-27464-5",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Inferring and perturbing cell fate regulomes in human brain organoids",
      {
        doi: "10.1038/s41586-022-05279-8",
        officialHcaPublication: null,
        publicationTitle:
          "Inferring and perturbing cell fate regulomes in human brain organoids",
        publicationUrl: "https://doi.org/10.1038/s41586-022-05279-8",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "ELAVL4, splicing, and glutamatergic dysfunction precede neuron loss in MAPT mutation cerebral organoids",
      {
        doi: "10.1016/j.cell.2021.07.003",
        officialHcaPublication: null,
        publicationTitle:
          "ELAVL4, splicing, and glutamatergic dysfunction precede neuron loss in MAPT mutation cerebral organoids",
        publicationUrl: "https://doi.org/10.1016/j.cell.2021.07.003",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Androgens increase excitatory neurogenic potential in human brain organoids",
      {
        doi: "10.1038/s41586-021-04330-4",
        officialHcaPublication: null,
        publicationTitle:
          "Androgens increase excitatory neurogenic potential in human brain organoids",
        publicationUrl: "https://doi.org/10.1038/s41586-021-04330-4",
      }
    ),
  ],
  pancreas: [],
  reproduction: [],
  skin: [],
};
