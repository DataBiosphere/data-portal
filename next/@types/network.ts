import { ElementType } from "react";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";

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

export type DatasetQueryOrgan = string;

export interface Network {
  atlases: Atlas[];
  contact: Contact;
  coordinators: Coordinator[];
  datasetQueryOrgans: DatasetQueryOrgan[];
  key: NetworkKey;
  name: string;
  path: string;
}

export type NetworkParam = {
  network: Network;
  projectsResponses: ProjectsResponse[];
};

export interface AtlasContext {
  atlas: Atlas;
  network: Network;
}

export interface NetworkContext {
  network: Network;
  projectsResponses: ProjectsResponse[];
}

export interface AtlasModule {
  Description: ElementType;
  Inclusion: ElementType;
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
