import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import React, { Fragment } from "react";
import { Caption } from "./cxgDownloadCaption.styles";

interface CXGDownloadCaptionProps {
  isRDS: boolean;
}

const DISCOVER_API_URL = "https://api.cellxgene.cziscience.com/curation/ui/#/";
const SCHEMA_URL =
  "https://github.com/chanzuckerberg/single-cell-curation/blob/main/schema/3.1.0/schema.md";
const SEURAT_SCHEMA_URL =
  "https://github.com/chanzuckerberg/single-cell-curation/blob/main/schema/3.1.0/seurat_encoding.md";

export const CXGDownloadCaption = ({
  isRDS,
}: CXGDownloadCaptionProps): JSX.Element => {
  return (
    <Caption>
      <p>
        This download link permanently references this version of the dataset.
        If this dataset is updated, a new download link will be created that
        permanently references the next version of this dataset.
      </p>
      <p>
        Individual datasets and their versions may also be downloaded
        programmatically using the{" "}
        <Link label="Discover API" url={DISCOVER_API_URL} />. The{" "}
        <Link label="dataset schema" url={SCHEMA_URL} /> describes the required
        metadata embedded in all datasets submitted to CZ CELLxGENE Discover.{" "}
        {isRDS && (
          <Fragment>
            All datasets are automatically converted to a{" "}
            <Link label="Seurat V4 object" url={SEURAT_SCHEMA_URL} />.
          </Fragment>
        )}
      </p>
    </Caption>
  );
};
