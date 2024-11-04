import { ButtonSecondary } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondary/buttonSecondary";
import { ButtonSecondaryOutline } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonSecondaryOutline/buttonSecondaryOutline";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { ROUTES } from "../../../../routes/constants";
import { SummaryCounts } from "./components/SummaryCounts/summaryCounts";
import {
  CTAs,
  Head,
  Headline,
  SectionHero as Hero,
  Subhead,
} from "./sectionHero.styles";

export const SectionHero = (): JSX.Element => {
  const {
    config: { browserURL },
  } = useConfig();
  const onExplore = (): void => {
    window.open(
      browserURL,
      ANCHOR_TARGET.BLANK,
      REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
    );
  };
  return (
    <Hero>
      <Headline>
        <Head>
          <span>Explore the datasets</span> <span>of the Human Cell Atlas</span>
        </Head>
        <Subhead>Community generated, multi-omic, open data</Subhead>
        <CTAs>
          <ButtonSecondary onClick={onExplore} id={"button-explore-data"}>
            Explore Data
          </ButtonSecondary>
          <ButtonSecondaryOutline href={ROUTES.CONTRIBUTE}>
            Contribute Data
          </ButtonSecondaryOutline>
        </CTAs>
      </Headline>
      <SummaryCounts />
    </Hero>
  );
};
