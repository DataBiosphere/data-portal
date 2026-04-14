import { Detail } from "@databiosphere/findable-ui/lib/components/Detail/detail";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { JSX } from "react";
import type {
  Atlas,
  Network,
  TrackerSourceStudy,
} from "../../../../../@types/network";
import {
  fetchTrackerSourceStudies,
  resolveTrackerAtlasId,
} from "../../../../../apis/tracker/api";
import { Hero } from "../../../../../components/HCABioNetworks/Network/Atlas/components/common/Hero/hero";
import { Tabs } from "../../../../../components/HCABioNetworks/Network/Atlas/components/common/Tabs/tabs";
import { MainColumn } from "../../../../../components/HCABioNetworks/Network/Atlas/components/SourceStudies/components/MainColumn/mainColumn";
import { NETWORKS } from "../../../../../constants/networks";
import { AtlasProvider } from "../../../../../contexts/atlasContext";

interface Params extends ParsedUrlQuery {
  atlas: string;
  network: string;
}

interface Props {
  atlas: Atlas;
  network: Network;
  pageTitle: string;
  trackerSourceStudies: TrackerSourceStudy[];
}

/**
 * Only generate paths for tracker-sourced atlases.
 * @returns static paths for tracker atlases.
 */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths: Array<{ params: Params }> = [];
  NETWORKS.forEach((network) => {
    network.atlases.forEach((atlas) => {
      if (atlas.tracker) {
        paths.push({ params: { atlas: atlas.path, network: network.path } });
      }
    });
  });
  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> => {
  const { atlas: atlasParam, network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;
  const atlas = network.atlases.find(
    ({ path }) => path === atlasParam
  ) as Atlas;
  const { tracker } = atlas;

  if (!tracker) return { notFound: true };

  const atlasId = await resolveTrackerAtlasId(
    tracker.shortNameSlug,
    tracker.version
  );

  const trackerSourceStudies = await fetchTrackerSourceStudies(atlasId);

  return {
    props: {
      atlas: { ...atlas, trackerAtlasId: atlasId },
      network,
      pageTitle: `${atlas.name} - Source Studies`,
      trackerSourceStudies,
    },
  };
};

const Page = ({
  atlas,
  network,
  trackerSourceStudies,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <AtlasProvider
      value={{
        atlas,
        network,
        projectsResponses: [],
        trackerSourceStudies,
      }}
    >
      <Detail mainColumn={<MainColumn />} Tabs={<Tabs />} top={<Hero />} />
    </AtlasProvider>
  );
};

export default Page;
