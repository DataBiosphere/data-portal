import { CardProps } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import {
  CardContent,
  CardSection,
} from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { CardActionArea } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardActionArea/cardActionArea";
import { CardText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { RoundedCard } from "@databiosphere/findable-ui/lib/components/common/Card/components/RoundedCard/roundedCard";
import { NoResults } from "@databiosphere/findable-ui/lib/components/NoResults/noResults";
import { Typography as MTypography } from "@mui/material";
import { ResultsView } from "./results.styles";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

interface ResultsProps {
  results?: CardProps[];
}

export const Results = ({ results }: ResultsProps): JSX.Element => {
  if (!results)
    return <NoResults Paper={RoundedPaper} title="No results found." />;
  return (
    <ResultsView>
      {results.map(({ cardUrl, secondaryTitle, text, title }, i) => (
        <RoundedCard key={i}>
          <CardActionArea cardUrl={cardUrl}>
            <CardSection>
              <CardContent>
                <MTypography
                  color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
                  variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
                >
                  {secondaryTitle}
                </MTypography>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
              </CardContent>
            </CardSection>
          </CardActionArea>
        </RoundedCard>
      ))}
    </ResultsView>
  );
};
