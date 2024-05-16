import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import {
  Link,
  LinkProps,
} from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import React from "react";
import { SectionContent } from "../../section.styles";

export interface ReferencesProps {
  links: Pick<LinkProps, "label" | "url">[];
  title: string;
}

export const References = ({ links, title }: ReferencesProps): JSX.Element => {
  return (
    <GridPaperSection>
      <SectionContent>
        <SectionTitle title={title} />
        {links.length > 0
          ? links.map(({ label, url }, i) => (
              <Link key={`${label}${i}`} label={label} url={url} />
            ))
          : "None"}
      </SectionContent>
    </GridPaperSection>
  );
};
