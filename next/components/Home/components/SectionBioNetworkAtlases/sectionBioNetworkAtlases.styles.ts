import styled from "@emotion/styled";
import { SectionContent as Content } from "../Section/section.styles";

export const SectionContent = styled(Content)`
  display: grid;
  gap: 32px;
  justify-items: stretch;
  margin: 56px 0 88px;
`;

export const BioNetworkAtlases = styled.div`
  display: grid;
  gap: 0 16px;
  grid-auto-flow: column;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  justify-self: center;
  max-width: 1232px;
  width: 100%;
`;

export const BioNetworkAtlas = styled.span`
  align-items: center;
  display: flex;
  gap: 0 8px;
  padding: 14px 0;

  img {
    flex: none;
    height: 48px;
    margin: 0;
  }

  .MuiTypography-text-body-large-500 {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    font-weight: 500;
  }
`;
