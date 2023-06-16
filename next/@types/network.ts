import { MDXProps } from "mdx/types";

export interface Coordinator {
  fullName: string;
}

export interface Contact {
  email: string;
}

export interface AnalysisPortal {
  name: string;
}

export type Dataset = string; //TBD

export type Publication = string; //TBD

export type MDXComponent = (props: MDXProps) => JSX.Element;

export interface Atlas {
  analysisPortals: AnalysisPortal[];
  contact: Contact;
  coordinators: Coordinator[];
  datasets: Dataset[];
  key: AtlasKey;
  name: string;
  path: string;
  publications: Publication[];
  updatedAt: string;
  version: string;
}

export interface Network {
  atlases: Atlas[];
  contact: Contact;
  coordinators: Coordinator[];
  descriptionKey: NetworkKey;
  name: string;
  path: string;
}

export type NetworkParam = {
  network: Network;
};

export interface AtlasContext {
  atlas: Atlas;
  network: Network;
}

export interface AtlasModule {
  Description: MDXComponent;
  Inclusion: MDXComponent;
}

export type NetworkKey =
  | "adipose"
  | "breast"
  | "development"
  | "eye"
  | "genetic-diversity"
  | "gut"
  | "heart"
  | "immune"
  | "kidney"
  | "liver"
  | "lung"
  | "musculoskeletal"
  | "nervous-system"
  | "oral"
  | "organoid"
  | "pancreas"
  | "reproduction"
  | "skin";

export type AtlasKey = "blood-v1";
