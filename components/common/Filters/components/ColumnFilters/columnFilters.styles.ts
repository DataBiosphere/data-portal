import { Button } from "@databiosphere/findable-ui/lib/components/Filter/components/surfaces/drawer/components/Button/button";
import { bpDown1024 } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { ButtonGroup } from "@mui/material";

export const StyledButtonGroup = styled(ButtonGroup)`
  align-self: flex-start;

  ${bpDown1024} {
    display: none;
  }
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
  display: none;
  margin-right: 16px;

  ${bpDown1024} {
    display: inline-flex;
  }
`;
