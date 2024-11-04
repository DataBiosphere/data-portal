import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  hasBorder?: boolean;
}

export const Figure = styled.figure<Props>`
  margin: 16px 0;

  img {
    margin: 0 auto;
  }

  figcaption {
    ${textBody400};
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
