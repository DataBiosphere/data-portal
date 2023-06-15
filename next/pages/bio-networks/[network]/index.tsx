import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NetworkParam } from "../../../@types/network";
import { NetworkProvider } from "../../../contexts/networkContext";
import * as networkPages from "../../../utils/networkPages";
import { NetworkDetailOverview } from "../../../views/NetworkDetailView/NetworkDetailOverview/networkDetailOverview";

export const getStaticPaths: GetStaticPaths = networkPages.getStaticPaths;

export const getStaticProps: GetStaticProps<NetworkParam> =
  networkPages.getStaticProps;

export const Page = ({
  network,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkProvider value={network}>
      <NetworkDetailOverview />
    </NetworkProvider>
  );
};

export default Page;
