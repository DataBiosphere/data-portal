import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { APP } from "@databiosphere/findable-ui/lib/styles/common/constants/app";

export const SectionContent = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1232px;
  padding: 56px 16px 80px;
`;

export const BioNetworkAtlases = styled.div`
  display: grid;
  gap: 12px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  margin-top: 40px;

  ${bpUpSm} {
    gap: 16px;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
`;

export const BioNetworkAtlas = styled.span`
  align-items: center;
  border: 1px solid ${PALETTE.SMOKE_MAIN};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  gap: 0 8px;
  height: 64px;
  padding: 8px;

  &:hover {
    background-color: ${PALETTE.SMOKE_LIGHT};
    border: 1px solid ${PALETTE.SMOKE_DARK};
  }

  img {
    box-sizing: content-box;
    flex: none;
    margin: 0;
    padding: 6px;
  }

  .MuiTypography-body-large-500 {
    color: ${PALETTE.INK_MAIN};
    flex: 1;
    font-family: ${APP.FONT_FAMILY};
    font-size: 16px;
    font-weight: 500;
  }
`;

export const Badge = styled.div`
  align-items: center;
  background-color: ${PALETTE.PRIMARY_MAIN};
  border-radius: 10px;
  color: ${PALETTE.COMMON_WHITE};
  display: flex;
  flex: none;
  font-size: 11px;
  font-weight: 700;
  justify-content: center;
  line-height: 20px;
  min-width: 20px;
  padding: 0 6px;
`;
