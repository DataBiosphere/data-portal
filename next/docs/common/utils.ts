import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPathsResult } from "next/types";
import pathTool, * as path from "path";
import {
  NavigationNode,
  NAVIGATION_KEY,
  SlugByFilePaths,
} from "../../site-config/data-portal/dev/navigation/entities";
import { navigation as navigationConfig } from "../../site-config/data-portal/dev/navigation/navigation";

/**
 * Filters out headings (H1, and H3-H6) from the outline.
 * @param outline - Outline item.
 * @returns true if the heading depth is 2 or 3.
 */
export function filterOutline(outline: OutlineItem): boolean {
  return outline.depth > 1 && outline.depth < 4;
}

/**
 * Returns the path to the directory.
 * @param dir - Directory.
 * @returns path to the directory.
 */
export function getDocsDirectory(dir: string): string {
  return pathTool.join(process.cwd(), dir);
}

/**
 * Returns the active URL for the given page path.
 * @param pagePath - Page path.
 * @param navigation - Navigation.
 * @returns the active URL for the given page path and navigation.
 */
function getActiveURL(pagePath: string, navigation?: NavItem[]): string {
  // Find all URLs with either an exact or partial match.
  // Sort the matches; to facilitate finding of an exact match before a partial match.
  // For example, /consortia/cser/news/2020/08/01 may be a partial match for /consortia/cser and /consortia/cser/news.
  const activeURLs = navigation
    ?.map(({ url }) => url)
    .filter((url): url is string => !!url)
    .filter((url) => pagePath.startsWith(url))
    .sort(); // Sort the URLs for ease of comparison with page path.;

  // No active URLs are found.
  if (!activeURLs || activeURLs.length === 0) {
    return "";
  }

  // Returns either an exact match, or if no exact match is found, the partial match.
  return activeURLs.find((url) => pagePath === url) || activeURLs.pop() || "";
}

/**
 * Returns MDX file path for the given slug.
 * @param slug - Slug.
 * @param dir - Directory.
 * @returns MDX file path.
 */
function getMDXFilePath(slug: string[] = [], dir: string): string {
  return pathTool.join(dir, ...slug) + ".mdx";
}

/**
 * Returns the navigation items with the active flag set to true if the URL matches the active URL.
 * @param activeURL - Active URL.
 * @param navigation - Navigation.
 * @returns the navigation items with the active flag set to true if the URL matches the active URL.
 */
function getNavItems(
  activeURL: string,
  navigation?: NavItem[]
): NavItem[] | undefined {
  return navigation?.map((navItem) => {
    if (activeURL === navItem.url) {
      return { ...navItem, active: true };
    }
    return navItem;
  });
}

/**
 * Returns the navigation config for the given slug.
 * @param slug - Slug.
 * @returns the navigation config for the slug.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- TODO?
export function getNavigationConfig(
  slug?: string[]
): Omit<NavigationNode, "key" | "slugs"> | undefined {
  if (!slug) {
    return;
  }
  const sectionMap = navigationConfig[slug[0] as NAVIGATION_KEY];
  // Loop through the slug and find the node where slug matches the node's slug.
  for (let i = 0; i < slug.length; i++) {
    const key = slug[i];
    for (const { layoutStyle, navigation, slugs } of sectionMap.nodes) {
      if (slugs.includes(key)) {
        if (slug.length !== 1 && i === 0) {
          // Although the first slug's key is a match, continue if the slug has more than one element.
          continue;
        }
        const pagePath = `/${slug.join("/")}`;
        const activeURL = getActiveURL(pagePath, navigation);
        if (activeURL) {
          const navItems = getNavItems(activeURL, navigation);
          return { layoutStyle, navigation: navItems };
        }
      }
    }
  }
}

/**
 * Returns true if the file is an MDX file.
 * @param fileName - File name.
 * @returns true if the file is an MDX file.
 */
function isMdxFile(fileName: string): boolean {
  return fileName.endsWith(".mdx") || fileName.endsWith(".md"); // TODO(cc) update to use .mdx only once md is removed.
}

/**
 * Maps each MDX file path to its slug.
 * @param docsDirectory - Docs directory.
 * @param dirPath - Directory path.
 * @param slugByFilePaths - Accumulator: Map of slug by mdx file path.
 * @returns returns slug by mdx file path.
 */
export function mapSlugByFilePaths(
  docsDirectory: string,
  dirPath = docsDirectory,
  slugByFilePaths: SlugByFilePaths = new Map()
): SlugByFilePaths {
  const dirents = fs.readdirSync(dirPath, { withFileTypes: true });
  return dirents.reduce((acc, dirent) => {
    /* Accumulate the slug for each MDX file. */
    if (dirent.isFile() && isMdxFile(dirent.name)) {
      const mdxPath = path.resolve(dirPath, dirent.name);
      /* Build the slug from the file relative directory and file name. */
      const mdxRelativePath = path.relative(docsDirectory, mdxPath);
      const { dir, name } = path.parse(mdxRelativePath);
      let slug = [] as string[];
      if (dir) {
        slug = dir.split(path.sep);
      }
      slug.push(name);
      acc.set(mdxPath, slug);
    }
    /* Recurse into subdirectories. */
    if (dirent.isDirectory()) {
      mapSlugByFilePaths(
        docsDirectory,
        path.resolve(dirPath, dirent.name),
        acc
      );
    }
    return acc;
  }, slugByFilePaths);
}

/**
 * Returns the static paths for each mdx content in the "docs" directory.
 * @param dir - Directory.
 * @returns the static paths for the mdx content.
 */
export function generatePaths(dir: string): GetStaticPathsResult["paths"] {
  const slugByFilePaths = mapSlugByFilePaths(getDocsDirectory(dir));
  return [...slugByFilePaths].map(([, slug]) => {
    return {
      params: { slug },
    };
  });
}

/**
 * Returns MDX content and frontmatter from the given slug.
 * @param dir - Directory.
 * @param slug - Slug.
 * @returns MDX content and frontmatter.
 */
export function parseMDXFrontmatter(
  dir: string,
  slug: string[]
): matter.GrayMatterFile<string> {
  const markdownWithMeta = fs.readFileSync(
    getMDXFilePath(slug, getDocsDirectory(dir)),
    "utf-8"
  );
  return matter(markdownWithMeta);
}
