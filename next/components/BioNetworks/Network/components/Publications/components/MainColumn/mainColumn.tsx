import { CardContent } from "@clevercanary/data-explorer-ui/lib/components/common/Card/card.styles";
import { CardActionArea } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardActionArea/cardActionArea";
import { CardTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import React from "react";
import {
  useNetwork,
  useNetworkContent,
} from "../../../../../../../contexts/networkContext";
import { MDXSection } from "../../../../../../common/Section/section.styles";
import { PublicationDetail } from "./components/PublicationDetail/publicationDetail";
import {
  Card,
  CardSecondaryTitle,
  CardSection,
  CardSideArea,
  GridSection,
  PublicationDetails,
} from "./mainColumn.styles";

const TITLE =
  "Transcriptomic diversity of cell types across the adult human brain"; // TODO placeholder only.
const SUB_TITLE =
  "Kimberly Siletti, Rebecca Hodge, Alejandro Mossi Albiach, Ka Wai Lee, Song-Lin Ding, Lijuan Hu, Peter Lönnerberg, Trygve Bakken, Tamara Casper, Michael Clark, Nick Dee, Jessica Gloe, C. Dirk Keene, Julie Nyhus, Herman Tung, Anna Marie Yanny, Ernest Arenas, Ed S. Lein, Sten Linnarsson"; // TODO placeholder only.

export const MainColumn = (): JSX.Element => {
  const { network } = useNetwork();
  const { Publication } = useNetworkContent();
  const { BICCNPublications } = network;
  return (
    <BackPageContentSingleColumn>
      {Publication && (
        <FluidPaper>
          <MDXSection>
            <Publication />
          </MDXSection>
        </FluidPaper>
      )}
      {BICCNPublications?.length &&
        BICCNPublications.map((publication) => (
          <Card key={publication.doi} component={FluidPaper}>
            <GridSection>
              <CardActionArea cardUrl={`https://doi.org/${publication.doi}`}>
                <CardSection>
                  <CardContent>
                    <CardTitle>{TITLE}</CardTitle>
                    <CardSecondaryTitle>{SUB_TITLE}</CardSecondaryTitle>
                  </CardContent>
                </CardSection>
              </CardActionArea>
              <CardSideArea>
                <CardSection>
                  <PublicationDetails>
                    <PublicationDetail
                      label={"Catalog"}
                      links={[
                        { label: "Project", url: "/" },
                        { label: "Project", url: "/" },
                      ]}
                      nTagLabel={"projects"}
                    />
                    <PublicationDetail
                      label={"Data"}
                      links={[{ label: "Nemo", url: "/" }]}
                      nTagLabel={"sources"}
                    />
                  </PublicationDetails>
                </CardSection>
              </CardSideArea>
            </GridSection>
          </Card>
        ))}
    </BackPageContentSingleColumn>
  );
};
