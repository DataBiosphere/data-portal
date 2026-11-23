import { ButtonOutline } from "@/components/common/Button/components/ButtonOutline/buttonOutline";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { ROUTES } from "@/routes/constants";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import type { JSX } from "react";
import { SummaryCounts } from "./components/SummaryCounts/summaryCounts";
import {
  CTAs,
  ExploreDataButton,
  Head,
  Headline,
  SectionHero as Hero,
  Subhead,
} from "./sectionHero.styles";

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
          <ExploreDataButton
            {...BUTTON_PRESETS.SECONDARY_OUTLINED}
            href={browserURL}
            id={"button-explore-data"}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={ANCHOR_TARGET.BLANK}
          >
            Explore Data
          </ExploreDataButton>
          <ButtonOutline href={ROUTES.CONTRIBUTE} rel={REL_ATTRIBUTE.NO_OPENER}>
            Contribute Data
          </ButtonOutline>
        </CTAs>
      </Headline>
      <SummaryCounts />
    </Hero>
  );
};
