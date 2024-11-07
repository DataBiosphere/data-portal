import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import {
  Link,
  LinkProps,
} from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { SectionContent } from "../../section.styles";
import { Section } from "./references.styles";

export interface ReferencesProps {
  links: Pick<LinkProps, "label" | "url">[];
  title: string;
}

export const References = ({ links, title }: ReferencesProps): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <SectionTitle title={title} />
        {links.length > 0
          ? links.map(({ label, url }, i) => (
              <Link key={`${label}${i}`} label={label} url={url} />
            ))
          : "None"}
      </SectionContent>
    </Section>
  );
};
