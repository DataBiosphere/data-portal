import { ParsedUrlQuery } from "querystring";
import { AtlasContext, NetworkParam } from "../@types/network";
import { NETWORKS } from "../constants/networks";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

interface AtlasPageParam extends ParsedUrlQuery {
    network: string
    atlas: string
}

export const getStaticPaths: GetStaticPaths<AtlasPageParam> = async () => {
    const paths: Array<{ params: AtlasPageParam }> = []

    NETWORKS.forEach((network) => {
        network.atlases.forEach((atlas) => {
            paths.push({ params: { network: network.path, atlas: atlas.path } })
        })
    })

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<AtlasContext> = async (
    context: GetStaticPropsContext
) => {
    const { network: networkParam, atlas: atlasParam } = context.params ?? {};

    const network = NETWORKS.find(({ path }) => path === networkParam)!;
    const atlas = network.atlases.find(({ path }) => path === atlasParam)!;

    return { props: { network, atlas } };
};