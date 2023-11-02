import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, Link: Link };
}
