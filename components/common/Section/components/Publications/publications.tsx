import { SectionContent } from "@/components/common/Section/section.styles";
import { Publication } from "@/types/network";
import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { JSX } from "react";

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
