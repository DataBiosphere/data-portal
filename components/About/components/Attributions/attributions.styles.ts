import { Grid as DXGrid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import styled from "@emotion/styled";

export const Grid = styled(DXGrid)`
  align-items: center;
  gap: 8px;
  grid-template-columns: auto 1fr;

  figure {
    margin: 0;

    img {
      border: none;
      margin: 0;
    }
  }
`;
