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
 * Returns true if the edit page should be featured.
 *
 * @param slug
 * @returns {boolean}
 */
export function editPageFeatured(slug) {

    const metadataDesignPrinciples = slug && slug.includes("metadata/design-principles/");

    return !metadataDesignPrinciples;
}
