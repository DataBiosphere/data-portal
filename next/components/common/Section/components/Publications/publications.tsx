import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import React from "react";
import { Publication } from "../../../../../@types/network";
import { SectionContent } from "../../section.styles";

export interface PublicationsProps {
  publications: Publication[];
}

export const Publications = ({
  publications,
}: PublicationsProps): JSX.Element => {
  return (
    <GridPaperSection>
      <SectionContent>
        <SectionTitle title="Publication" />
        {publications.length > 0
          ? publications.map(({ doi, label }, i) => (
              <Link key={`${doi}${i}`} label={label} url={doi} />
            ))
          : "None"}
      </SectionContent>
    </GridPaperSection>
  );
};
