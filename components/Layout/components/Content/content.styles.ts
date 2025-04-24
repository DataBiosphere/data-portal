import {
  textBodyLarge4002Lines,
  textHeading,
  textHeadingLarge,
  textHeadingSmall,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { ThemeProps } from "@databiosphere/findable-ui/lib/theme/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { textHeadingXSmall } from "../../../../styles/mixins/fonts";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

interface Props {
  headerHeight: number;
}

const code = css`
  li code,
  p code,
  td code {
    background-color: ${PALETTE.SMOKE_LIGHT};
    font-size: inherit;
  }
`;

const codeBlock = css`
  pre {
    background-color: ${PALETTE.SMOKE_LIGHT};
    padding: 4px;
    margin: 16px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const footnotes = css`
  section[data-footnotes] {
    border-top: 1px solid ${PALETTE.SMOKE_MAIN};
    margin-top: 24px;
    padding-top: 16px;

    h2[id="footnotes"] {
      display: none;
    }
  }
`;

const image = css`
  img {
    border: 1px solid ${PALETTE.SMOKE_MAIN};
    border-radius: 6px;
    margin: 16px 0;
    max-width: 100%;
  }
`;

const muiAlert = (props: ThemeProps) => css`
  .MuiAlert-root {
    margin: 24px 0;
    padding: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    .MuiAlert-icon {
      padding: 4px 0;
    }

    .MuiAlert-message {
      ${textBodyLarge4002Lines(props)};
      gap: 16px;

      .MuiAlertTitle-root {
        ${textHeadingSmall(props)};
      }

      ol > li,
      ul > li {
        margin: 8px 0;

        &:first-of-type {
          margin-top: 0;
        }

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const muiButtonContainedPrimary = css`
  .MuiButton-containedPrimary {
    display: flex;
    margin: 16px 0;
    width: fit-content;
  }
`;

export const Content = styled.div<Props>`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:hover {
      a {
        opacity: 1;
      }
    }
  }

  h1 {
    ${textHeadingLarge};
    margin: 0 0 8px;
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 24}px;
  }

  h2 {
    ${textHeading};
    margin: 32px 0 16px;
  }

  h3 {
    ${textHeadingXSmall};
    margin: 32px 0 16px;
  }

  h4 {
    margin: 16px 0;
  }

  h2,
  h3 {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 32}px;
  }

  h4 {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 16}px;
  }

  sup a {
    scroll-margin-top: ${({ headerHeight }) => headerHeight + 48}px;
  }

  h1 + ol,
  h1 + p,
  h1 + ul {
    margin-top: 16px;
  }

  ol + p,
  ul + p {
    margin-top: 16px;
  }

  ol ol {
    list-style-type: lower-roman;
  }

  > p {
    &:last-child {
      img {
        margin-bottom: 0;
      }
    }
  }

  hr {
    border: 0.5px solid ${PALETTE.SMOKE_MAIN};
    margin: 32px 0;
  }

  ${code};
  ${codeBlock};
  ${footnotes};
  ${image};
  ${muiAlert};
  ${muiButtonContainedPrimary};
`;
