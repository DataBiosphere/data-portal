export interface PublishedAtlas {
  capId: string | null; // Full CAP project URL, e.g. "https://celltype.info/project/1030".
  cellxgeneAtlasCollection: string | null; // CELLxGENE collection ID.
  id: string;
  name: string;
  network: string;
  publishedAt: string;
  shortName: string;
  shortNameSlug: string;
  version: string;
}
