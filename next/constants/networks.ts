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
import * as atlasLung from "../content/lung/atlases/lung";
import * as musculoskeletalContent from "../content/musculoskeletal";
import * as nervousSystemContent from "../content/nervous-system";
import * as altasBrain from "../content/nervous-system/atlases/brain";
import * as atlasCortex from "../content/nervous-system/atlases/cortex";
import * as oralContent from "../content/oral";
import * as organoidContent from "../content/organoid";
import * as pancreasContent from "../content/pancreas";
import * as reproductionContent from "../content/reproduction";
import * as skinContent from "../content/skin";
import adiposeIcon from "../public/hca-bio-networks/icons/adipose.png";
import breastIcon from "../public/hca-bio-networks/icons/breast.png";
import developmentIcon from "../public/hca-bio-networks/icons/development.png";
import eyeIcon from "../public/hca-bio-networks/icons/eye.png";
import geneticDiversityIcon from "../public/hca-bio-networks/icons/genetic-diversity.png";
import gutIcon from "../public/hca-bio-networks/icons/gut.png";
import heartIcon from "../public/hca-bio-networks/icons/heart.png";
import immuneIcon from "../public/hca-bio-networks/icons/immune.png";
import kidneyIcon from "../public/hca-bio-networks/icons/kidney.png";
import liverIcon from "../public/hca-bio-networks/icons/liver.png";
import lungIcon from "../public/hca-bio-networks/icons/lung.png";
import musculoskeletalIcon from "../public/hca-bio-networks/icons/musculoskeletal.png";
import nervousSystemIcon from "../public/hca-bio-networks/icons/nervous-system.png";
import oralIcon from "../public/hca-bio-networks/icons/oral-and-craniofacial.png";
import organoidIcon from "../public/hca-bio-networks/icons/organoid.png";
import pancreasIcon from "../public/hca-bio-networks/icons/pancreas.png";
import reproductionIcon from "../public/hca-bio-networks/icons/reproduction.png";
import skinIcon from "../public/hca-bio-networks/icons/skin.png";
import BICCN_PUBLICATIONS from "./biccn-publications.json";
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
        key: "lung-v1-0",
        name: "The integrated Human Lung Cell Atlas (HLCA) v1.0",
        path: "lung-v1-0",
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
    BICCNPublications: BICCN_PUBLICATIONS.NERVOUS_SYSTEM,
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
        key: "brain-v1-0",
        name: "Human Brain Cell Atlas v1.0",
        path: "brain-v1-0",
        publications: [
          {
            doi: "https://doi.org/10.1126/science.add7046",
            label: "Siletti et al. (2023) Science",
          },
        ],
        subTitle:
          "A first draft atlas of human brain transcriptomic cell types",
        summaryCellCount: 2480956, // First CXG dataset cell count.
        updatedAt: "",
        version: "v1",
      },
      {
        code: [
          {
            label: "https://github.com/AllenInstitute/human_cross_areal",
            url: "https://github.com/AllenInstitute/human_cross_areal",
          },
        ],
        contact: { email: "trygveb@alleninstitute.org" },
        coordinators: [{ fullName: "Trygve Bakken" }],
        cxgId: "d17249d2-0e6e-4500-abb8-e6c93fa1ac6f",
        datasets: [],
        externalDatasets: [],
        integratedAtlases: [],
        key: "cortex-v1-0",
        name: "Human Cortical Cell Atlas v1.0",
        path: "cortex-v1-0",
        publications: [
          {
            doi: "https://doi.org/10.1126/science.adf6812",
            label: "Jorstad et al. (2023) Science",
          },
        ],
        subTitle:
          "A highly detailed atlas of cellular diversity and variation across the neocortex",
        summaryCellCount: 638941, // First CXG dataset cell count.
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
  "brain-v1-0": altasBrain,
  "cortex-v1-0": atlasCortex,
  "lung-v1-0": atlasLung,
};
