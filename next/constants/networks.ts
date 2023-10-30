import {
  AtlasKey,
  AtlasModule,
  Network,
  NetworkKey,
  NetworkModule,
} from "../@types/network";
import * as adiposeContent from "../content/adipose";
import * as breastContent from "../content/breast";
import * as developmentContent from "../content/development";
import * as eyeContent from "../content/eye";
import * as geneticDiversityContent from "../content/genetic-diversity";
import * as gutContent from "../content/gut";
import * as heartContent from "../content/heart";
import * as immuneContent from "../content/immune";
import * as kidneyContent from "../content/kidney";
import * as liverContent from "../content/liver";
import * as lungContent from "../content/lung";
import * as hlca from "../content/lung/atlases/hlca";
import * as musculoskeletalContent from "../content/musculoskeletal";
import * as nervousSystemContent from "../content/nervous-system";
import * as hbca from "../content/nervous-system/atlases/hbca";
import * as hcca from "../content/nervous-system/atlases/hcca";
import * as oralContent from "../content/oral";
import * as organoidContent from "../content/organoid";
import * as pancreasContent from "../content/pancreas";
import * as reproductionContent from "../content/reproduction";
import * as skinContent from "../content/skin";
import adiposeIcon from "../public/bio-networks/icons/adipose.png";
import breastIcon from "../public/bio-networks/icons/breast.png";
import developmentIcon from "../public/bio-networks/icons/development.png";
import eyeIcon from "../public/bio-networks/icons/eye.png";
import geneticDiversityIcon from "../public/bio-networks/icons/genetic-diversity.png";
import gutIcon from "../public/bio-networks/icons/gut.png";
import heartIcon from "../public/bio-networks/icons/heart.png";
import immuneIcon from "../public/bio-networks/icons/immune.png";
import kidneyIcon from "../public/bio-networks/icons/kidney.png";
import liverIcon from "../public/bio-networks/icons/liver.png";
import lungIcon from "../public/bio-networks/icons/lung.png";
import musculoskeletalIcon from "../public/bio-networks/icons/musculoskeletal.png";
import nervousSystemIcon from "../public/bio-networks/icons/nervous-system.png";
import oralIcon from "../public/bio-networks/icons/oral-and-craniofacial.png";
import organoidIcon from "../public/bio-networks/icons/organoid.png";
import pancreasIcon from "../public/bio-networks/icons/pancreas.png";
import reproductionIcon from "../public/bio-networks/icons/reproduction.png";
import skinIcon from "../public/bio-networks/icons/skin.png";
import { DATASETS } from "./datasets";

