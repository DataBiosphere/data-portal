/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating hitting system-related API end points and formatting the corresponding responses. 
 */

// App dependencies
import * as EnvironmentService from "../utils/environment/environment.service";
import * as HttpService from '../utils/http.service';
const SYSTEM_HEALTH_CHECK_API_URL = process.env.GATSBY_SYSTEM_HEALTH_CHECK_API_URL;

/**
 * Check current state of system.
 */
export function healthCheck() {

	return fetch(SYSTEM_HEALTH_CHECK_API_URL)
		.then(HttpService.checkResponseStatus)
		.then(resp => resp.json())
		.then(bindHealthCheckResponse);
}

/**
 * Format response into FE-friendly format.
 */
function bindHealthCheckResponse(response) {

	return {
        healthy: EnvironmentService.isCGLEnvironment() ? response.up : response.status === "ok"
    };
}
