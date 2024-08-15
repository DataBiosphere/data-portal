import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { Heading, PhrasingContent } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { generateUniqueId, slugifyHeading } from "./common/utils";

/**
 * Remark plugin to generate an outline from MDX content.
 * The outline is a list of headings with their depth, hash, and value.
 * @param outline - Outline items.
 * @returns plugin to generate an outline from MDX content.
 */
export function remarkHeadings(outline: OutlineItem[]): Plugin {
  return (tree) => {
    const setOfIds = new Set<string>();
    visit(tree, "heading", (node) => {
      const heading = node as Heading;
      const { children, depth } = heading;
      const value = getHeadingTextValue(children);
      const headingSlug = slugifyHeading(value);
      const hash = generateUniqueId(setOfIds, headingSlug);
      outline.push({
        depth,
        hash,
        value,
      });
    });
  };
}

/**
 * Returns the value of the heading.
 * @param children - Phrasing content.
 * @param value - List of heading text values.
 * @returns heading text value.
 */
export function getHeadingTextValue(
  children: PhrasingContent[],
  value: string[] = []
): string {
  for (const child of children) {
    if ("value" in child) {
      value.push(child.value);
    }
    if ("children" in child) {
      getHeadingTextValue(child.children, value);
    }
  }
  return value.join("");
}
