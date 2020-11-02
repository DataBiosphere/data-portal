/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic content template service.
 */

/**
 * Returns the h1 value for the page.
 *
 * @param headings
 * @returns {string}
 */
export function getPageH1(headings) {

	if ( headings ) {

		const pageTitle = headings.find(heading => heading.depth === 1);

		if ( pageTitle ) {

			return pageTitle.value;
		}
	}
}

/**
 * Returns github content url, for the specified path.
 *
 * @param slug
 * @returns {string}
 */
export function getPageEditUrl(slug) {

	return `https://github.com/HumanCellAtlas/data-portal/tree/staging/content${slug}.md`;
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

    switch(slug) {
        case "/metadata/design-principles/rationale":
            return false;
        case "/metadata/design-principles/structure":
            return false;
        case "/metadata/explore/metadata-explore":
            return false;
        case "/metadata/search/metadata-search":
            return false;
        case "/status/status/system-status":
            return false;
        default:
            return true;
    }
}
