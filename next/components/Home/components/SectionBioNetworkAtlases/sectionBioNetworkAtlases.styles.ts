import styled from "@emotion/styled";

export const SectionContent = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1232px;
  padding: 56px 16px 88px;
`;

export const BioNetworkAtlases = styled.div`
  display: grid;
  gap: 0 16px;
  grid-auto-flow: column;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  margin-top: 32px;
`;

export const BioNetworkAtlas = styled.span`
  align-items: center;
  display: flex;
  gap: 0 8px;
  padding: 20px 0;

  img {
    flex: none;
    margin: 0;
  }

  .MuiTypography-text-body-large-500 {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    font-weight: 500;
  }
`;
