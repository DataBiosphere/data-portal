/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic service supporting gatsby-node on create node.
 */

// Template variables
const gatsbyEnv = process.env.GATSBY_ENV;
const pathMetadataRationale = "/metadata/metadata-design/rationale";
const pathMetadataStructure = "/metadata/metadata-structure/structure";

/**
 * Builds the post file path into a slug.
 *
 * @param filePath
 * @returns {*}
 */
const buildPostSlug = function buildPostSlug(filePath) {
  /* Strip the file path's tailing "/". */
  const slug = filePath.replace(/\/$/, "");

  /* Return the "markdown" slug. */
  switch (slug) {
    case "/rationale":
      return pathMetadataRationale;
    case "/structure":
      return pathMetadataStructure;
    default:
      return slug;
  }
};

/**
 * Returns true if the post node is enabled.
 * A post in draft mode with the gatsby environment in "PROD" will return a false value.
 *
 * @param draftExists
 * @returns {boolean}
 * @constructor
 */
const isPostNodeEnabled = function isPostNodeEnabled(draftExists) {
  /* Post will not be enabled if draft mode is true and environment is "PROD". */
  const postDraftInProdEnvironment =
    gatsbyEnv === "PROD" && draftExists === true;

  return !postDraftInProdEnvironment;
};

/**
 * Returns true if the post node is relevant to the site.
 * Posts include any content and "schema" metadata (which will ultimately build the metadata pages).
 *
 * @param type
 * @returns {boolean}
 */
const isPostNodeFeatured = function isPostNodeFeatured(type) {
  const contentFeatured = type === "MarkdownRemark";
  const metadataFeatured = type === "MetadataSchema";

  return contentFeatured || metadataFeatured;
};

module.exports.buildPostSlug = buildPostSlug;
module.exports.isPostNodeEnabled = isPostNodeEnabled;
module.exports.isPostNodeFeatured = isPostNodeFeatured;
