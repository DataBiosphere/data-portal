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
import { TEXT_BODY_SMALL_400 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography as MTypography } from "@mui/material";
import { ResultsView } from "./results.styles";

interface ResultsProps {
  results?: CardProps[];
}

export const Results = ({ results }: ResultsProps): JSX.Element => {
  if (!results) return <NoResults title="No results found." />;
  return (
    <ResultsView>
      {results.map(({ cardUrl, secondaryTitle, text, title }, i) => (
        <RoundedCard key={i}>
          <CardActionArea cardUrl={cardUrl}>
            <CardSection>
              <CardContent>
                <MTypography color="ink.light" variant={TEXT_BODY_SMALL_400}>
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
