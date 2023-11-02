import { StaticImage } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { useConfig } from "../../../../hooks/useConfig";
import { PORTAL_URL } from "../../../../site-config/data-portal/dev/config";
import {
  Section,
  SectionHead,
  SectionOverline,
} from "../Section/section.styles";
import {
  SectionContent,
  Tile,
  TileLink,
  Tiles,
  TileText,
} from "./sectionWhatIsTheHCAPortal.styles";

export const SectionWhatIsTheHCAPortal = (): JSX.Element => {
  const {
    config: { browserURL },
  } = useConfig();
  // Opens a new window with the given URL.
  const onTileClick = (url: string, target = ANCHOR_TARGET.SELF): void => {
    window.open(url, target);
  };
  return (
    <Section>
      <SectionContent>
        <SectionOverline>What is the HCA Data Portal?</SectionOverline>
        <SectionHead>
          The HCA Data Portal stores and provides single-cell data contributed
          by labs around the world. Anyone can contribute data, find data, or
          access community tools and applications.
        </SectionHead>
        <Tiles>
          <Tile onClick={(): void => onTileClick(`${PORTAL_URL}/contribute`)}>
            <StaticImage
              alt="labs-contribute"
              src={"/bio-networks/home/labs-contribute.svg"}
            />
            <TileText>Labs contribute single-cell data</TileText>
            <TileLink>Learn About Contributing</TileLink>
          </Tile>
          <Tile onClick={(): void => onTileClick(`${PORTAL_URL}/pipelines`)}>
            <StaticImage
              alt="pipeline-processing"
              src="/bio-networks/home/pipeline-processing.svg"
            />
            <TileText>
              We process and quality-check the data with our pipelines
            </TileText>
            <TileLink>Learn About Pipelines</TileLink>
          </Tile>
          <Tile
            onClick={(): void => onTileClick(browserURL, ANCHOR_TARGET.BLANK)}
          >
            <StaticImage
              alt="search-data"
              src="/bio-networks/home/search-data.svg"
            />
            <TileText>
              Anyone can find data to download or use for analysis
            </TileText>
            <TileLink>Start Searching</TileLink>
          </Tile>
          <Tile onClick={(): void => onTileClick(`${PORTAL_URL}/analyze`)}>
            <StaticImage
              alt="search-community"
              src="/bio-networks/home/search-community.svg"
            />
            <TileText>Find community analysis tools and applications</TileText>
            <TileLink>Explore Applications</TileLink>
          </Tile>
        </Tiles>
      </SectionContent>
    </Section>
  );
};
