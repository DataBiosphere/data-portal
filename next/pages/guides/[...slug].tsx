import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import {
  Nav,
  NavItem,
} from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import {
  Outline,
  OutlineItem,
} from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote } from "next-mdx-remote";
import { Content, ContentView } from "../../components";
import { MDX_COMPONENTS } from "../../docs/common/constants";
import { generatePaths } from "../../docs/common/utils";
import { getDocsStaticProps, PageProps } from "../../utils/docPages";

const GUIDES_DIR = "guides";

const Page = ({
  layoutStyle,
  mdxSource,
  navigation,
  outline,
}: PageProps): JSX.Element => {
  return (
    <ContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </Content>
      }
      layoutStyle={layoutStyle ?? undefined}
      navigation={renderNavigation(navigation)}
      outline={renderOutline(outline)}
    />
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return getDocsStaticProps(context, GUIDES_DIR);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = generatePaths(GUIDES_DIR);
  return {
    fallback: false,
    paths,
  };
};

export default Page;

Page.Main = Main;

/**
 * Renders page navigation.
 * @param navigation - Navigation items.
 * @returns navigation.
 */
function renderNavigation(
  navigation: NavItem[] | null
): JSX.Element | undefined {
  return navigation ? <Nav navigation={navigation} /> : undefined;
}

/**
 * Renders page outline.
 * @param outline - Outline items.
 * @returns outline.
 */
function renderOutline(outline: OutlineItem[]): JSX.Element | undefined {
  return outline.length > 0 ? (
    <Outline outline={outline} Contents={ContentsTab} />
  ) : undefined;
}
