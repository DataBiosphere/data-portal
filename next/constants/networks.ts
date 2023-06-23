import { ElementType } from "react";
import { AtlasKey, AtlasModule, Network, NetworkKey } from "../@types/network";
import * as adiposeAtlases from "../content/adipose/atlases";
import AdiposeDescription from "../content/adipose/description.mdx";
import BreastDescription from "../content/breast/description.mdx";
import DevelopmentDescription from "../content/development/description.mdx";
import EyeDescription from "../content/eye/description.mdx";
import GeneticDiversityDescription from "../content/genetic-diversity/description.mdx";
import GutDescription from "../content/gut/description.mdx";
import HeartDescription from "../content/heart/description.mdx";
import ImmuneDescription from "../content/immune/description.mdx";
import KidneyDescription from "../content/kidney/description.mdx";
import LiverDescription from "../content/liver/description.mdx";
import LungDescription from "../content/lung/description.mdx";
import MusculoskeletalDescription from "../content/musculoskeletal/description.mdx";
import NervousSystemDescription from "../content/nervous-system/description.mdx";
import OralDescription from "../content/oral/description.mdx";
import OrganoidDescription from "../content/organoid/description.mdx";
import PancreasDescription from "../content/pancreas/description.mdx";
import ReproductionDescription from "../content/reproduction/description.mdx";
import SkinDescription from "../content/skin/description.mdx";
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
    atlases: [
      {
        analysisPortals: [],
        contact: { email: "adipose@humancellatlas.org" },
        coordinators: [{ fullName: "TBD" }],
        datasets: [
          "74b6d569-3b11-42ef-b6b1-a0454522b4a0",
          "7027adc6-c9c9-46f3-84ee-9badc3a4f53b",
          "94e4ee09-9b4b-410a-84dc-a751ad36d0df",
        ],
        key: "blood-v1",
        name: "Blood",
        path: "blood-v1",
        publications: [],
        updatedAt: "June 27, 2022",
        version: "v1",
      },
    ],
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
    atlases: [],
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
    atlases: [],
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
    name: "Oral and craniofacial Networks",
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

export const DESCRIPTION_COMPONENTS: { [key in NetworkKey]: ElementType } = {
  adipose: AdiposeDescription,
  breast: BreastDescription,
  development: DevelopmentDescription,
  eye: EyeDescription,
  "genetic-diversity": GeneticDiversityDescription,
  gut: GutDescription,
  heart: HeartDescription,
  immune: ImmuneDescription,
  kidney: KidneyDescription,
  liver: LiverDescription,
  lung: LungDescription,
  musculoskeletal: MusculoskeletalDescription,
  "nervous-system": NervousSystemDescription,
  oral: OralDescription,
  organoid: OrganoidDescription,
  pancreas: PancreasDescription,
  reproduction: ReproductionDescription,
  skin: SkinDescription,
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

export const ATLASES: { [key in AtlasKey]: AtlasModule } = {
  "blood-v1": adiposeAtlases,
};
