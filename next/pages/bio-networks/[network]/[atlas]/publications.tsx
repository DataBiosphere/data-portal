import { AtlasProvider } from "contexts/atlasContext";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { AtlasDetailPublications } from "views/AtlasDetailView/AtlasDetailPublications/atlasDetailPublications";
import { AtlasContext } from "../../../../@types/network";
import * as atlasPages from "../../../../utils/atlasPages";

export const getStaticPaths: GetStaticPaths = atlasPages.getStaticPaths;

export const getStaticProps: GetStaticProps<AtlasContext> =
  atlasPages.getStaticProps;

const Page = ({
  atlas,
  network,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <AtlasProvider value={{ atlas, network }}>
      <AtlasDetailPublications />
    </AtlasProvider>
  );
};

export default Page;
