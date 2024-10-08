import { fetchEntitiesFromQuery } from "@databiosphere/findable-ui/lib/entity/api/service";
import { filterSpecimenOrgan } from "apis/azul/hca-dcp/common/filters";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Network, NetworkParam } from "../@types/network";
import { config } from "../config/config";
import { NETWORKS } from "../constants/networks";
import { fetchCXGDatasetsForAtlases, processNetwork } from "./network";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: NETWORKS.map((network) => ({ params: { network: network.path } })),
  };
};

export interface StaticProps extends NetworkParam {
  pageTitle: string;
}

export async function getContentStaticProps(
  context: GetStaticPropsContext,
  tabName: string
): Promise<GetStaticPropsResult<StaticProps>> {
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

  // Fetch CELLxGENE datasets for the network atlases.
  const cxgDatasets = await fetchCXGDatasetsForAtlases(network.atlases);
  return {
    props: {
      network: processNetwork(network, cxgDatasets),
      pageTitle: `${network.name} - ${tabName}`,
      projectsResponses,
    },
  };
}
