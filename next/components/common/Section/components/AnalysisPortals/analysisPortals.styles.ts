import { Stack } from "@clevercanary/data-explorer-ui/lib/components/common/Stack/stack";
import { textBody400 } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const KeyValueElType = styled(Stack)`
  ${textBody400};
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;
