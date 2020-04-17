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
 * @param gitHubPath
 * @returns {string}
 */
export function getPageEditUrl(gitHubPath) {

	const pathSliced = gitHubPath.trim().slice(0, -1);
	return `https://github.com/HumanCellAtlas/data-portal/tree/staging/content${pathSliced}.md`;
}
