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
import * as EnvironmentService from "../environment/environment.service";
import * as HttpService from '../http.service';

const FILE_SUMMARY_API_URL = process.env.GATSBY_FILE_SUMMARY_API_URL;
const TERM_FACETS_API_URL = process.env.GATSBY_TERM_FACETS_API_URL;

/**
 * Build the set of search terms from the specified set of term facets.
 */
export function buildSearchTerms(termFacets) {

    return termFacets.reduce(function(accum, termFacet) {

        let projectFacet = (termFacet.facetName === "project");

        if ( projectFacet ) {
            accum.push({
                facetName: "projectId",
                terms: buildProjectIdSearchTerms(termFacet.terms)
            });
        }
        else {
            accum.push({
                facetName: termFacet.facetName,
                terms: buildFacetSearchTerms(termFacet.terms)
            });
        }

        return accum;
    }, []);
}

/**
 * Execute request for counts and summaries.
 */
export function fetchFileSummary() {

    const url = buildExploreUrl(FILE_SUMMARY_API_URL);
    return fetch(url)
        .then(HttpService.checkResponseStatus)
        .then(resp => resp.json())
        .then(bindFileSummaryResponse);
}

/**
 * Execute request for term facets.
 */
export function fetchTermFacets() {
    
    const url = buildExploreUrl(TERM_FACETS_API_URL);
    return fetch(url)
        .then(HttpService.checkResponseStatus)
        .then(resp => resp.json())
        .then(bindTermFacetsResponse);
}

/**
 * Format file summary into FE-friendly format.
 */
function bindFileSummaryResponse(fileSummaryResponse) {

    const cellCountSummaries = fileSummaryResponse.cellCountSummaries
        .filter(isValidCellCountSummaries)
        .map(nullCellCountSummaries)
        .map(summary => {

            return {
                label: formatCellCountSummariesOrganTypeForDisplay(summary.organType),
                count: summary.countOfDocsWithOrganType,
                cellCount: summary.totalCellCountByOrgan
            }
        });

    // Bind response values to file summary view format
    return {
        cellCount: fileSummaryResponse.totalCellCount,
        cellCountSummaries: cellCountSummaries,
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
        organCount: fileSummaryResponse.organTypes.length,
        organTypes: fileSummaryResponse.organTypes,
        projectCount: fileSummaryResponse.projectCount,
        totalCellCount: fileSummaryResponse.totalCellCount
    }
}

/**
 * Format term facets into FE-friendly format.
 */
function bindTermFacetsResponse(termFacetsResponse) {

    return Object.keys(termFacetsResponse.termFacets).reduce(function(accum, key) {

        const facet = termFacetsResponse.termFacets[key];
        accum.push({
            facetName: key,
            terms: facet.terms
        });

        return accum;
    }, []);
}

/**
 * Build the set of terms for facet (excluding project facet - see buildProjectIdSearchTerms).
 */
function buildFacetSearchTerms(terms) {
    
    return terms.map(term => {
        return {
            term: term.term || "Unspecified",
            count: term.count
        };
    });
}

/**
 * Build the set of terms for the project facet. This facet is converted to "projectId" and we must use the project ID
 * as the search value.
 */
function buildProjectIdSearchTerms(terms) {

    return terms.reduce((accum, term) => {

        term.projectId.forEach(projectId => {
            accum.push({
                term: projectId,
                termDisplayName: term.term
            });
        });
        return accum;
    }, []);
}

/**
 * Add catalog for v2 environments.
 */
function buildExploreUrl(baseUrl) {

    const exploreUrl = new URL(baseUrl);

    // Add default catalog for v2 environments.
    if ( EnvironmentService.isV2() ) {
        exploreUrl.searchParams.append("catalog", EnvironmentService.getDefaultCatalog());
    }
    
    return exploreUrl;
}

/**
 * Format organ summary organ type for display; return the first value in the organ type array.
 */
function formatCellCountSummariesOrganTypeForDisplay(organType) {

    return (organType || [])[0];
}

/**
 * A cell count summary is valid if it only has a single value for its organ type, as we currently do not have handling
 * for multiple labels when generating the SVG and associated stats).
 */
function isValidCellCountSummaries(summary) {

    // Organ type is only valid if it has a single value.
    return (summary.organType || []).length === 1;
}

/**
 * Any cell count summary with a null organType value is converted to the value "unspecified".
 */
function nullCellCountSummaries(summary) {

    const organType = summary.organType;

    // Change any null value to "unspecified"
    if ( !organType[0] ) {
        summary.organType = "unspecified";
    }

    return summary;
}
