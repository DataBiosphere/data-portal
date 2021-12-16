/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic content template service.
 */

/**
 * Returns the page title for the specified page, generated from the first h1 on the page.
 *
 * TODO Combine with TOCService.buildTOCsMarkdown, possibly through a headings service?
 *
 * @param htmlAst
 * @returns {string}
 */
export function getPageTitle(htmlAst) {
  if (!htmlAst) {
    return "";
  }

  // Find the top-level of the page
  const h1 = htmlAst.children.find((child) => child.tagName === "h1");
  if (!h1) {
    return "";
  }

  // Return text node of h1
  return h1.children.find((child) => child.type === "text").value || "";
}

/**
 * Returns github content url, for the specified path.
 *
 * @param slug
 * @returns {string}
 */
export function getPageEditUrl(slug) {
  return `https://github.com/HumanCellAtlas/data-portal/tree/main/content${slug}.md`;
}

/**
 * Returns false when the slug matches case.
 * A true value will show the "edit page" feature.
 * A false value will hide the "edit page" feature.
 *
 * @param slug
 * @returns {boolean}
 */
export function showEditPage(slug) {
  switch (slug) {
    case "/metadata/design-principles/rationale":
      return false;
    case "/metadata/design-principles/structure":
      return false;
    case "/metadata/explore/metadata-explore":
      return false;
    case "/metadata/search/metadata-search":
      return false;
    case "/search/search":
      return false;
    default:
      return true;
  }
}
