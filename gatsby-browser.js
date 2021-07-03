/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby Browser APIs.
 */

// Required for Edge, otherwise we get a "PerformanceObserver not defined" error
require('@fastly/performance-observer-polyfill/polyfill')

// Add styles for inline and block code - https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
require(`prismjs/themes/prism-solarizedlight.css`)

// Add environment-specific styles
require('./src/styles/lungmap/vars-lungmap.css')

// Determine site browser support
const Bowser = require('bowser')

exports.onClientEntry = () => {
  // Exit if path is static page for browser not supported
  if (window.location.pathname === '/browser-not-supported.html') {
    return
  }

  const browser = Bowser.getParser(window.navigator.userAgent)

  // List of unsupported browsers
  const browserNotSupported = browser.satisfies({
    ie: '>=6',
    edge: '~15',
    windows: {
      safari: '>=1',
    },
  })

  // Redirect to static "browser not supported" page, should browser be unsupported by the site.
  if (browserNotSupported) {
    window.location.replace('/browser-not-supported.html')
  }
}
