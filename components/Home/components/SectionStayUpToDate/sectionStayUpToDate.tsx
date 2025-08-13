import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { StyledTypography } from "../Section/section.styles";
import {
  CTAs,
  SectionStayUpToDate as Section,
  SectionContent,
} from "./sectionStayUpToDate.styles";
import { Button } from "@mui/material";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";

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
            {...BUTTON_PROPS.SECONDARY_CONTAINED}
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
