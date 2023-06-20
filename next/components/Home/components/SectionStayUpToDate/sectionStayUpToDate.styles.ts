import styled from "@emotion/styled";
import { Section } from "../Section/section.styles";

export const SectionStayUpToDate = styled(Section)`
  background: url("/bio-networks/home/stay-up-to-date.png") no-repeat;
  background-position-x: center;
  background-size: cover;
  color: ${({ theme }) => theme.palette.common.white};
`;

export const SectionContent = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 1232px;
  padding: 80px 16px;
`;

export const CTAs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
