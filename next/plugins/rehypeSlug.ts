import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { generateUniqueId, slugifyHeading } from "./common/utils";
import { getHeadingTextValue } from "./remarkHeadings";

/**
 * Rehype plugin to generate an ID for each heading in MDX content.
 * @returns plugin to generate an ID for each heading in MDX content.
 */
export function rehypeSlug(): Plugin {
  return (tree) => {
    const setOfIds = new Set<string>();
    visit(tree, "element", (node) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const headingText = getHeadingTextValue(node.children);
        const headingSlug = slugifyHeading(headingText);
        const id = generateUniqueId(setOfIds, headingSlug);
        // Add the ID to the heading element.
        node.properties.id = id;
        node.properties.style = "position: relative;";
        // Append AnchorLink to the heading element.
        node.children.push({
          attributes: [
            {
              name: "anchorLink",
              type: "mdxJsxAttribute",
              value: id,
            },
          ],
          name: "AnchorLink",
          type: "mdxJsxFlowElement",
        });
      }
    });
  };
}
