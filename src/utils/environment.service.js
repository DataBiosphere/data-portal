/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling environment-related functionality.
 */

// App dependencies
const GATSBY_ENV = process.env.GATSBY_ENV;

/**
 * Return the name of the current environment
 */
export function getCurrentEnvironment() {
	
	return GATSBY_ENV;
}

/**
 * Returns true if the specified environment is the current environment
 */
export function isCurrentEnvironment(environment, localAsDev) {

	// Local is equivalent to dev, if applicable
	if ( localAsDev && environment === 'DEV' && isLocal() ) {
		return true;
	}

	// Otherwise explicitly check
	return GATSBY_ENV === environment;
}

/**
 * Returns true if the current environment is dev.
 */
export function isDev() {

	return GATSBY_ENV === 'DEV';
}

/**
 * Returns true if the current environment is local.
 */
export function isLocal() {

	return GATSBY_ENV === 'LOCAL';
}

/**
 * Returns true if the current environment is integration.
 */
export function isIntegration() {

	return GATSBY_ENV === 'INTEGRATION';
}

/**
 * Returns true if the current environment is production.
 */
export function isProd() {

	return GATSBY_ENV === 'PROD';
}

/**
 * Returns true if the current environment is staging.
 */
export function isStaging() {

	return GATSBY_ENV === 'STAGING';
}

/**
 * Returns true if the current environment is ux-dev.
 */
export function isUXDev() {

	return GATSBY_ENV === 'UX_DEV';
}

/**
 * Returns true if the current environment is either local, dev, ux-dev, integration or staging. 
 */
export function isTestEnvironment() {

	return isLocal() || isDev() || isUXDev() || isIntegration() || isStaging(); 
}
