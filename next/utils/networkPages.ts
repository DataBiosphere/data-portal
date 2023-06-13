import { NetworkParam } from "../@types/network";
import { NETWORKS } from "../constants/networks";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: NETWORKS.map((network) => ({ params: { network: network.path } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<NetworkParam> = async (
    context: GetStaticPropsContext
) => {
    const { network: networkParam } = context.params ?? {};

    const network = NETWORKS.find(({ path }) => path === networkParam)!;

    return { props: { network } };
};