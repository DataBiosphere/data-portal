import { CardSection as Section } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { CardSecondaryTitle as DXCardSecondaryTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryTitle/cardSecondaryTitle";
import { GridPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Card as MCard } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const Card = styled(MCard)`
  && .MuiCardActionArea-root {
    align-items: stretch;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    display: grid;
  }
` as typeof MCard;

export const GridSection = styled(GridPaper)`
  grid-auto-flow: row;
  grid-template-columns: 1fr;

  ${mediaTabletUp} {
    grid-template-columns: 1fr 320px;
  }
`;

export const CardSection = styled(Section)`
  background-color: ${PALETTE.COMMON_WHITE};
`;

export const CardSideArea = styled.div`
  && {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-top-right-radius: inherit;
    display: grid;
  }
`;

export const PublicationDetails = styled.div`
  ${textBody400};
  align-content: flex-start;
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: 84px 1fr;
`;

export const CardSecondaryTitle = styled(DXCardSecondaryTitle)`
  margin-top: 0;
`;
