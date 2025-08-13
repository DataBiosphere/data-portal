import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NETWORK_ICONS } from "../../../../constants/networks";
import { NETWORKS_ROUTE } from "../../../../constants/routes";
import { useNetworkList } from "../../../../hooks/useNetworkList";
import { getBioNetworkName } from "../../../../viewModelBuilders/viewModelBuilders";
import { Section, StyledTypography } from "../Section/section.styles";
import {
  Badge,
  BioNetworkAtlas,
  BioNetworkAtlases,
  SectionContent,
} from "./sectionBioNetworkAtlases.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const SectionBioNetworkAtlases = (): JSX.Element => {
  const router = useRouter();
  const networks = useNetworkList();
  return (
    <Section>
      <SectionContent>
        <StyledTypography
          component="h3"
          variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}
        >
          HCA Biological Network Atlases
        </StyledTypography>
        <BioNetworkAtlases>
          {networks.map(({ atlases, key, name, path }) => (
            <BioNetworkAtlas
              key={key}
              onClick={(): Promise<boolean> =>
                router.push(`${NETWORKS_ROUTE}/${path}`)
              }
            >
              <StaticImage alt={name} height={36} src={NETWORK_ICONS[key]} />
              <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
                {getBioNetworkName(name)}
              </Typography>
              {atlases.length > 0 && (
                <Tooltip arrow placement="top" title="Atlases">
                  <Badge>{atlases.length}</Badge>
                </Tooltip>
              )}
            </BioNetworkAtlas>
          ))}
        </BioNetworkAtlases>
      </SectionContent>
    </Section>
  );
};
