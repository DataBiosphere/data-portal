import { StaticImageProps } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { LinkProps } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { ElementType } from "react";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";

export interface Coordinator {
  fullName: string;
}

export interface Contact {
  email: string;
}

/**
 * Set of analysis portals.
 */
export enum ANALYSIS_PORTAL {
  CELLXGENE = "CELLXGENE",
}

export interface AnalysisPortal {
  icon: StaticImageProps["src"];
  label: string;
  name: string;
  url: string;
}

export type Dataset = string;

export interface Publication {
  doi: string;
  label: string;
}

export interface Atlas {
  code?: Pick<LinkProps, "label" | "url">[];
  contact: Contact;
  coordinators: Coordinator[];
  cxgId: string;
  datasets: Dataset[];
  externalDatasets: ProjectsResponse[];
  integratedAtlases: IntegratedAtlas[];
  key: AtlasKey;
  name: string;
  path: string;
  publications: Publication[];
  summaryCellCount?: number;
  updatedAt: string;
  version: string;
}

export interface AtlasesRow extends AtlasRow {
  atlasName: string;
  path: string;
  summaryCellCount?: number;
}

export type AtlasRow = Omit<IntegratedAtlas, "cxgId" | "cxgURL" | "name">;

export interface CXGAssay {
  label: string;
}

export interface CXGDataset {
  assay: CXGAssay[];
  cell_count: number;
  collection_id: string;
  dataset_assets: CXGDatasetAsset[];
  dataset_deployments: CXGDatasetDeployment[];
  disease: CXGDisease[];
  id: string;
  name: string;
  organism: CXGOrganism[];
  tissue: CXGTissue[];
}

export interface CXGDatasetAsset {
  dataset_id: string;
  filetype: "H5AD" | "RDS";
}

export interface CXGDatasetDeployment {
  url: string;
}

export interface CXGDisease {
  label: string;
}

export type CXGDownloadURL = {
  h5ad: string | null;
  rds: string | null;
};

export interface CXGOrganism {
  label: string;
}

export interface CXGTissue {
  label: string;
}

export type IntegratedAtlasRow = AtlasRow &
  Pick<IntegratedAtlas, "cxgDownloadURL" | "cxgId" | "cxgURL" | "name">;

export type DatasetQueryOrgan = string;

export interface IntegratedAtlas {
  assay: string[];
  cellCount: number;
  cxgDownloadURL: CXGDownloadURL;
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

export type AtlasKey = "hbca-v1.0" | "hcca-v1.0" | "hlca-v1.0";
