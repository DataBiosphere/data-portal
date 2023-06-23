import { StaticImage } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { NETWORK_ICONS } from "../../../../constants/networks";
import { NETWORKS_ROUTE } from "../../../../constants/routes";
import { useNetworkList } from "../../../../hooks/useNetworkList";
import { Section, SectionHead } from "../Section/section.styles";
import {
  BioNetworkAtlas,
  BioNetworkAtlases,
  SectionContent,
} from "./sectionBioNetworkAtlases.styles";

export const SectionBioNetworkAtlases = (): JSX.Element => {
  const networks = useNetworkList();
  return (
    <Section>
      <SectionContent>
        <SectionHead>Explore BioNework Atlases</SectionHead>
        <BioNetworkAtlases>
          {networks.map(({ key, name, path }) => (
            <Link
              key={key}
              label={
                <BioNetworkAtlas>
                  <StaticImage alt={name} src={NETWORK_ICONS[key]} />
                  <Typography variant={TEXT_BODY_LARGE_500}>
                    {renderBioNetworkName(name)}
                  </Typography>
                </BioNetworkAtlas>
              }
              url={`${NETWORKS_ROUTE}/${path}`}
            />
          ))}
        </BioNetworkAtlases>
      </SectionContent>
    </Section>
  );
};

/**
 * Returns the bio network name, without the suffix "Network".
 * @param name - Bio network name.
 * @returns name of the bio network.
 */
function renderBioNetworkName(name: string): string {
  return name.replace(/(\sNetwork.*)/gi, "");
}
