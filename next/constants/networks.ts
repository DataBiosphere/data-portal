import { AtlasKey, AtlasModule, MDXComponent, Network } from "../@types/network";
import AdiposeDescription from "../mdx/adipose/description.mdx";
import BreastDescription from "../mdx/breast/description.mdx";
import DevelopmentDescription from "../mdx/development/description.mdx";
import EyeDescription from "../mdx/eye/description.mdx";
import GeneticDiversityDescription from "../mdx/genetic-diversity/description.mdx";
import GutDescription from "../mdx/gut/description.mdx";
import HeartDescription from "../mdx/heart/description.mdx";
import ImmuneDescription from "../mdx/immune/description.mdx";
import KidneyDescription from "../mdx/kidney/description.mdx";
import LiverDescription from "../mdx/liver/description.mdx";
import LungDescription from "../mdx/lung/description.mdx";
import MusculoskeletalDescription from "../mdx/musculoskeletal/description.mdx";
import NervousSystemDescription from "../mdx/nervous-system/description.mdx";
import OralDescription from "../mdx/oral/description.mdx";
import OrganoidDescription from "../mdx/organoid/description.mdx";
import PancreasDescription from "../mdx/pancreas/description.mdx";
import ReproductionDescription from "../mdx/reproduction/description.mdx";
import SkinDescription from "../mdx/skin/description.mdx";
import * as adiposeAtlases from '../mdx/adipose/atlases';
import { NetworkKey } from "./../@types/network";
import { MDXRemoteProps } from "next-mdx-remote";

