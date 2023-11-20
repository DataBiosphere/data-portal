import { StaticImage } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NETWORK_ICONS } from "../../../../constants/networks";
import { NETWORKS_ROUTE } from "../../../../constants/routes";
import { useNetworkList } from "../../../../hooks/useNetworkList";
import { getBioNetworkName } from "../../../../viewModelBuilders/viewModelBuilders";
import { Section, SectionHead } from "../Section/section.styles";
import {
  Badge,
  BioNetworkAtlas,
  BioNetworkAtlases,
  SectionContent,
} from "./sectionBioNetworkAtlases.styles";

export const SectionBioNetworkAtlases = (): JSX.Element => {
  const router = useRouter();
  const networks = useNetworkList();
  return (
    <Section>
      <SectionContent>
        <SectionHead>HCA Biological Network Atlases</SectionHead>
        <BioNetworkAtlases>
          {networks.map(({ atlases, key, name, path }) => (
            <BioNetworkAtlas
              key={key}
              onClick={(): Promise<boolean> =>
                router.push(`${NETWORKS_ROUTE}/${path}`)
              }
            >
              <StaticImage alt={name} height={36} src={NETWORK_ICONS[key]} />
              <Typography variant={TEXT_BODY_LARGE_500}>
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
