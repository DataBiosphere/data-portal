/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic "edit this page" service.
 */

/**
 * Returns the link to github for the specified markdown page.
 *
 * @param docPath
 * @param gitHubPath
 * @returns {*}
 */
export function getEditPageLink(docPath, gitHubPath) {

	if ( !docPath || !gitHubPath ) {

		return "/";
	}

	// Document path - in github - remove last "/"
	const gitHubPathSuffix = gitHubPath.trim().slice(0, -1);

	// GitHub href
	const portalHref = 'https://github.com/HumanCellAtlas/data-portal/tree/staging/content';
	const metadataHref = 'https://github.com/HumanCellAtlas/metadata-schema/tree/staging/docs';

	const gitHubPathPrefix = isPageMetadata(docPath) ? metadataHref : portalHref;

	return `${gitHubPathPrefix}${gitHubPathSuffix}.md`;
}

/**
 * Returns true if the document path is either metadata design principles "structure" or "rationale".
 *
 * @param path
 * @returns {boolean}
 */
function isPageMetadata(path) {

	return path === "/metadata/design-principles/structure" || path === "/metadata/design-principles/rationale";
}
