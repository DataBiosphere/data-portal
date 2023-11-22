import { fetchEntitiesFromQuery } from "@clevercanary/data-explorer-ui/lib/entity/api/service";
import { filterSpecimenOrgan } from "apis/azul/hca-dcp/common/filters";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Network, NetworkParam } from "../@types/network";
import { config } from "../config/config";
import { NETWORKS } from "../constants/networks";
import { processNetwork } from "./network";

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
  const projectsResponses = [];

  if (network.datasetQueryOrgans.length > 0) {
    const result = await fetchEntitiesFromQuery(
      `${url}/projects`,
      filterSpecimenOrgan(network.datasetQueryOrgans),
      undefined,
      undefined
    );
    projectsResponses.push(...result.hits);
  }

  const cxgResponse = await fetch(
    "https://api.cellxgene.cziscience.com/dp/v1/datasets/index"
  );
  const cxgDatasets = await cxgResponse.json();

  return {
    props: {
      network: processNetwork(network, cxgDatasets),
      projectsResponses,
    },
  };
};
