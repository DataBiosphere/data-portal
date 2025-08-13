import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { useSiteConfig } from "../../../../hooks/useSiteConfig";
import { ROUTES } from "../../../../routes/constants";
import { SummaryCounts } from "./components/SummaryCounts/summaryCounts";
import {
  CTAs,
  Head,
  Headline,
  SectionHero as Hero,
  Subhead,
} from "./sectionHero.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Button } from "@mui/material";
import { BUTTON_PROPS as COMPONENT_BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";

export const SectionHero = (): JSX.Element => {
  const { browserURL } = useSiteConfig();
  return (
    <Hero>
      <Headline>
        <Head>
          <span>Explore the datasets</span> <span>of the Human Cell Atlas</span>
        </Head>
        <Subhead
          component="h2"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}
        >
          Community generated, multi-omic, open data
        </Subhead>
        <CTAs>
          <Button
            {...COMPONENT_BUTTON_PROPS.SECONDARY_CONTAINED}
            href={browserURL}
            id={"button-explore-data"}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={ANCHOR_TARGET.BLANK}
          >
            Explore Data
          </Button>
          <Button
            color={BUTTON_PROPS.COLOR.SECONDARY}
            href={ROUTES.CONTRIBUTE}
            rel={REL_ATTRIBUTE.NO_OPENER}
            variant={BUTTON_PROPS.VARIANT.OUTLINED}
          >
            Contribute Data
          </Button>
        </CTAs>
      </Headline>
      <SummaryCounts />
    </Hero>
  );
};
