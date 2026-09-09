import { OpenInNewIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/OpenInNewIcon/openInNewIcon";
import styled from "@emotion/styled";

/**
 * External-link affordance for the citation line. Inline so it flows with the
 * citation text and shares its colour via `currentColor`, and vertically
 * centred against the smaller secondary line without adding to its height.
 */
export const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  margin-left: 4px;
  vertical-align: middle;
`;
