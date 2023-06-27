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

export type Dataset = string;

export interface Publication {
  doi: string;
  label: string;
}

export interface Atlas {
  analysisPortals: AnalysisPortal[];
  contact: Contact;
  coordinators: Coordinator[];
  datasets: Dataset[];
  integratedAtlases: IntegratedAtlas[];
  key: AtlasKey;
  name: string;
  path: string;
  publications: Publication[];
  updatedAt: string;
  version: string;
}

export interface AtlasesRow extends AtlasRow {
  atlasName: string;
  path: string;
}

export type AtlasRow = Omit<IntegratedAtlas, "cxgId" | "cxgURL" | "name">;

export type IntegratedAtlasRow = AtlasRow &
  Pick<IntegratedAtlas, "cxgId" | "cxgURL" | "name">;

export type DatasetQueryOrgan = string;

export interface IntegratedAtlas {
  assay: string[];
  cellCount: number;
  cxgId: string;
  cxgURL: string;
  disease: string[];
  name: string;
  organism: string[];
  tissue: string[];
}

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

export interface AtlasContext extends NetworkContext {
  atlas: Atlas;
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

export type AtlasKey = "lung-v1.0";
