/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating release-related functionality. 
 */

// App dependencies
import * as EnvironmentService from '../utils/environment.service';

/**
 * Returns true if release is visible for the current environment; true if local or ux-dev
 */
export function isReleaseVisible() {

	return EnvironmentService.isLocal() || EnvironmentService.isUXDev();
}
