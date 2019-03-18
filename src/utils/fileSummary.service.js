/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating hitting file summary API end points and formatting the corresponding responses. 
 * 
 * Run the following command locally to set your GATSBY_EXPLORE_URL:
 * export GATSBY_EXPLORE_URL=https://staging.data.humancellatlas.org/explore/
 */

// App dependencies
const FILE_SUMMARY_API_URL = process.env.GATSBY_FILE_SUMMARY_API_URL;
const TERM_FACETS_API_URL = process.env.GATSBY_TERM_FACETS_API_URL;

/**
 * Execute request for counts and summaries.
 */
export function fetchFileSummary() {

	return fetch(FILE_SUMMARY_API_URL)
		.then(checkResponseStatus)
		.then(resp => resp.json())
		.then(bindFileSummaryResponse);
}

/**
 * Execute request for term facets.
 */
export function fetchTermFacets() {

	return fetch(TERM_FACETS_API_URL)
		.then(checkResponseStatus)
		.then(resp => resp.json())
		.then(bindTermFacetsResponse);
}

/**
 * Format file summary into FE-friendly format.
 */
function bindFileSummaryResponse(fileSummaryResponse) {

	return {
		cellCount: fileSummaryResponse.totalCellCount,
		donorCount: fileSummaryResponse.donorCount,
		fileCount: fileSummaryResponse.fileCount,
		fileFormatSummary: fileSummaryResponse.fileTypeSummaries.map((summary) => {
			return {
				label: summary.fileType,
				count: summary.count
			}
		}),
		labCount: fileSummaryResponse.labCount,
		loaded: true,
		organCount: fileSummaryResponse.organCount,
		organSummary: fileSummaryResponse.organSummaries.map((summary) => {
			return {
				label: summary.organType,
				count: summary.countOfDocsWithOrganType,
				cellCount: summary.totalCellCountByOrgan
			}
		}),
		projectCount: fileSummaryResponse.projectCount,
		totalCellCount: fileSummaryResponse.totalCellCount
	}
}

/**
 * Format term facets into FE-friendly format.
 */
function bindTermFacetsResponse(termFacetsResponse) {

	return Object.keys(termFacetsResponse.termFacets).reduce(function (accum, key) {

		const facet = termFacetsResponse.termFacets[key];
		accum.push({
			facetName: key,
			terms: facet.terms
		});

		return accum;
	}, []);
}

/**
 * Confirm response status is OK, and throw error if not.
 */
function checkResponseStatus(response) {

	if ( !response.ok) {
		throw response;
	}
	
	return response;
}
