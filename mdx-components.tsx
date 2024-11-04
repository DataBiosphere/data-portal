import { MDXComponents } from "mdx/types";
import * as C from "./components/index";
import { Link } from "./components/Layout/components/Content/components/Link/link";
import { StyledTable } from "./components/Layout/components/Content/components/Table/table.styles";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Link: C.Link, StyledTable, a: Link };
}
