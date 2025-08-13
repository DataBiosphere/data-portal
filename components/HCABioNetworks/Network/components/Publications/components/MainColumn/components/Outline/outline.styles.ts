import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import {
  bpDownSm,
  bpUpSm,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { css } from "@emotion/react";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import styled from "@emotion/styled";
import { Tab as MTab, Tabs as MTabs } from "@mui/material";

interface Props {
  headerHeight: number;
}

export const Tabs = styled(MTabs, {
  shouldForwardProp: (prop) => prop !== "headerHeight",
})<Props>`
  align-self: flex-start;
  box-shadow: none;
  margin: 0 16px;
  order: -1;
  padding: 8px 0;

  .MuiTabs-scroller {
    margin: 0;
  }

  .MuiTabs-flexContainer {
    gap: 0;
  }

  .MuiTabs-indicator {
    border-radius: 0 6px 6px 0;
    display: none;
    left: 0;
    width: 3px;
  }

  ${bpUpSm} {
    box-shadow: inset 1px 0 ${PALETTE.SMOKE_MAIN};
    margin: 0;
    max-width: 242px;
    order: unset;
    padding: 0;
    position: sticky;
    top: ${({ headerHeight }) => `calc(${headerHeight}px + 32px)`};

    .MuiTabs-indicator {
      display: block;
    }
  }
`;

const tab = css`
  align-items: flex-start;
  margin: 0;
  max-width: unset;
  text-align: left;

  &:hover {
    text-decoration: none;
  }
`;

export const TabTitle = styled(MTab)`
  ${tab};
  font: ${FONT.UPPERCASE_500};
  padding: 8px 0;
  pointer-events: none;
  text-transform: uppercase;

  &.Mui-selected {
    color: ${PALETTE.INK_LIGHT};
  }

  ${bpUpSm} {
    padding: 8px 24px;
  }
`;

export const Tab = styled(MTab)`
  && {
    ${tab};
    font: ${FONT.BODY_500};
    padding: 6px 0;

    ${bpDownSm} {
      color: ${PALETTE.PRIMARY_MAIN};
      font: ${FONT.BODY_400};

      &:hover {
        text-decoration: underline;
      }
    }

    ${bpUpSm} {
      padding: 6px 24px;
    }
  }
` as typeof MTab;
