import { ButtonSecondary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { SectionHead } from "../Section/section.styles";
import {
  CTAs,
  SectionContent,
  SectionStayUpToDate as Section,
} from "./sectionStayUpToDate.styles";

export const SectionStayUpToDate = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <SectionHead>Stay up-to-date with the human cell atlas</SectionHead>
        <CTAs>
          <ButtonSecondary href="https://www.humancellatlas.org/register/">
            Join The HCA Register Of Interest
          </ButtonSecondary>
        </CTAs>
      </SectionContent>
    </Section>
  );
};