export const NETWORKS: Network[] = [
  {
    atlases: [],
    contact: { email: "adipose@humancellatlas.org" },
    coordinators: [{ fullName: "Evan Rosen" }, { fullName: "Susanne Mandrup" }],
    datasetQueryOrgans: ["adipose tissue", "omentum"],
    key: "adipose",
    name: "Adipose Network",
    path: "adipose",
  },
  {
    atlases: [],
    contact: { email: "breast@humancellatlas.org" },
    coordinators: [
      { fullName: "Kai Kessenbrock" },
      { fullName: "Nicholas Navin" },
      { fullName: "Walid Khaled" },
    ],
    datasetQueryOrgans: ["breast", "mammary gland"],
    key: "breast",
    name: "Breast Network",
    path: "breast",
  },
  {
    atlases: [],
    contact: { email: "development@humancellatlas.org" },
    coordinators: [
      { fullName: "Alain Chedotal" },
      { fullName: "Muzz Haniffa" },
      { fullName: "Sten Linnarsson" },
      { fullName: "Deanne Taylor" },
    ],
    datasetQueryOrgans: [
      "blastocyst",
      "embryo",
      "hindgut",
      "hindlimb",
      "tail",
      "umbilical cord",
      "whole embryos",
      "whole embryos",
    ],
    key: "development",
    name: "Development Network",
    path: "development",
  },
  {
    atlases: [],
    contact: { email: "eye@humancellatlas.org" },
    coordinators: [{ fullName: "Rui Chen" }, { fullName: "Ayellet Segrè" }],
    datasetQueryOrgans: ["eye", "left eye", "retina", "right eye"],
    key: "eye",
    name: "Eye Network",
    path: "eye",
  },
  {
    atlases: [],
    contact: { email: "genediversity@humancellatlas.org" },
    coordinators: [
      { fullName: "Shyam Prabhakar" },
      { fullName: "Sarah Tishkoff" },
      { fullName: "Jimmie Ye" },
    ],
    datasetQueryOrgans: [],
    key: "genetic-diversity",
    name: "Genetic Diversity Network",
    path: "genetic-diversity",
  },
  {
    atlases: [],
    contact: { email: "gut@humancellatlas.org" },
    coordinators: [
      { fullName: "Alison Simmons" },
      { fullName: "Mike Snyder" },
      { fullName: "Keith Wilson" },
      { fullName: "Ramnik Xavier" },
      { fullName: "Matthias Zilbauer" },
    ],
    datasetQueryOrgans: [
      "abdomen",
      "abdominal wall",
      "ascending colon",
      "bile duct",
      "biliary system",
      "bladder organ",
      "caecum",
      "colon",
      "decidua",
      "descending colon",
      "digestive system",
      "digestive tract",
      "esophagus",
      "hindgut",
      "ileum",
      "intestine",
      "large intestine",
      "mesenteric lymph node",
      "mesentery",
      "presumptive gut",
      "rectum",
      "sigmoid colon",
      "small intestine",
      "stomach",
      "transverse colon",
      "vermiform appendix",
    ],
    key: "gut",
    name: "Gut Network",
    path: "gut",
  },
  {
    atlases: [],
    contact: { email: "heart@humancellatlas.org" },
    coordinators: [
      { fullName: "Raj Gupta" },
      { fullName: "Norbert Hubner" },
      { fullName: "Michela Noseda" },
    ],
    datasetQueryOrgans: [
      "aorta",
      "arterial blood vessel",
      "heart",
      "wall of lateral ventricle",
    ],
    key: "heart",
    name: "Heart Network",
    path: "heart",
  },
  {
    atlases: [],
    contact: { email: "immune@humancellatlas.org" },
    coordinators: [
      { fullName: "Nir Hacohen" },
      { fullName: "Tom Taghon" },
      { fullName: "Chloe Villani" },
    ],
    datasetQueryOrgans: [
      "aorta",
      "arterial blood vessel",
      "blood",
      "blood vessel",
      "bone marrow",
      "central nervous system",
      "hematopoietic system",
      "immune organ",
      "immune system",
      "Immune system",
      "lymph node",
      "mediastinal lymph node",
      "mesenteric lymph node",
      "spleen",
      "thymus",
      "vasculature",
      "venous blood",
    ],
    key: "immune",
    name: "Immune Network",
    path: "immune",
  },
  {
    atlases: [],
    contact: { email: "kidney@humancellatlas.org" },
    coordinators: [
      { fullName: "Menna Clatworthy" },
      { fullName: "Anna Greka" },
      { fullName: "Matthias Kretzler" },
    ],
    datasetQueryOrgans: [
      "kidney",
      "mouse kidney",
      "renal system",
      "ureter",
      "urine",
    ],
    key: "kidney",
    name: "Kidney Network",
    path: "kidney",
  },
  {
    atlases: [],
    contact: { email: "liver@humancellatlas.org" },
    coordinators: [{ fullName: "Gary Bader" }, { fullName: "Alan Mullen" }],
    datasetQueryOrgans: ["liver"],
    key: "liver",
    name: "Liver Network",
    path: "liver",
  },
  {
    atlases: [
      {
        code: [
          {
            label: "https://github.com/LungCellAtlas/HLCA",
            url: "https://github.com/LungCellAtlas/HLCA",
          },
        ],
        contact: { email: "malte.luecken@helmholtz-muenchen.de" },
        coordinators: [{ fullName: "Malte D. Luecken" }],
        cxgId: "6f6d381a-7701-4781-935c-db10d30de293",
        datasets: [
          "01aacb68-4076-4fd9-9eb9-aba0f48c1b5a",
          // "08fb10df-32e5-456c-9882-e33fcd49077a", // unavailable.
          // "111d272b-c25a-49ac-9b25-e062b70d66e0", // not currently listed as lung atlas dataset.
          "1538d572-bcb7-426b-8d2c-84f3a7f87bb0",
          "1c4cbdd4-33e3-4ded-ab43-5958de817123",
          // "1eba4d0b-2d15-4ba7-bb3c-d4654dd94519", // not currently listed as lung atlas dataset.
          "272b7602-66cd-4b02-a86b-2b7c9c51a9ea",
          // "2c4647ba-c814-4158-8ea9-6889930e4dfe", // unavailable.
          "2f676143-80c2-4bc6-b7b4-2613fe0fadf0",
          "326b36bd-0975-475f-983b-56ddb8f73a4d",
          "34c9a62c-a610-4e31-b343-8fb7be676f8c",
          "453d7ee2-319f-496c-9862-99d397870b63",
          "457d0bfe-79e4-43f1-be5d-83bf080d809e",
          "4a95101c-9ffc-4f30-a809-f04518a23803",
          // "54c91ebc-78a2-4616-87c7-7dcedb19903a", // unavailable.
          "58028aa8-0ed2-49ca-b60f-15e2ed5989d5",
          "5a54c617-0eed-486e-8c1a-8a8041fc1729",
          "61515820-5bb8-45d0-8d12-f0850222ecf0",
          "65cbfea5-5c54-4255-a1d0-14549a86a5c1",
          "6936da41-3692-46bb-bca1-cd0f507991e9",
          // "7bc1f14b-5e64-4c7f-86b0-23596b97e2aa", // unavailable.
          "92892ab2-1334-4b1c-9761-14f5a73548ea",
          // "92afaa56-d501-481e-a027-dddd72212ba8", // not currently listed as lung atlas dataset.
          "957261f7-2bd6-4358-a6ed-24ee080d5cfc",
          // "b208466a-6fb0-4385-8cfb-8e03ff6b939e", // not currently listed as lung atlas dataset.
          "b91c623b-1945-4727-b167-0a93027b0d3f",
          "bc5512cc-9544-4aa4-8b75-8af445ee2257",
          "c0518445-3b3b-49c6-b8fc-c41daa4eacba",
          "c16a754f-5da3-46ed-8c1e-6426af2ef625",
          "c1a9a93d-d9de-4e65-9619-a9cec1052eaa",
          "c4077b3c-5c98-4d26-a614-246d12c2e5d7",
          // "d8d2419a-ea4b-49fa-8cae-e87d597d2031", // unavailable.
          "daf9d982-7ce6-43f6-ab51-272577290606",
          // "e456c042-f6b6-4cec-a338-1a8ef80bd779", // not currently listed as lung atlas dataset.
          "e526d91d-cf3a-44cb-80c5-fd7676b55a1d",
          "e5fe8274-3769-4d7d-aa35-6d33c226ab43",
          "ef1e3497-515e-4bbe-8d4c-10161854b699",
          // "fae72d89-4ac4-4aab-9b93-574775e168d4", // not currently listed as lung atlas dataset.
        ],
        externalDatasets: DATASETS.lung,
        integratedAtlases: [],
        key: "hlca-v1.0",
        name: "The integrated Human Lung Cell Atlas (HLCA) v1.0",
        path: "hlca-v1_0",
        publications: [
          {
            doi: "https://doi.org/10.1038/s41591-023-02327-2",
            label: "Sikkema et al. (2023) Nat Med",
          },
        ],
        summaryCellCount: 2400000,
        updatedAt: "",
        version: "v1",
      },
    ],
    contact: { email: "lung@humancellatlas.org" },
    coordinators: [
      { fullName: "Pascal Barbry" },
      { fullName: "Alexander Misharin" },
      { fullName: "Martijn Nawijn" },
      { fullName: "Jay Rajagopal" },
    ],
    datasetQueryOrgans: [
      "bronchus",
      "chest",
      "diaphragm",
      "lung",
      "pair of lungs",
      "trachea",
    ],
    key: "lung",
    name: "Lung Network",
    path: "lung",
  },
  {
    atlases: [],
    contact: { email: "musculoskeletal@humancellatlas.org" },
    coordinators: [
      { fullName: "Sarah Snelling" },
      { fullName: "Mathew Baldwin" },
      { fullName: "Adam Cribbs" },
      { fullName: "Farshid Guilak" },
    ],
    datasetQueryOrgans: [
      "bone element",
      "bone tissue",
      "femur",
      "hindlimb",
      "infratemporal fossa",
      "intervertebral disk",
      "knee",
      "limb",
      "muscle of pelvis",
      "muscle of organ",
      "muscle of tissue",
      "musculature",
      "musculoskeletal system",
      "neck",
      "quadriceps femoris",
      "sacral spinal cord",
      "skeletal element",
      "skeletal muscle organ",
      "tail",
      "tibialis",
    ],
    key: "musculoskeletal",
    name: "Musculoskeletal Network",
    path: "musculoskeletal",
  },
  {
    /* eslint-disable sonarjs/no-duplicate-string -- Using constants for individual strings in the data would be impractical */
    BICCNPublications: [
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/3XNMGDZAHJR0CGM2Z5V/summary",
          },
        ],
        code: [
          {
            label: "Analysis and figures",
            url: "https://dx.doi.org/10.5281/zenodo.7561827",
          },
        ],
        data: [
          {
            label: "NeMO directory",
            url: "http://data.nemoarchive.org/biccn/grant/u01_lein/linnarsson/transcriptome/sncell/10x_v3/human/raw/",
          },
        ],
        doi: "10.1126/science.add7046",
        protocols: [
          {
            label: "Single nucleus RNAseq",
            url: "https://dx.doi.org/10.17504/protocols.io.eq2lyrdpgx9k/v2",
          },
          {
            label: "Postmortem brain processing",
            url: "https://dx.doi.org/10.17504/protocols.io.bf4ajqse",
          },
          {
            label: "Isolation of Nuclei",
            url: "https://dx.doi.org/10.17504/protocols.io.y6rfzd6",
          },
        ],
        tools: [
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/283d65eb-dd53-496d-adb7-7570c7caa443",
          },
        ],
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/LR2KKXNF5VN3LH1AW78/summary",
          },
        ],
        code: [
          {
            label: "snATACutils",
            url: "https://github.com/yal054/snATACutils",
          },
          {
            label: "SnapATAC",
            url: "https://github.com/r3fang/SnapATAC",
          },
          {
            label: "epiformer deep learning",
            url: "https://github.com/yal054/epiformer",
          },
        ],
        data: [
          {
            label: "nemo:dat-d6r90fb",
            url: "https://assets.nemoarchive.org/dat-d6r90fb",
          },
        ],
        doi: "10.1126/science.adf7044",
        tools: [
          {
            label: "CATlas viewer",
            url: "http://catlas.org/",
          },
        ],
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/WX7CGKE3I2ILINMFSHD/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/WU1TPZPRRLUUE2LUO70/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/74D4C75RU9C3GT7LORI/summary",
          },
        ],
        code: [
          {
            label: "Mapping pipeline",
            url: "https://hq-1.gitbook.io/mc/",
          },
          {
            label: "Human Brain Atlas Code",
            url: "https://github.com/jksr/human-brain-atlas-code",
          },
          {
            label: "scHiCluster",
            url: "https://zhoujt1994.github.io/scHiCluster/hba/intro.html",
          },
        ],
        data: [
          {
            label: "nemo:dat-jx4eu3g",
            url: "https://assets.nemoarchive.org/dat-jx4eu3g",
          },
          {
            label: "GEO:GSE215353",
            url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE215353",
          },
        ],
        doi: "10.1126/science.adf5357",
        protocols: [
          {
            label: "3dg dual assay",
            url: "https://labs.icahn.mssm.edu/roussos-lab/3dg_dual_assay/",
          },
        ],
        tools: [
          {
            label: "neomorph",
            url: "http://neomorph.salk.edu/hba/",
          },
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/fdebfda9-bb9a-4b4b-97e5-651097ea07b0",
          },
        ],
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/S1PZCMVDSO4DW77I8SZ/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/3XNMGDZAHJR0CGM2Z5V/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/HPAW0I2JNX5P35OPOPL/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/M3KONFBCWW5CH7QFLFV/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/8G5ACH74WSK2R5DET0Z/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/SQIUKQ8N4CXIEA1X2WP/summary",
          },
        ],
        code: [
          {
            label: "Github analysis code",
            url: "https://github.com/AllenInstitute/human_cross_areal",
          },
        ],
        data: [
          {
            label: "nemo:dat-rg2rc5m",
            url: "https://assets.nemoarchive.org/dat-rg2rc5m",
          },
          {
            label: "nemo:dat-swzf4kc",
            url: "https://assets.nemoarchive.org/dat-swzf4kc",
          },
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/d17249d2-0e6e-4500-abb8-e6c93fa1ac6f",
          },
        ],
        doi: "10.1126/science.adf6812",
        portal: [
          {
            label: "Allen Brain Map",
            url: "https://portal.brain-map.org/atlases-and-data/rnaseq/human-mtg-smart-seq",
          },
        ],
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/Z4KJ7FC4QZWPP8TV4OK",
          },
        ],
        code: [
          {
            label: "Github analysis code",
            url: "https://github.com/AllenInstitute/human_variation",
          },
        ],
        data: [
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/35928d1c-36fc-4f93-9a8d-0b921ab41745",
          },
        ],
        doi: "10.1126/science.adf2359",
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/ALXROAXRSNTLNBG40Y2/summary",
          },
        ],
        data: [
          {
            label: "dandiset/000026",
            url: "https://gui.dandiarchive.org/#/dandiset/000026",
          },
        ],
        doi: "10.1126/sciadv.adg3844",
        protocols: [
          {
            label: "MRI",
            url: "https://www.protocols.io/view/high-resolution-ex-vivo-structural-mri-imaging-amp-q26g7823qlwz/v1",
          },
          {
            label: "Optical Histology",
            url: "https://www.protocols.io/view/serial-sectioning-optical-histology-cell-census-ne-j8nlk4rb6g5r/v1",
          },
          {
            label: "Tissue clearing",
            url: "https://www.protocols.io/view/short-a-human-brain-tissue-clearing-and-labeling-p-kxygxp6nkl8j/v1",
          },
          {
            label: "Stereology",
            url: "https://www.protocols.io/view/stereologic-cell-population-estimates-in-cleared-h-4r3l273dqg1y/v1",
          },
        ],
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/BL4U7YHNH2VUQBI5L2Q/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/GU886D4KCSZGK93SS6H/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/5O3GAQDWZK5ZM3IMWWB/summary",
          },
        ],
        data: [
          {
            label: "NeMO ",
            url: "https://data.nemoarchive.org/biccn/grant/u01_feng/mccarroll/transcriptome/sncell",
          },
          {
            label: "BIL",
            url: "https://doi.org/10.35077/g.609",
          },
        ],
        doi: "10.1126/sciadv.adk3986",
      },
      {
        code: [
          {
            label: "sci-RNA-seq3 demultiplex",
            url: "https://github.com/bbi-lab/bbi-dmux",
          },
          {
            label: "sci-ATAC-seq3 demultiplex",
            url: "https://github.com/bbi-lab/bbi-sciatac-demux",
          },
          {
            label: "sci-RNA-seq3 preprocess",
            url: "https://github.com/bbi-lab/bbi-sci",
          },
          {
            label: "sci-ATAC-seq3 preprocess",
            url: "https://github.com/bbi-lab/bbi-sciatac-analyze",
          },
          {
            label: "analysis",
            url: "https://github.com/CayoBiobankResearchUnit/macaque-brain-atlas",
          },
        ],
        data: [
          {
            label: "nemo:dat-rtmm5q2",
            url: "https://assets.nemoarchive.org/dat-rtmm5q2",
          },
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/8c4bcf0d-b4df-45c7-888c-74fb0013e9e7",
          },
        ],
        doi: "10.1126/sciadv.adh1914",
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/M3KONFBCWW5CH7QFLFV/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/8G5ACH74WSK2R5DET0Z/summary",
          },
        ],
        code: [
          {
            label: "Github analysis code",
            url: "https://github.com/AllenInstitute/Great_Ape_MTG",
          },
        ],
        data: [
          {
            label: "nemo:dat-net1412",
            url: "https://assets.nemoarchive.org/dat-net1412",
          },
          {
            label: "nemo:dat-swzf4kc",
            url: "https://assets.nemoarchive.org/dat-swzf4kc",
          },
        ],
        doi: "10.1126/science.ade9516",
        tools: [
          {
            label: "Cytosplore Viewer",
            url: "https://viewer.cytosplore.org/",
          },
        ],
      },
      {
        data: [
          {
            label: "GEO:GSE204684",
            url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE204684",
          },
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/ceb895f4-ff9f-403a-b7c3-187a9657ac2c",
          },
        ],
        doi: "10.1126/sciadv.adg3754",
        protocols: [
          {
            label: "3dg dual assay",
            url: "https://labs.icahn.mssm.edu/roussos-lab/3dg_dual_assay/",
          },
        ],
        tools: [
          {
            label: "UCSC Genome Browser",
            url: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr19%3A35900492%2D35912218&hgsid=1652940796_hzm9xB0mmqeUreAtoNsAK5xLijfO",
          },
          {
            label: "Single Cell Portal:SCP1859",
            url: "https://singlecell.broadinstitute.org/single_cell/study/SCP1859/multi-omic-profiling-of-the-developing-human-cerebral-cortex-at-the-single-cell-level#study-visualize",
          },
        ],
      },
      {
        code: [
          {
            label: "R scripts gene networks",
            url: "https://github.com/seth-ament/cb-dev",
          },
        ],
        doi: "10.1126/scitranslmed.ade1283",
        tools: [
          {
            label: "NeMO Analytics: 522872b1",
            url: "https://nemoanalytics.org/p?s=522872b1",
          },
        ],
      },
      {
        code: [
          {
            label: "GitHub",
            url: "https://github.com/linnarsson-lab/developing-human-brain/",
          },
        ],
        data: [
          {
            label: "EGA: EGAD00001006049",
            url: "https://ega-archive.org/datasets/EGAD00001006049",
          },
        ],
        doi: "10.1126/science.adf1226",
        tools: [
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/4d8fed08-2d6d-4692-b5ea-464f1d072077",
          },
          {
            label: "Human Cell Atlas",
            url: "https://hdca-sweden.scilifelab.se/tissues-overview/brain/",
          },
        ],
      },
      {
        data: [
          {
            label: "UCSC Cell Browser",
            url: "http://cells.ucsc.edu/?ds=dev-thal",
          },
          {
            label: "Dryad",
            url: "https://doi.org/10.5061/dryad.98sf7m0q1",
          },
        ],
        doi: "10.1126/science.adf9941",
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/3XNMGDZAHJR0CGM2Z5V/summary",
          },
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/E3TEC0QYTQLI9M78VF0/summary",
          },
        ],
        data: [
          {
            label: "nemo:dat-917e9vs",
            url: "https://assets.nemoarchive.org/dat-917e9vs",
          },
        ],
        doi: "10.1101/2021.07.20.453090",
        tools: [
          {
            label: "NeMO Analytics: a856c14e",
            url: "https://nemoanalytics.org/p?l=a856c14e&g=gad2",
          },
        ],
      },
      {
        code: [
          {
            label: "Zenodo",
            url: "https://zenodo.org/record/7245297",
          },
        ],
        data: [
          {
            label: "nemo:dat-3ah9h9x",
            url: "https://assets.nemoarchive.org/dat-3ah9h9x",
          },
          {
            label: "cellxgene",
            url: "https://cellxgene.cziscience.com/collections/bacccb91-066d-4453-b70e-59de0b4598cd",
          },
          {
            label: "UCSC Cell Browser",
            url: "https://human-cortical-dev.cells.ucsc.edu/",
          },
        ],
        doi: "10.1126/science.adf0834",
      },
      {
        code: [
          {
            label: "Github",
            url: "https://github.com/sestanlab/Macaque_corticogenesis_scRNA-seq",
          },
        ],
        data: [
          {
            label: "nemo:dat-fjx1jbr",
            url: "https://assets.nemoarchive.org/dat-fjx1jbr",
          },
          {
            label: "GEO:GSE226451",
            url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE226451",
          },
          {
            label: "GEO:GSE225482",
            url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE225482",
          },
        ],
        doi: "10.1126/science.adf3786",
        tools: [
          {
            label: "Viewer",
            url: "http://resources.sestanlab.org/devmacaquebrain/",
          },
        ],
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/97XR43ZTYJ2CQED8YA6/summary",
          },
        ],
        code: [
          {
            label: "GitHub (Materials)",
            url: "https://github.com/AllenInstitute/human_patchseq_gaba",
          },
          {
            label: "GitHub (Patch-seq)",
            url: "https://github.com/AllenInstitute/patchseqtools",
          },
          {
            label: "GitHub (Electrophysiology)",
            url: "https://github.com/alleninstitute/ipfx",
          },
          {
            label: "GitHub (Morphology)",
            url: "https://github.com/AllenInstitute/neuron_morphology",
          },
          {
            label: "GitHub (Transcriptomics)",
            url: "https://github.com/AllenInstitute/scrattch/",
          },
        ],
        data: [
          {
            label: "BIL",
            url: "https://doi.org/10.35077/g.892",
          },
        ],
        doi: "10.1126/science.adf6484",
      },
      {
        catalog: [
          {
            label: "Project",
            url: "http://knowledge.brain-map.org/data/97XR43ZTYJ2CQED8YA6",
          },
          {
            label: "Project",
            url: "http://knowledge.brain-map.org/data/1HEYEW7GMUKWIQW37BO",
          },
        ],
        data: [
          {
            label: "Human Collections",
            url: "https://knowledge.brain-map.org/data/97XR43ZTYJ2CQED8YA6/collections",
          },
          {
            label: "Mouse Collections",
            url: "https://knowledge.brain-map.org/data/1HEYEW7GMUKWIQW37BO/collections",
          },
        ],
        doi: "10.1126/science.adf0805",
        tools: [
          {
            label: "analysis code",
            url: "http://github.com/AllenInstitute/patchseq_human_L1",
          },
          {
            label: "ipfx (electrophysiology)",
            url: "http://github.com/AllenInstitute/ipfx",
          },
          {
            label: "neuron morphology",
            url: "http://github.com/AllenInstitute/neuron_morphology",
          },
          {
            label: "skeleton keys (morphology)",
            url: "http://github.com/AllenInstitute/skeleton_keys",
          },
          {
            label: "transcriptomics",
            url: "http://github.com/AllenInstitute/scrattch/",
          },
        ],
      },
      {
        doi: "10.1126/sciadv.adf3771",
      },
      {
        catalog: [
          {
            label: "Project",
            url: "https://knowledge.brain-map.org/data/P8U9GO0CSN6VVZBUSIF/summary",
          },
        ],
        code: [
          {
            label: "SPIM stictching",
            url: "https://github.com/chunglabmit/spimstitch",
          },
          {
            label: "UNSLICE",
            url: "https://github.com/chunglabmit/unslice",
          },
          {
            label: "Multi-round alignment",
            url: "https://github.com/chunglabmit/multiround-alignment-ui",
          },
        ],
        data: [
          {
            label: "DANDI:000108",
            url: "https://dandiarchive.org/dandiset/000108/draft",
          },
          {
            label: "DANDI dashboard",
            url: "https://biccn.github.io/Quarterly_Submission_Receipts/000108-dashboard.html",
          },
        ],
        doi: "10.1101/2022.03.13.484171",
        tools: [
          {
            label: "Chung Lab Neuroglancer",
            url: "https://leviathan-chunglab.mit.edu/dandi/",
          },
        ],
      },
      {
        doi: "10.1126/sciadv.ade4511",
      },
      {
        data: [
          {
            label: "DataverseNL",
            url: "https://doi.org/10.34894/TONOHA",
          },
          {
            label: "Synaptic Physiology Coarse Matrix",
            url: "https://brain-map.org/explore/connectivity/synaptic-physiology",
          },
        ],
        doi: "10.1126/sciadv.ade3300",
        tools: [
          {
            label: "Allen Cell Types Database",
            url: "https://celltypes.brain-map.org/",
          },
        ],
      },
      {
        data: [
          {
            label: "DataverseNL",
            url: "https://doi.org/10.34894/L5J0SD",
          },
        ],
        doi: "10.1126/sciadv.adf0708",
        tools: [
          {
            label: "Allen Cell Types Database",
            url: "http://celltypes.brain-map.org/data",
          },
        ],
      },
      {
        code: [
          {
            label: "MIES",
            url: "https://github.com/AllenInstitute/MIES",
          },
          {
            label: "Morphys",
            url: "https://github.com/INF-Rene/Morphys",
          },
        ],
        doi: "10.1101/2023.10.05.561029",
      },
    ],
    /* eslint-enable sonarjs/no-duplicate-string -- Paired enable */
    atlases: [
      {
        code: [
          {
            label: "https://github.com/linnarsson-lab/adult-human-brain",
            url: "https://github.com/linnarsson-lab/adult-human-brain",
          },
        ],
        contact: { email: "kimberly.siletti@ki.se" },
        coordinators: [{ fullName: "Kimberly Siletti" }],
        cxgId: "283d65eb-dd53-496d-adb7-7570c7caa443",
        datasets: [],
        externalDatasets: [],
        integratedAtlases: [],
        key: "hbca-v1.0",
        name: "Human Brain Cell Atlas v1.0",
        path: "hbca-v1_0",
        publications: [
          {
            doi: "https://doi.org/10.1126/science.add7046",
            label: "Siletti et al. (2023) Science",
          },
        ],
        summaryCellCount: 2480956, // First CXG dataset cell count.
        updatedAt: "",
        version: "v1",
      },
      {
        code: [],
        contact: { email: "nervous@humancellatlas.org" },
        coordinators: [],
        cxgId: "",
        datasets: [],
        externalDatasets: [],
        integratedAtlases: [],
        key: "hcca-v1.0",
        name: "Human Cortical Cell Atlas v1.0",
        path: "hcca-v1_0",
        publications: [],
        summaryCellCount: 0,
        updatedAt: "",
        version: "v1",
      },
    ],
    contact: { email: "nervous@humancellatlas.org" },
    coordinators: [{ fullName: "Ed Lein" }, { fullName: "Sten Linnarsson" }],
    datasetQueryOrgans: [
      "adrenal gland",
      "brain",
      "cerebellum",
      "cerebral cortex",
      "cervical lymph node",
      "cervical spinal cord",
      "lumbar spinal cord",
      "nervous system",
      "spinal cord",
      "striatum",
      "thoracic spinal cord",
      "thyroid gland",
      "tibial nerve",
    ],
    key: "nervous-system",
    name: "Nervous System Network",
    path: "nervous-system",
  },
  {
    atlases: [],
    contact: { email: "oral@humancellatlas.org" },
    coordinators: [{ fullName: "Kevin Byrd" }, { fullName: "Ines Sequeira" }],
    datasetQueryOrgans: [
      "infratemporal fossa",
      "head",
      "molar tooth",
      "mouth",
      "mouth mucosa",
      "nose",
      "oral cavity",
      "palatine tonsil",
      "parapharyngeal space",
      "premolar tooth",
      "saliva-secreting gland",
      "tongue",
      "tonsil",
    ],
    key: "oral",
    name: "Oral and Craniofacial Networks",
    path: "oral",
  },
  {
    atlases: [],
    contact: { email: "organoids@humancellatlas.org" },
    coordinators: [
      { fullName: "Christoph Bock" },
      { fullName: "Barbara Treutlein" },
    ],
    datasetQueryOrgans: [],
    key: "organoid",
    name: "Organoid Network",
    path: "organoid",
  },
  {
    atlases: [],
    contact: { email: "pancreas@humancellatlas.org" },
    coordinators: [
      { fullName: "Marcela Brissova" },
      { fullName: "Françoise Carlotti" },
      { fullName: "Roland Eils" },
      { fullName: "Diane Saunders" },
    ],
    datasetQueryOrgans: ["pancreas"],
    key: "pancreas",
    name: "Pancreas Network",
    path: "pancreas",
  },
  {
    atlases: [],
    contact: { email: "reproduction@humancellatlas.org" },
    coordinators: [
      { fullName: "Sue Hammoud" },
      { fullName: "Cecilia Lindskog" },
      { fullName: "Ariella Shikanov" },
      { fullName: "Roser Vento" },
    ],
    datasetQueryOrgans: [
      "endometrium",
      "fallopian tube",
      "gonad",
      "ovary",
      "penis",
      "placenta",
      "prostate gland",
      "skin of prepuce of penis",
      "testis",
      "uterus",
      "vagina",
    ],
    key: "reproduction",
    name: "Reproduction Network",
    path: "reproduction",
  },
  {
    atlases: [],
    contact: { email: "skin@humancellatlas.org" },
    coordinators: [
      { fullName: "Maria Kasper" },
      { fullName: "Maksim Plikus" },
      { fullName: "Fiona Watt" },
    ],
    datasetQueryOrgans: [
      "abdomen",
      "abdominal wall",
      "dermis",
      "endoderm",
      "epithelium",
      "skin",
      "skin epidermis",
      "skin of body",
      "skin of prepuce of penis",
      "zone of skin",
    ],
    key: "skin",
    name: "Skin Network",
    path: "skin",
  },
];

