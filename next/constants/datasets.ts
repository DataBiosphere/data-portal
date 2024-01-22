import { buildDataset } from "../utils/datasets";

const HOMO_SAPIENS = "Homo sapiens";
const NORMAL = "normal";

export const DATASETS = {
  adipose: [],
  breast: [],
  development: [],
  eye: [
    // Rui Chen (Baylor College of Medicine).
    buildDataset(
      [NORMAL],
      1699879,
      ["TODO"],
      ["10x 3' v3"],
      ["TODO"],
      "Rui Chen (Baylor College of Medicine)"
    ),
    buildDataset(
      [NORMAL],
      6061,
      ["TODO"],
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
      [NORMAL],
      354776,
      ["TODO"],
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
      [NORMAL],
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
      [NORMAL],
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
  "organoid-neural": [
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
  "organoid-endoderm": [
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Development of a quantitative prediction algorithm for target organ-specific similarity of human pluripotent stem cell-derived organoids and cells",
      {
        doi: "10.1038/s41467-021-24746-w",
        officialHcaPublication: null,
        publicationTitle:
          "Development of a quantitative prediction algorithm for target organ-specific similarity of human pluripotent stem cell-derived organoids and cells",
        publicationUrl: "https://doi.org/10.1038/s41467-021-24746-w",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Cholangiocyte organoids can repair bile ducts after transplantation in the human liver",
      {
        doi: "10.1126/science.aaz6964",
        officialHcaPublication: null,
        publicationTitle:
          "Cholangiocyte organoids can repair bile ducts after transplantation in the human liver",
        publicationUrl: "https://doi.org/10.1126/science.aaz6964",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Organoid modeling of human fetal lung alveolar development reveals mechanisms of cell fate patterning and neonatal respiratory disease",
      {
        doi: "10.1016/j.stem.2022.11.013",
        officialHcaPublication: null,
        publicationTitle:
          "Organoid modeling of human fetal lung alveolar development reveals mechanisms of cell fate patterning and neonatal respiratory disease",
        publicationUrl: "https://doi.org/10.1016/j.stem.2022.11.013",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Progenitor identification and SARS-CoV-2 infection in human distal lung organoids",
      {
        doi: "10.1038/s41586-020-3014-1",
        officialHcaPublication: null,
        publicationTitle:
          "Progenitor identification and SARS-CoV-2 infection in human distal lung organoids",
        publicationUrl: "https://doi.org/10.1038/s41586-020-3014-1",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single-cell atlas of human liver development reveals pathways directing hepatic cell fates",
      {
        doi: "10.1038/s41556-022-00989-7",
        officialHcaPublication: null,
        publicationTitle:
          "Single-cell atlas of human liver development reveals pathways directing hepatic cell fates",
        publicationUrl: "https://doi.org/10.1038/s41556-022-00989-7",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Suspension culture promotes serosal mesothelial development in human intestinal organoids",
      {
        doi: "10.1016/j.celrep.2022.110379",
        officialHcaPublication: null,
        publicationTitle:
          "Suspension culture promotes serosal mesothelial development in human intestinal organoids",
        publicationUrl: "https://doi.org/10.1016/j.celrep.2022.110379",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "The establishment of COPD organoids to study host-pathogen interaction reveals enhanced viral fitness of SARS-CoV-2 in bronchi",
      {
        doi: "10.1038/s41467-022-35253-x",
        officialHcaPublication: null,
        publicationTitle:
          "The establishment of COPD organoids to study host-pathogen interaction reveals enhanced viral fitness of SARS-CoV-2 in bronchi",
        publicationUrl: "https://doi.org/10.1038/s41467-022-35253-x",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Identification of SARS-CoV-2 inhibitors using lung and colonic organoids",
      {
        doi: "10.1038/s41586-020-2901-9",
        officialHcaPublication: null,
        publicationTitle:
          "Identification of SARS-CoV-2 inhibitors using lung and colonic organoids",
        publicationUrl: "https://doi.org/10.1038/s41586-020-2901-9",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Induced organoids derived from patients with ulcerative colitis recapitulate colitic reactivity",
      {
        doi: "10.1038/s41467-020-20351-5",
        officialHcaPublication: null,
        publicationTitle:
          "Induced organoids derived from patients with ulcerative colitis recapitulate colitic reactivity",
        publicationUrl: "https://doi.org/10.1038/s41467-020-20351-5",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "An organoid‐derived bronchioalveolar model for SARS‐CoV‐2 infection of human alveolar type II‐like cells",
      {
        doi: "10.15252/embj.2020105912",
        officialHcaPublication: null,
        publicationTitle:
          "An organoid‐derived bronchioalveolar model for SARS‐CoV‐2 infection of human alveolar type II‐like cells",
        publicationUrl: "https://doi.org/10.15252/embj.2020105912",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single cell RNA sequencing for the paired TNF-free and -treated intestinal organoids"
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Optimized human intestinal organoid model reveals interleukin-22-dependency of paneth cell formation",
      {
        doi: "10.1016/j.stem.2022.08.002",
        officialHcaPublication: null,
        publicationTitle:
          "Optimized human intestinal organoid model reveals interleukin-22-dependency of paneth cell formation",
        publicationUrl: "https://doi.org/10.1016/j.stem.2022.08.002",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Human branching cholangiocyte organoids recapitulate functional bile duct formation",
      {
        doi: "10.1016/j.stem.2022.04.011",
        officialHcaPublication: null,
        publicationTitle:
          "Human branching cholangiocyte organoids recapitulate functional bile duct formation",
        publicationUrl: "https://doi.org/10.1016/j.stem.2022.04.011",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Human alveolar progenitors generate dual lineage bronchioalveolar organoids",
      {
        doi: "10.1038/s42003-022-03828-5",
        officialHcaPublication: null,
        publicationTitle:
          "Human alveolar progenitors generate dual lineage bronchioalveolar organoids",
        publicationUrl: "https://doi.org/10.1038/s42003-022-03828-5",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single-cell-resolved differentiation of human induced pluripotent stem cells into pancreatic duct-like organoids on a microwell chip",
      {
        doi: "10.1038/s41551-021-00757-2",
        officialHcaPublication: null,
        publicationTitle:
          "Single-cell-resolved differentiation of human induced pluripotent stem cells into pancreatic duct-like organoids on a microwell chip",
        publicationUrl: "https://doi.org/10.1038/s41551-021-00757-2",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Organoid cultures of early-onset colorectal cancers reveal distinct and rare genetic profiles",
      {
        doi: "10.1136/gutjnl-2019-320019",
        officialHcaPublication: null,
        publicationTitle:
          "Organoid cultures of early-onset colorectal cancers reveal distinct and rare genetic profiles",
        publicationUrl: "https://doi.org/10.1136/gutjnl-2019-320019",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single‐cell transcriptomics reveals immune response of intestinal cell types to viral infection",
      {
        doi: "10.15252/msb.20209833",
        officialHcaPublication: null,
        publicationTitle:
          "Single‐cell transcriptomics reveals immune response of intestinal cell types to viral infection",
        publicationUrl: "https://doi.org/10.15252/msb.20209833",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Systematic evaluation of colorectal cancer organoid system by single-cell RNA-Seq analysis",
      {
        doi: "10.1186/s13059-022-02673-3",
        officialHcaPublication: null,
        publicationTitle:
          "Systematic evaluation of colorectal cancer organoid system by single-cell RNA-Seq analysis",
        publicationUrl: "https://doi.org/10.1186/s13059-022-02673-3",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "High-Resolution mRNA and Secretome Atlas of Human Enteroendocrine Cells",
      {
        doi: "10.1016/j.cell.2020.04.036",
        officialHcaPublication: null,
        publicationTitle:
          "High-Resolution mRNA and Secretome Atlas of Human Enteroendocrine Cells",
        publicationUrl: "https://doi.org/10.1016/j.cell.2020.04.036",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Generation of mesenchyme free intestinal organoids from human induced pluripotent stem cells",
      {
        doi: "10.1038/s41467-019-13916-6",
        officialHcaPublication: null,
        publicationTitle:
          "Generation of mesenchyme free intestinal organoids from human induced pluripotent stem cells",
        publicationUrl: "https://doi.org/10.1038/s41467-019-13916-6",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single-Cell RNA-Seq Reveals that CD9 Is a Negative Marker of Glucose-Responsive Pancreatic β-like Cells Derived from Human Pluripotent Stem Cells",
      {
        doi: "10.1016/j.stemcr.2020.09.009",
        officialHcaPublication: null,
        publicationTitle:
          "Single-Cell RNA-Seq Reveals that CD9 Is a Negative Marker of Glucose-Responsive Pancreatic β-like Cells Derived from Human Pluripotent Stem Cells",
        publicationUrl: "https://doi.org/10.1016/j.stemcr.2020.09.009",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Enteric Coronavirus Infection and Treatment Modeled With an Immunocompetent Human Intestine-On-A-Chip",
      {
        doi: "10.3389/fphar.2021.718484",
        officialHcaPublication: null,
        publicationTitle:
          "Enteric Coronavirus Infection and Treatment Modeled With an Immunocompetent Human Intestine-On-A-Chip",
        publicationUrl: "https://doi.org/10.3389/fphar.2021.718484",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Helicobacter pylori shows tropism to gastric differentiated pit cells dependent on urea chemotaxis",
      {
        doi: "10.1038/s41467-022-33165-4",
        officialHcaPublication: null,
        publicationTitle:
          "Helicobacter pylori shows tropism to gastric differentiated pit cells dependent on urea chemotaxis",
        publicationUrl: "https://doi.org/10.1038/s41467-022-33165-4",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "BMP gradient along the intestinal villus axis controls zonated enterocyte and goblet cell states",
      {
        doi: "10.1016/j.celrep.2022.110438",
        officialHcaPublication: null,
        publicationTitle:
          "BMP gradient along the intestinal villus axis controls zonated enterocyte and goblet cell states",
        publicationUrl: "https://doi.org/10.1016/j.celrep.2022.110438",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Gene Regulatory Network Analysis and Engineering Directs Development and Vascularization of Multilineage Human Liver Organoids",
      {
        doi: "10.1016/j.cels.2020.11.002",
        officialHcaPublication: null,
        publicationTitle:
          "Gene Regulatory Network Analysis and Engineering Directs Development and Vascularization of Multilineage Human Liver Organoids",
        publicationUrl: "https://doi.org/10.1016/j.cels.2020.11.002",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Use of human tissue stem cell-derived organoid cultures to model enterohepatic circulation",
      {
        doi: "10.1152/ajpgi.00177.2021",
        officialHcaPublication: null,
        publicationTitle:
          "Use of human tissue stem cell-derived organoid cultures to model enterohepatic circulation",
        publicationUrl: "https://doi.org/10.1152/ajpgi.00177.2021",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Adaptable haemodynamic endothelial cells for organogenesis and tumorigenesis",
      {
        doi: "10.1038/s41586-020-2712-z",
        officialHcaPublication: null,
        publicationTitle:
          "Adaptable haemodynamic endothelial cells for organogenesis and tumorigenesis",
        publicationUrl: "https://doi.org/10.1038/s41586-020-2712-z",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Long-Term Expansion of Functional Mouse and Human Hepatocytes as 3D Organoids",
      {
        doi: "10.1016/j.cell.2018.11.013",
        officialHcaPublication: null,
        publicationTitle:
          "Long-Term Expansion of Functional Mouse and Human Hepatocytes as 3D Organoids",
        publicationUrl: "https://doi.org/10.1016/j.cell.2018.11.013",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Generation of functional ciliated cholangiocytes from human pluripotent stem cells",
      {
        doi: "10.1038/s41467-021-26764-0",
        officialHcaPublication: null,
        publicationTitle:
          "Generation of functional ciliated cholangiocytes from human pluripotent stem cells",
        publicationUrl: "https://doi.org/10.1038/s41467-021-26764-0",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "A human liver organoid screening platform for DILI risk prediction",
      {
        doi: "10.1016/j.jhep.2023.01.019",
        officialHcaPublication: null,
        publicationTitle:
          "A human liver organoid screening platform for DILI risk prediction",
        publicationUrl: "https://doi.org/10.1016/j.jhep.2023.01.019",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "EPIREGULIN creates a developmental niche for spatially organized human intestinal enteroids",
      {
        doi: "10.1172/jci.insight.165566",
        officialHcaPublication: null,
        publicationTitle:
          "EPIREGULIN creates a developmental niche for spatially organized human intestinal enteroids",
        publicationUrl: "https://doi.org/10.1172/jci.insight.165566",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Development of human alveolar epithelial cell models to study distal lung biology and disease",
      {
        doi: "10.1016/j.isci.2022.103780",
        officialHcaPublication: null,
        publicationTitle:
          "Development of human alveolar epithelial cell models to study distal lung biology and disease",
        publicationUrl: "https://doi.org/10.1016/j.isci.2022.103780",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "An integrated transcriptomic cell atlas of human endoderm-derived organoids",
      {
        doi: "10.1101/2023.11.20.567825",
        officialHcaPublication: null,
        publicationTitle:
          "An integrated transcriptomic cell atlas of human endoderm-derived organoids",
        publicationUrl: "https://doi.org/10.1101/2023.11.20.567825",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Self-organized stem cell-derived human lung buds with proximo-distal patterning and novel targets of SARS-CoV-2",
      {
        doi: "10.1101/2021.01.06.425622",
        officialHcaPublication: null,
        publicationTitle:
          "Self-organized stem cell-derived human lung buds with proximo-distal patterning and novel targets of SARS-CoV-2",
        publicationUrl: "https://doi.org/10.1101/2021.01.06.425622",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Human Intestinal Organoids Maintain Self-Renewal Capacity and Cellular Diversity in Niche-Inspired Culture Condition",
      {
        doi: "10.1016/j.stem.2018.11.016",
        officialHcaPublication: null,
        publicationTitle:
          "Human Intestinal Organoids Maintain Self-Renewal Capacity and Cellular Diversity in Niche-Inspired Culture Condition",
        publicationUrl: "https://doi.org/10.1016/j.stem.2018.11.016",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Modeling Steatohepatitis in Humans with Pluripotent Stem Cell-Derived Organoids",
      {
        doi: "10.1016/j.cmet.2019.05.007",
        officialHcaPublication: null,
        publicationTitle:
          "Modeling Steatohepatitis in Humans with Pluripotent Stem Cell-Derived Organoids",
        publicationUrl: "https://doi.org/10.1016/j.cmet.2019.05.007",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Differentiation of human pluripotent stem cells into functional airway basal stem cells",
      {
        doi: "10.1016/j.xpro.2021.100683",
        officialHcaPublication: null,
        publicationTitle:
          "Differentiation of human pluripotent stem cells into functional airway basal stem cells",
        publicationUrl: "https://doi.org/10.1016/j.xpro.2021.100683",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Multilineage communication regulates human liver bud development from pluripotency",
      {
        doi: "10.1038/nature22796 f14",
        officialHcaPublication: null,
        publicationTitle:
          "Multilineage communication regulates human liver bud development from pluripotency",
        publicationUrl: "https://doi.org/10.1038/nature22796 f14",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Salivary gland organoid culture maintains distinct glandular properties of murine and human major salivary glands",
      {
        doi: "10.1038/s41467-022-30934-z",
        officialHcaPublication: null,
        publicationTitle:
          "Salivary gland organoid culture maintains distinct glandular properties of murine and human major salivary glands",
        publicationUrl: "https://doi.org/10.1038/s41467-022-30934-z",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single‐cell analyses reveal SARS‐CoV‐2 interference with intrinsic immune response in the human gut",
      {
        doi: "10.15252/msb.202110232",
        officialHcaPublication: null,
        publicationTitle:
          "Single‐cell analyses reveal SARS‐CoV‐2 interference with intrinsic immune response in the human gut",
        publicationUrl: "https://doi.org/10.15252/msb.202110232",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single-Cell Sequencing of Developing Human Gut Reveals Transcriptional Links to Childhood Crohn’s Disease",
      {
        doi: "10.1016/j.devcel.2020.11.010",
        officialHcaPublication: null,
        publicationTitle:
          "Single-Cell Sequencing of Developing Human Gut Reveals Transcriptional Links to Childhood Crohn’s Disease",
        publicationUrl: "https://doi.org/10.1016/j.devcel.2020.11.010",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Single cell analysis of Monolayer and Organoid Primary Prostate Human Epithelial Cells Derived from the same patient"
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "A human multi-lineage hepatic organoid model for liver fibrosis",
      {
        doi: "10.1038/s41467-021-26410-9",
        officialHcaPublication: null,
        publicationTitle:
          "A human multi-lineage hepatic organoid model for liver fibrosis",
        publicationUrl: "https://doi.org/10.1038/s41467-021-26410-9",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Maturation of human intestinal epithelium from pluripotency in vitro",
      {
        doi: "10.1101/2021.09.24.460132",
        officialHcaPublication: null,
        publicationTitle:
          "Maturation of human intestinal epithelium from pluripotency in vitro",
        publicationUrl: "https://doi.org/10.1101/2021.09.24.460132",
      }
    ),
    buildDataset(
      ["--"],
      0,
      ["--"],
      ["--"],
      ["--"],
      "Transplantable human thyroid organoids generated from embryonic stem cells to rescue hypothyroidism",
      {
        doi: "10.1038/s41467-022-34776-7",
        officialHcaPublication: null,
        publicationTitle:
          "Transplantable human thyroid organoids generated from embryonic stem cells to rescue hypothyroidism",
        publicationUrl: "https://doi.org/10.1038/s41467-022-34776-7",
      }
    ),
  ],
  pancreas: [],
  reproduction: [],
  skin: [],
};
