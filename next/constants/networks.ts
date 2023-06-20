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

export const NETWORKS: Network[] = [
  {
    atlases: [],
    contact: { email: "adipose@humancellatlas.org" },
    coordinators: [{ fullName: "Evan Rosen" }, { fullName: "Susanne Mandrup" }],
    descriptionKey: "adipose",
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
    descriptionKey: "breast",
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
    descriptionKey: "development",
    name: "Development Network",
    path: "development",
  },
  {
    atlases: [],
    contact: { email: "eye@humancellatlas.org" },
    coordinators: [{ fullName: "Rui Chen" }, { fullName: "Ayellet Segrè" }],
    descriptionKey: "eye",
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
    descriptionKey: "genetic-diversity",
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
    descriptionKey: "gut",
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
    descriptionKey: "heart",
    name: "Heart Network",
    path: "heart",
  },
  {
    atlases: [
      {
        analysisPortals: [],
        contact: { email: "adipose@humancellatlas.org" },
        coordinators: [{ fullName: "TBD" }],
        datasets: [],
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
    descriptionKey: "immune",
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
    descriptionKey: "kidney",
    name: "Kidney Network",
    path: "kidney",
  },
  {
    atlases: [],
    contact: { email: "liver@humancellatlas.org" },
    coordinators: [{ fullName: "Gary Bader" }, { fullName: "Alan Mullen" }],
    descriptionKey: "liver",
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
    descriptionKey: "lung",
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
    descriptionKey: "musculoskeletal",
    name: "Musculoskeletal Network",
    path: "musculoskeletal",
  },
  {
    atlases: [],
    contact: { email: "nervous@humancellatlas.org" },
    coordinators: [{ fullName: "Ed Lein" }, { fullName: "Sten Linnarsson" }],
    descriptionKey: "nervous-system",
    name: "Nervous System Network",
    path: "nervous-system",
  },
  {
    atlases: [],
    contact: { email: "oral@humancellatlas.org" },
    coordinators: [{ fullName: "Kevin Byrd" }, { fullName: "Ines Sequeira" }],
    descriptionKey: "oral",
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
    descriptionKey: "organoid",
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
    descriptionKey: "pancreas",
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
    descriptionKey: "reproduction",
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
    descriptionKey: "skin",
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

export const ATLASES: { [key in AtlasKey]: AtlasModule } = {
  "blood-v1": adiposeAtlases,
};
