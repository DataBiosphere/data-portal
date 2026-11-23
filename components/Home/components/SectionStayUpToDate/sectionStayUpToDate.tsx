import { StyledTypography } from "@/components/Home/components/Section/section.styles";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Button } from "@mui/material";
import type { JSX } from "react";
import {
  CTAs,
  SectionStayUpToDate as Section,
  SectionContent,
} from "./sectionStayUpToDate.styles";

export const SectionStayUpToDate = (): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <StyledTypography
          component="h3"
          variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}
        >
          Stay up-to-date with the Human Cell Atlas
        </StyledTypography>
        <CTAs>
          <Button
            {...BUTTON_PRESETS.SECONDARY_OUTLINED}
            href="https://www.humancellatlas.org/register"
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={ANCHOR_TARGET.BLANK}
          >
            Join The HCA
          </Button>
        </CTAs>
      </SectionContent>
    </Section>
  );
};
