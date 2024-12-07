import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SectionHead } from "../Section/section.styles";
import {
  CTAs,
  SectionStayUpToDate as Section,
  SectionContent,
} from "./sectionStayUpToDate.styles";

export const SectionStayUpToDate = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <SectionHead>Stay up-to-date with the Human Cell Atlas</SectionHead>
        <CTAs>
          {/* eslint-disable sonarjs/link-with-target-blank -- rule doesn't recognize constant */}
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
          {/* eslint-enable sonarjs/link-with-target-blank -- keep checking future noopener cases */}
        </CTAs>
      </SectionContent>
    </Section>
  );
};
