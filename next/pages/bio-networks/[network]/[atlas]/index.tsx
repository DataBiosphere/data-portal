import { AtlasProvider } from "contexts/atlasContext";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { AtlasContext } from "../../../../@types/network";
import * as atlasPages from "../../../../utils/atlasPages";
import { AtlasDetailOverview } from "../../../../views/AtlasDetailView/AtlasDetailOverview/atlasDetailOverview";

export const getStaticPaths: GetStaticPaths = atlasPages.getStaticPaths;

export const getStaticProps: GetStaticProps<AtlasContext> =
  atlasPages.getStaticProps;

const Page = ({
  network,
  atlas,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <AtlasProvider value={{ network, atlas }}>
      <AtlasDetailOverview />
    </AtlasProvider>
  );
};

export default Page;
