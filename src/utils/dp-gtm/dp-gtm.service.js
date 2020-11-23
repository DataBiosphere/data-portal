/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Utility class for Data Portal-specific Google Tag Manager functionality. 
 */

// App dependencies
import { GAAction } from "./ga-action.model";
import { GACategory } from "./ga-category.model";
import { GADimension } from "./ga-dimension.model";
import * as GTMService from "../gtm/gtm.service";

/**
 * Track input of search text.
 * 
 * @param {string} value
 * @param {GAEntityType} entityType
 */
export function trackMetadataSearchInput(value, entityType) {

    GTMService.trackEvent(GACategory.SEARCH, GAAction.ENTER_TEXT, value, {
        [GADimension.ENTITY_TYPE]: entityType,
    });
}

/**
 * Track select of search result.
 * 
 * @param {string} value
 * @param {string} searchTerm
 * @param {GAEntityType} entityType
 */
export function trackMetadataSearchResultClick(value, searchTerm, entityType) {

    GTMService.trackEvent(GACategory.SEARCH, GAAction.CLICK, value, {
        [GADimension.ENTITY_TYPE]: entityType,
        [GADimension.SEARCH_TERM]: searchTerm
    });
}
