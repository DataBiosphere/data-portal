/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Utility class for Google Tag Manager-related functionality.
 */

// App dependencies
import { GADimension } from "../dp-gtm/ga-dimension.model";

/**
 * Send custom event to GTM/GA.
 *
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {any} dimensions
 */
export function trackEvent(category, action, label, dimensions) {
  if (!isTrackingEnabled()) {
    return;
  }

  const eventConfig = Object.assign(
    getDefaultDimensions(),
    {
      event: category,
      eventAction: action,
      eventLabel: label
    },
    dimensions
  );

  getDataLayer().push(eventConfig);
}

/**
 * Returns the GTM data layer, if enabled, enabled for this environment.
 *
 * @returns {{}}
 */
function getDataLayer() {
  return window.dataLayer;
}

/**
 * Get the default values for every dimension.
 *
 * @returns {[key: string]: string}
 */
function getDefaultDimensions() {
  const defaultDimensions = {};
  for (let i in GADimension) {
    defaultDimensions[GADimension[i]] = undefined;
  }

  return defaultDimensions;
}

/**
 * Returns true if tracking is enabled.
 *
 * @returns {boolean}
 */
function isTrackingEnabled() {
  return !!getDataLayer();
}
