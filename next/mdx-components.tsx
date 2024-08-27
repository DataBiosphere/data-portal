import { MDXComponents } from "mdx/types";
import * as C from "./components/index";
import { Link } from "./components/Layout/components/Content/components/Link/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Link: C.Link, a: Link };
}
