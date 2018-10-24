/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating hitting file summary API end points and formatting the corresponding responses.
 */

// Local vars
const FILES_API_URL = process.env.GATSBY_EXPLORE_URL
    .replace('https://','https://service.')
    .replace('explore/','repository/summary')
    .replace('data','explore.data');
//'https://service.staging.explore.data.humancellatlas.org/repository/summary';
// export GATSBY_EXPLORE_URL=https://staging.data.humancellatlas.org/explore/



/**
 * Execute request for counts and summaries.
 */
export function fetchFileSummary() {

    return fetch(FILES_API_URL)
        .then(resp => resp.json())
        .then(bindFileSummaryResponse);
}

/**
 * Format file summary into FE-friendly format.
 */
function bindFileSummaryResponse(fileSummaryResponse) {

    return {
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
    
