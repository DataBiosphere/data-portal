import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { Atlas, AtlasContext, Network } from "../@types/network";
import { NETWORKS } from "../constants/networks";

interface AtlasPageParam extends ParsedUrlQuery {
  atlas: string;
  network: string;
}

export const getStaticPaths: GetStaticPaths<AtlasPageParam> = async () => {
  const paths: Array<{ params: AtlasPageParam }> = [];

  NETWORKS.forEach((network) => {
    network.atlases.forEach((atlas) => {
      paths.push({ params: { atlas: atlas.path, network: network.path } });
    });
  });

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<AtlasContext> = async (
  context: GetStaticPropsContext
) => {
  const { atlas: atlasParam, network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;
  const atlas = network.atlases.find(
    ({ path }) => path === atlasParam
  ) as Atlas;

  return { props: { atlas, network } };
};
