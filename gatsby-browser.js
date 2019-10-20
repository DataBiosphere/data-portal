/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Required for Edge, otherwise we get a "PerformanceObserver not defined" error 
import '@fastly/performance-observer-polyfill/polyfill'

// Add styles for inline and block code - https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
require(`prismjs/themes/prism-solarizedlight.css`);
