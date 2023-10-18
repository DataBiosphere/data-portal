import {
  mediaDesktopSmallUp,
  mediaTabletUp,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { textBodyLarge400 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const SectionContent = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1232px;
  padding: 80px 16px 108px;
`;

export const Tiles = styled.div`
  display: grid;
  gap: 16px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-content: center;
  margin: 80px 0;
  text-align: center;

  ${mediaTabletUp} {
    grid-template-columns: repeat(2, 1fr);
    margin: 56px 0;
  }

  ${mediaDesktopSmallUp} {
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Tile = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`;

export const TileText = styled.p`
  ${textBodyLarge400};
  margin: 0;

  ${mediaTabletUp} {
    max-width: 264px;
  }
`;

export const TileLink = styled.p`
  ${textBodyLarge400}; /* specified as text-body-large-500, without the HCA specific override. */
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 500;
  margin: 0;
`;
