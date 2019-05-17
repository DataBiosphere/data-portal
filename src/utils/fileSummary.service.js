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
import * as HttpService from '../utils/http.service';
const FILE_SUMMARY_API_URL = process.env.GATSBY_FILE_SUMMARY_API_URL;
const TERM_FACETS_API_URL = process.env.GATSBY_TERM_FACETS_API_URL;

/**
 * Execute request for counts and summaries.
 */
export function fetchFileSummary() {

	return fetch(FILE_SUMMARY_API_URL)
		.then(HttpService.checkResponseStatus)
		.then(resp => resp.json())
		.then(bindFileSummaryResponse);
}

/**
 * Execute request for term facets.
 */
export function fetchTermFacets() {

	return fetch(TERM_FACETS_API_URL)
		.then(HttpService.checkResponseStatus)
		.then(resp => resp.json())
		.then(bindTermFacetsResponse);
}

/**
 * Format file summary into FE-friendly format.
 */
function bindFileSummaryResponse(fileSummaryResponse) {

	const organSummary = fileSummaryResponse.organSummaries
		.filter(isValidOrganSummary)
		.map(summary => {

			return {
				label: formatOrganSummaryOrganTypeForDisplay(summary.organType),
				count: summary.countOfDocsWithOrganType,
				cellCount: summary.totalCellCountByOrgan
			}
		});

	// Bind response values to file summary view format
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
		organSummary: organSummary,
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
 * Format organ summary organ type for display. If we're dealing with the old API, return the organ type as is (as the
 * organ type is a string). Otherwise we're dealing with the new API and must return the first value in the organ type
 * array.
 */
function formatOrganSummaryOrganTypeForDisplay(organType) {
	
	return Array.isArray(organType) ? organType[0] : organType;
}

/**
 * An organ summary is valid if it only has a single value for its organ type, as we currently do not have handling for
 * multiple labels when generating the SVG and associated stats). Retain handling of older version of the API where organ
 * type is a string (in which case, the organ summary is automatically considered valid)
 */
function isValidOrganSummary(summary) {

	const organType = summary.organType;

	// Organ types that are not arrays are always considered valid (old API)
	if ( !Array.isArray(organType) ) {
		return true;
	}

	// Otherwise an array organ type is only valid if it has a single value (new API)
	return summary.organType.length === 1;
}
