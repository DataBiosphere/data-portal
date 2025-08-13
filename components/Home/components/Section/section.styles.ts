import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

export const Section = styled.section`
  width: 100%;
`;

export const StyledTypography = styled(Typography)`
  font-size: 32px;
  line-height: 40px;
  margin: 0 auto;
  max-width: 816px;
  text-align: center;
` as typeof Typography;

export const SectionDivider = styled(Divider)`
  margin: 0 auto;
  max-width: 1244px;
  width: calc(100% - 32px); // minus gutter.
`;
