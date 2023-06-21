import { textBodyLarge400 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import {
  alpha32,
  alpha64,
} from "@clevercanary/data-explorer-ui/lib/theme/common/palette";
import styled from "@emotion/styled";

export const SectionHero = styled.section`
  background: url("/bio-networks/home/cell.png") no-repeat;
  background-position-x: center;
  background-size: cover;
  color: ${({ theme }) => theme.palette.common.white};
  width: 100%;
`;

export const Headline = styled.div`
  display: grid;
  justify-content: center;
  margin: 72px 0;
  padding: 0 16px;
`;

export const Head = styled.h1`
  font-family: "din-2014", sans-serif;
  font-size: 48px;
  font-weight: 400; // TODO: Update to 600 when font is available.
  letter-spacing: -0.4px;
  line-height: 56px;
  margin: 0;
  text-align: center;

  span {
    display: block;
  }
`;

export const Subhead = styled.h2`
  ${textBodyLarge400};
  margin: 8px 0 32px;
  text-align: center;
`;

export const CTAs = styled.div`
  display: flex;
  gap: 16px;
  justify-self: center;

  & .MuiButton-outlinedSecondary {
    color: ${({ theme }) => theme.palette.common.white};
    box-shadow: ${({ theme }) =>
      `inset 0 0 0 1px ${theme.palette.common.white}${alpha32}`};

    :hover {
      box-shadow: ${({ theme }) =>
        `inset 0 0 0 1px ${theme.palette.common.white}${alpha64}`};
    }
  }
`;
