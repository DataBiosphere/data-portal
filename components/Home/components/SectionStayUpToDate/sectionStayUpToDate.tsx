import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
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
          <ButtonSecondary
            onClick={(): void => {
              window.open(
                "https://www.humancellatlas.org/register",
                ANCHOR_TARGET.BLANK,
                REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
              );
            }}
          >
            Join The HCA
          </ButtonSecondary>
        </CTAs>
      </SectionContent>
    </Section>
  );
};