export const NETWORKS: Network[] = [
  {
    name: "Adipose Network",
    path: "adipose",
    descriptionKey: "adipose",
    contact: {
      email: "adipose@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Evan Rosen",
      },
      {
        fullName: "Susanne Mandrup",
      },
    ],
    atlases: []
  },
  {
    name: "Breast Network",
    path: "breast",
    descriptionKey: "breast",
    contact: {
      email: "breast@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Kai Kessenbrock",
      },
      {
        fullName: "Nicholas Navin",
      },
      {
        fullName: "Walid Khaled",
      },
    ],
    atlases: [],
  },
  {
    name: "Development Network",
    path: "development",
    descriptionKey: "development",
    contact: {
      email: "development@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Alain Chedotal",
      },
      {
        fullName: "Muzz Haniffa",
      },
      {
        fullName: "Sten Linnarsson",
      },
      {
        fullName: "Deanne Taylor",
      },
    ],
    atlases: [],
  },
  {
    name: "Eye Network",
    path: "eye",
    descriptionKey: "eye",
    contact: {
      email: "eye@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Rui Chen",
      },
      {
        fullName: "Ayellet Segrè",
      },
    ],
    atlases: [],
  },
  {
    name: "Genetic Diversity Network",
    path: "genetic-diversity",
    descriptionKey: "genetic-diversity",
    contact: {
      email: "genediversity@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Shyam Prabhakar",
      },
      {
        fullName: "Sarah Tishkoff",
      },
      {
        fullName: "Jimmie Ye",
      },
    ],
    atlases: [],
  },
  {
    name: "Gut Network",
    path: "gut",
    descriptionKey: "gut",
    contact: {
      email: "gut@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Alison Simmons",
      },
      {
        fullName: "Mike Snyder",
      },
      {
        fullName: "Keith Wilson",
      },
      {
        fullName: "Ramnik Xavier",
      },
      {
        fullName: "Matthias Zilbauer",
      },
    ],
    atlases: [],
  },
  {
    name: "Heart Network",
    path: "heart",
    descriptionKey: "heart",
    contact: {
      email: "heart@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Raj Gupta",
      },
      {
        fullName: "Norbert Hubner",
      },
      {
        fullName: "Michela Noseda",
      },
    ],
    atlases: [],
  },
  {
    name: "Immune Network",
    path: "immune",
    descriptionKey: "immune",
    contact: {
      email: "immune@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Nir Hacohen",
      },
      {
        fullName: "Tom Taghon",
      },
      {
        fullName: "Chloe Villani",
      },
    ],
    atlases: [
      {
        key: 'blood-v1',
        path: 'blood-v1',
        coordinators: [
          {
            fullName: 'TBD'
          }
        ],
        analysisPortals: [],
        datasets: [],
        publications: [],
        name: 'Blood',
        updatedAt: 'June 27, 2022',
        version: 'v1',
        contact: {
          email: "adipose@humancellatlas.org",
        },
      }
    ],
  },
  {
    name: "Kidney Network",
    path: "kidney",
    descriptionKey: "kidney",
    contact: {
      email: "kidney@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Menna Clatworthy",
      },
      {
        fullName: "Anna Greka",
      },
      {
        fullName: "Matthias Kretzler",
      },
    ],
    atlases: [],
  },
  {
    name: "Liver Network",
    path: "liver",
    descriptionKey: "liver",
    contact: {
      email: "liver@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Gary Bader",
      },
      {
        fullName: "Alan Mullen",
      },
    ],
    atlases: [],
  },
  {
    name: "Lung Network",
    path: "lung",
    descriptionKey: "lung",
    contact: {
      email: "lung@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Pascal Barbry",
      },
      {
        fullName: "Alexander Misharin",
      },
      {
        fullName: "Martijn Nawijn",
      },
      {
        fullName: "Jay Rajagopal",
      },
    ],
    atlases: [],
  },
  {
    name: "Musculoskeletal Network",
    path: "musculoskeletal",
    descriptionKey: "musculoskeletal",
    contact: {
      email: "musculoskeletal@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Sarah Snelling",
      },
      {
        fullName: "Mathew Baldwin",
      },
      {
        fullName: "Adam Cribbs",
      },
      {
        fullName: "Farshid Guilak",
      },
    ],
    atlases: [],
  },
  {
    name: "Nervous System Network",
    path: "nervous-system",
    descriptionKey: "nervous-system",
    contact: {
      email: "nervous@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Ed Lein",
      },
      {
        fullName: "Sten Linnarsson",
      },
    ],
    atlases: [],
  },
  {
    name: "Oral and craniofacial Networks",
    path: "oral",
    descriptionKey: "oral",
    contact: {
      email: "oral@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Kevin Byrd",
      },
      {
        fullName: "Ines Sequeira",
      },
    ],
    atlases: [],
  },
  {
    name: "Organoid Network",
    path: "organoid",
    descriptionKey: "organoid",
    contact: {
      email: "organoids@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Christoph Bock",
      },
      {
        fullName: "Barbara Treutlein",
      },
    ],
    atlases: [],
  },
  {
    name: "Pancreas Network",
    path: "pancreas",
    descriptionKey: "pancreas",
    contact: {
      email: "pancreas@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Marcela Brissova",
      },
      {
        fullName: "Françoise Carlotti",
      },
      {
        fullName: "Roland Eils",
      },
      {
        fullName: "Diane Saunders",
      },
    ],
    atlases: [],
  },
  {
    name: "Reproduction Network",
    path: "reproduction",
    descriptionKey: "reproduction",
    contact: {
      email: "reproduction@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Sue Hammoud",
      },
      {
        fullName: "Cecilia Lindskog",
      },
      {
        fullName: "Ariella Shikanov",
      },
      {
        fullName: "Roser Vento",
      },
    ],
    atlases: [],
  },
  {
    name: "Skin Network",
    path: "skin",
    descriptionKey: "skin",
    contact: {
      email: "skin@humancellatlas.org",
    },
    coordinators: [
      {
        fullName: "Maria Kasper",
      },
      {
        fullName: "Maksim Plikus",
      },
      {
        fullName: "Fiona Watt",
      },
    ],
    atlases: [],
  },
];

export const DESCRIPTION_COMPONENTS: { [key in NetworkKey]: MDXComponent } = {
  adipose: AdiposeDescription,
  "genetic-diversity": GeneticDiversityDescription,
  "nervous-system": NervousSystemDescription,
  breast: BreastDescription,
  development: DevelopmentDescription,
  eye: EyeDescription,
  gut: GutDescription,
  heart: HeartDescription,
  immune: ImmuneDescription,
  kidney: KidneyDescription,
  liver: LiverDescription,
  lung: LungDescription,
  musculoskeletal: MusculoskeletalDescription,
  oral: OralDescription,
  organoid: OrganoidDescription,
  pancreas: PancreasDescription,
  reproduction: ReproductionDescription,
  skin: SkinDescription,
};

export const ATLASES: { [key in AtlasKey]: AtlasModule } = {
  'blood-v1': adiposeAtlases
}