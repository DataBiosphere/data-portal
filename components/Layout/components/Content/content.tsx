import { useLayoutState } from "@databiosphere/findable-ui/lib/hooks/useLayoutState";
import { ReactNode } from "react";
import { Content as MDXContent } from "./content.styles";

export interface ContentProps {
  children: ReactNode | ReactNode[];
}

export const Content = ({ children }: ContentProps): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  return <MDXContent headerHeight={headerHeight}>{children}</MDXContent>;
};
