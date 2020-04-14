/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Required for Edge, otherwise we get a "PerformanceObserver not defined" error 
require('@fastly/performance-observer-polyfill/polyfill');

// Add styles for inline and block code - https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
require(`prismjs/themes/prism-solarizedlight.css`);

// Determine site browser support
const Bowser = require("bowser");

exports.onClientEntry = () => {

	// Exit if path is static page for browser not supported
	if ( window.location.pathname === "/browser-not-supported.html" || window.location.pathname === "/browser-not-supported-static.html" ) {

		return;
	}

	const browser = Bowser.getParser(window.navigator.userAgent);

	// List of unsupported browsers
	const browserNotSupported = browser.satisfies({

		ie: ">=6",
		edge: "~15",
		windows: {
			safari: ">=1",
		}
	});

	// List of browsers requiring an "image" only unsupported page due to css inadequacies.
	const browserCSSNotSupported = browser.satisfies({

		ie: "<=9",
	});

	// Redirect to static "browser not supported" page, should browser be unsupported by the AnVIL site.
	if ( browserNotSupported ) {

		if ( browserCSSNotSupported ) {

			window.location.replace("/browser-not-supported-static.html");
		}
		else {

			window.location.replace("/browser-not-supported.html");
		}
	}
};
