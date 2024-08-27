import { MDXComponents } from "mdx/types";
import { Link } from "./components/Layout/components/Content/components/Link/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Link };
}
