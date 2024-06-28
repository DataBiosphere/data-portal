import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ParsedUrlQuery } from "querystring";
import remarkGfm from "remark-gfm";
import { Frontmatter } from "../docs/common/frontmatter";
import {
  filterOutline,
  getNavigationConfig,
  parseMDXFrontmatter,
} from "../docs/common/utils";
import { rehypeSlug } from "../plugins/rehypeSlug";
import { remarkHeadings } from "../plugins/remarkHeadings";

interface PageUrlParams extends ParsedUrlQuery {
  slug: string[];
}

export interface PageProps {
  layoutStyle: LayoutStyle | null;
  mdxSource: MDXRemoteSerializeResult;
  navigation: NavItem[] | null;
  outline: OutlineItem[];
  pageTitle: string | null;
}

export async function getDocsStaticProps(
  context: GetStaticPropsContext,
  dir: string
): Promise<GetStaticPropsResult<PageProps>> {
  const { slug } = context.params as PageUrlParams;
  const { content, data } = parseMDXFrontmatter(dir, slug);
  const frontmatter = data as Frontmatter;
  if (frontmatter.hidden) {
    return {
      notFound: true,
    };
  }
  const navigationConfig = getNavigationConfig(slug);
  const outline: OutlineItem[] = [];
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [[remarkHeadings, outline], remarkGfm],
    },
    scope: {},
  });
  return {
    props: {
      layoutStyle: navigationConfig?.layoutStyle ?? null,
      mdxSource,
      navigation: navigationConfig?.navigation ?? null,
      outline: outline.filter(filterOutline),
      pageTitle: frontmatter.title ?? null,
    },
  };
}
