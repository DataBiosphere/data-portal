/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * There are two pages currently imported during the build process (/design-principles/structure and
 * /design-principles/rationale) that contain four types of links:
 *
 * 1. links to pages external to both the Portal and the GitHub metadata schema pages
 * 2. links to anchors within the page
 * 3. links to anchors within the other imported page (eg from structure to rationale, and vice versa)
 * 4. links to metadata pages that are not imported (eg evolution)
 *
 * Cases one, two and three above do not need to be modified. For case four, we must transform the link to be the fully
 * qualified URL for that resource, as the existing relative link will not work (the links are relative within GitHub
 * and not relative in the Portal).
 *
 * Note, this is a first-pass solution and is brittle in that, if the path to either of the two imported pages changes,
 * the `importedPaths` and `ignoreStems` sets must also be updated.
 */

// Dependencies
const visit = require('unist-util-visit')

// Gatsby environment
const GATSBY_ENV = process.env.GATSBY_ENV

// Environment to GitHub branch mapping
const branchNameByEnvironment = {
  LOCAL: 'staging',
  DEV: 'develop',
  INTEGRATION: 'integration',
  STAGING: 'staging',
  PROD: 'master',
}

// Fully qualified URL stem, to resources that fall into category 3 above.
const branchName = branchNameByEnvironment[GATSBY_ENV]
const fullyQualifiedStem = `https://github.com/HumanCellAtlas/metadata-schema/blob/${branchName}/docs/`

// Paths of imported pages
const importedPaths = [
  '/metadata/design-principles/rationale',
  '/metadata/design-principles/structure',
]

// Set of URL stems that indicate a link does not need to be transformed
const ignoreStems = ['//', 'http', '#', 'rationale', 'structure']

module.exports = ({ markdownNode, markdownAST }) => {
  const path = ((markdownNode || {}).fields || {}).path

  // Return the AST as is if this page isn't marked as one we want to update links on
  if (!path || importedPaths.indexOf(path) === -1) {
    return markdownAST
  }

  // Otherwise, we need to update relative links to include the domain and possibly a path
  visit(markdownAST, 'link', node => {
    if (!node.url) {
      return
    }

    // Prepend domain and path, if necessary (see plugin description in comment block at top)
    const updateRequired = !ignoreStems.find(stem => node.url.startsWith(stem))
    if (updateRequired) {
      node.url = fullyQualifiedStem + node.url
    }
  })

  return markdownAST
}
