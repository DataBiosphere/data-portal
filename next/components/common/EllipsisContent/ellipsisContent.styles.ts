import { ButtonTextPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import styled from "@emotion/styled";

interface Props {
  isEllipsis: boolean;
  maxLineCount: number;
}

export const Content = styled("div")<Props>`
  ${({ isEllipsis, maxLineCount }) =>
    `
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: ${isEllipsis ? maxLineCount : "unset"};
    overflow: hidden;
  `}
`;

export const Button = styled(ButtonTextPrimary)`
  align-self: flex-start;
  margin-top: 8px;
`;
