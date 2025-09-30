import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { COLOR_MIXES } from "@databiosphere/findable-ui/lib/styles/common/constants/colorMixes";
import { Typography } from "@mui/material";

export const SectionHero = styled.section`
  background: url("/hca-bio-networks/home/cell.webp") no-repeat;
  background-position-x: center;
  background-size: cover;
  color: ${PALETTE.COMMON_WHITE};
  width: 100%;
`;

export const Headline = styled.div`
  display: grid;
  justify-content: center;
  margin: 56px 0 44px;
  padding: 0 16px;

  ${bpUpSm} {
    margin: 84px 0 104px;
  }
`;

export const Head = styled.h1`
  font-family: "din-2014", sans-serif;
  font-size: 40px;
  font-weight: 400; // TODO: Update to 600 when font is available.
  letter-spacing: -0.4px;
  line-height: 48px;
  margin: 0;
  text-align: center;

  span {
    display: block;
  }

  ${bpUpSm} {
    font-size: 48px;
    line-height: 56px;
  }
`;

export const Subhead = styled(Typography)`
  margin: 8px 0 24px;
  text-align: center;
` as typeof Typography;

export const CTAs = styled.div`
  display: flex;
  gap: 16px;
  justify-self: center;

  & .MuiButton-containedSecondary {
    box-shadow:
      inset 0 0 0 1px ${PALETTE.SMOKE_DARK},
      0 1px 0 0 ${PALETTE.PRIMARY_DARK};

    &:hover {
      box-shadow:
        inset 0 0 0 1px ${PALETTE.SMOKE_DARK},
        0 1px 0 0 ${PALETTE.PRIMARY_DARK};
    }

    &:active {
      box-shadow: inset 0 0 0 1px ${PALETTE.SMOKE_DARK};
    }
  }

  & .MuiButton-outlinedSecondary {
    color: ${PALETTE.COMMON_WHITE};
    box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_32};

    &:hover {
      box-shadow: inset 0 0 0 1px ${COLOR_MIXES.COMMON_WHITE_64};
    }
  }
`;
