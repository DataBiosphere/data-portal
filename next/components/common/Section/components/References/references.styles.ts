import { GridPaperSection } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import styled from "@emotion/styled";

export const Section = styled(GridPaperSection)`
  min-width: 0;

  .MuiLink-root {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
