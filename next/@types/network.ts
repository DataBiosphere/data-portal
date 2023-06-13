export interface Coordinator {
  fullName: string;
}

export interface Contact {
  email: string;
}

export type Dataset = string; //TBD

export type Publication = string; //TBD

export interface Atlas {
  datasets: Dataset[];
  name: string;
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
