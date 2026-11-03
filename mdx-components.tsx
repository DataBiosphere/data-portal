import { MDX_COMPONENTS } from "@/docs/common/constants";
import { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const { a, Link, StyledTable } = MDX_COMPONENTS;
  return { ...components, Link, StyledTable, a };
}
