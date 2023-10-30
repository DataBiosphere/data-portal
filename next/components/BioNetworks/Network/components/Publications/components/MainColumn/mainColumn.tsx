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
        BICCNPublications.map((publication) => {
          return (
            <Card key={publication.doi} component={FluidPaper}>
              <GridSection>
                <CardActionArea cardUrl={`https://doi.org/${publication.doi}`}>
                  <CardSection>
                    <CardContent>
                      <CardTitle>{publication.title}</CardTitle>
                      <CardSecondaryTitle>
                        {publication.authors.join(", ")}. ({publication.year}).{" "}
                        {publication.title}. {publication.journal}. DOI:{" "}
                        {publication.doi}
                      </CardSecondaryTitle>
                    </CardContent>
                  </CardSection>
                </CardActionArea>
                <CardSideArea>
                  <CardSection>
                    <PublicationDetails>
                      {publication.catalog && (
                        <PublicationDetail
                          label={"Catalog"}
                          links={publication.catalog}
                          nTagLabel={"projects"}
                        />
                      )}
                      {publication.data && (
                        <PublicationDetail
                          label={"Data"}
                          links={publication.data}
                          nTagLabel={"sources"}
                        />
                      )}
                      {publication.portal && (
                        <PublicationDetail
                          label={"Portal"}
                          links={publication.portal}
                          nTagLabel={"portals"}
                        />
                      )}
                      {publication.code && (
                        <PublicationDetail
                          label={"Code"}
                          links={publication.code}
                          nTagLabel={"repositories"}
                        />
                      )}
                      {publication.tools && (
                        <PublicationDetail
                          label={"Tools"}
                          links={publication.tools}
                          nTagLabel={"tools"}
                        />
                      )}
                      {publication.protocols && (
                        <PublicationDetail
                          label={"Protocols"}
                          links={publication.protocols}
                          nTagLabel={"protocols"}
                        />
                      )}
                    </PublicationDetails>
                  </CardSection>
                </CardSideArea>
              </GridSection>
            </Card>
          );
        })}
    </BackPageContentSingleColumn>
  );
};
