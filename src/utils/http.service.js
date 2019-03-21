/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic HTTP utilities file. 
 */

/**
 * Confirm response status is OK, and throw error if not.
 */
export function checkResponseStatus(response) {

	if ( !response.ok) {
		throw response;
	}
	
	return response;
}
