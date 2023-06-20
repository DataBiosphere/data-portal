import { fetchEntitiesFromQuery } from "@clevercanary/data-explorer-ui/lib/entity/api/service";
import { filterSpecimenOrgan } from "apis/azul/hca-dcp/common/filters";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Network, NetworkParam } from "../@types/network";
import { NETWORKS } from "../constants/networks";
import { config } from "./../config/config";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: NETWORKS.map((network) => ({ params: { network: network.path } })),
  };
};

export const getStaticProps: GetStaticProps<NetworkParam> = async (
  context: GetStaticPropsContext
) => {
  const {
    dataSource: { url },
  } = config();
  const { network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;
  const datasets = [];

  if (network.datasetQueryOrgans.length > 0) {
    const result = await fetchEntitiesFromQuery(
      `${url}/projects`,
      filterSpecimenOrgan(network.datasetQueryOrgans),
      undefined
    );
    datasets.push(...result.hits);
  }

  return { props: { datasets, network } };
};