export const NETWORK_CONTENT: {
  [key in NetworkKey]: NetworkModule;
} = {
  adipose: adiposeContent,
  breast: breastContent,
  development: developmentContent,
  eye: eyeContent,
  "genetic-diversity": geneticDiversityContent,
  gut: gutContent,
  heart: heartContent,
  immune: immuneContent,
  kidney: kidneyContent,
  liver: liverContent,
  lung: lungContent,
  musculoskeletal: musculoskeletalContent,
  "nervous-system": nervousSystemContent,
  oral: oralContent,
  organoid: organoidContent,
  pancreas: pancreasContent,
  reproduction: reproductionContent,
  skin: skinContent,
};

export const NETWORK_ICONS: { [key in NetworkKey]: string } = {
  adipose: adiposeIcon,
  breast: breastIcon,
  development: developmentIcon,
  eye: eyeIcon,
  "genetic-diversity": geneticDiversityIcon,
  gut: gutIcon,
  heart: heartIcon,
  immune: immuneIcon,
  kidney: kidneyIcon,
  liver: liverIcon,
  lung: lungIcon,
  musculoskeletal: musculoskeletalIcon,
  "nervous-system": nervousSystemIcon,
  oral: oralIcon,
  organoid: organoidIcon,
  pancreas: pancreasIcon,
  reproduction: reproductionIcon,
  skin: skinIcon,
};

export const ATLAS_CONTENT: { [key in AtlasKey]: AtlasModule } = {
  "hbca-v1.0": hbca,
  "hcca-v1.0": hcca,
  "hlca-v1.0": hlca,
};
