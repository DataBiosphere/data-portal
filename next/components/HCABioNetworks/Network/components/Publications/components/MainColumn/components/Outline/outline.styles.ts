import {
  mediaTabletDown,
  mediaTabletUp,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import {
  inkLight,
  smokeMain,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import {
  textBody400,
  textBody500,
  textUppercase500,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { primaryMain } from "@databiosphere/findable-ui/lib/theme/common/palette";
import { css } from "@emotion/react";
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

  ${mediaTabletUp} {
    box-shadow: inset 1px 0 ${smokeMain};
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
  ${textUppercase500};
  ${tab};
  padding: 8px 0;
  pointer-events: none;

  &.Mui-selected {
    color: ${inkLight};
  }

  ${mediaTabletUp} {
    padding: 8px 24px;
  }
`;

export const Tab = styled(MTab)`
  && {
    ${textBody500};
    ${tab};
    padding: 6px 0;

    ${mediaTabletDown} {
      ${textBody400};
      color: ${primaryMain};

      &:hover {
        text-decoration: underline;
      }
    }

    ${mediaTabletUp} {
      padding: 6px 24px;
    }
  }
` as typeof MTab;
