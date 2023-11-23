import { GridPaperSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import React from "react";

const DATA_RELEASE_POLICY_URL =
  "https://www.humancellatlas.org/data-release-policy";
const DATA_USE_AGREEMENT_URL =
  "https://data.humancellatlas.org/about/data-use-agreement";
const CREATIVE_COMMONS_LICENSE_URL =
  "https://creativecommons.org/licenses/by/4.0";

export const DataReleasePolicy = (): JSX.Element => {
  return (
    <GridPaperSection>
      <span>
        Downloaded and exported data is governed by the{" "}
        <Link label="HCA Data Release Policy" url={DATA_RELEASE_POLICY_URL} />{" "}
        and licensed under the{" "}
        <Link
          label="Creative Commons Attribution 4.0 International License (CC BY 4.0)"
          url={CREATIVE_COMMONS_LICENSE_URL}
        />
        . For more information please see our{" "}
        <Link label="Data Use Agreement" url={DATA_USE_AGREEMENT_URL} />.
      </span>
    </GridPaperSection>
  );
};
