/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating release-related functionality. 
 */

// App dependencies
import * as EnvironmentService from "./environment/environment.service";

/**
 * Returns true if release is visible for the current environment; not currently visible in any environment.
 */
export function isReleaseVisible() {

    return false;
}
