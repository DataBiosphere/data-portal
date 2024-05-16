import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
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
        <SectionHead>Stay up-to-date with the Human Cell Atlas</SectionHead>
        <CTAs>
          <ButtonSecondary href="https://www.humancellatlas.org/register/">
            Join The HCA
          </ButtonSecondary>
        </CTAs>
      </SectionContent>
    </Section>
  );
};
