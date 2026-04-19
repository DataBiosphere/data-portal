import { DataDictionaryViewProps } from "@databiosphere/findable-ui/lib/views/DataDictionaryView/types";
import { JSX } from "react";
import { StyledDataDictionaryView } from "./dataDictionaryView.styles";

export const DataDictionaryView = (
  props: DataDictionaryViewProps
): JSX.Element => {
  return <StyledDataDictionaryView {...props} />;
};
