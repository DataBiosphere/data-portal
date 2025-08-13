import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

interface Props {
  hasBorder?: boolean;
}

export const Figure = styled.figure<Props>`
  margin: 16px 0;

  img {
    margin: 0 auto;
  }

  figcaption {
    font: ${FONT.BODY_400};
    margin-top: 8px;
    text-align: center;
  }

  ${({ hasBorder }) =>
    !hasBorder &&
    css`
      img {
        border: none;
        border-radius: 0;
      }
    `}
`;
