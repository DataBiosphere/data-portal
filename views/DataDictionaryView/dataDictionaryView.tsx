import { StyledDataDictionaryView } from "./dataDictionaryView.styles";
import { DataDictionaryViewProps } from "@databiosphere/findable-ui/lib/views/DataDictionaryView/types";

export const DataDictionaryView = (
  props: DataDictionaryViewProps
): JSX.Element => {
  return <StyledDataDictionaryView {...props} />;
};
