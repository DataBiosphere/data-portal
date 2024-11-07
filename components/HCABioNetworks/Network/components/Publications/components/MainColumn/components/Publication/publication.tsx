import { CardContent } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { CardActionArea } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardActionArea/cardActionArea";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { Markdown } from "@databiosphere/findable-ui/lib/components/common/Markdown/markdown";
import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BICCNPublication } from "../../../../../../../../../@types/network";
import { PublicationDetail } from "../PublicationDetail/publicationDetail";
import {
  Card,
  CardSecondaryTitle,
  CardSection,
  CardSideArea,
  GridSection,
  PublicationDetails,
} from "./publication.styles";

export interface PublicationProps {
  publication: BICCNPublication;
}

export const Publication = ({ publication }: PublicationProps): JSX.Element => {
  return (
    <Card key={publication.doi} component={FluidPaper}>
      <GridSection>
        <CardActionArea cardUrl={`https://doi.org/${publication.doi}`}>
          <CardSection>
            <CardContent>
              <CardTitle>
                <Markdown content={publication.title} />
              </CardTitle>
              <CardSecondaryTitle>
                <Markdown content={buildCitation(publication)} />
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
};

/**
 * Returns citation string for the given publication.
 * @param publication - BICCN Publication.
 * @returns citation string.
 */
function buildCitation(publication: BICCNPublication): string {
  return `${publication.authors.join(", ")}. (${publication.year}). ${
    publication.title
  }. ${publication.journal}. DOI: ${publication.doi}`;
}
