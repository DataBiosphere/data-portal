/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic service supporting gatsby-node on create node.
 */

// Template variables
const gatsbyContentVersion = process.env.GATSBY_CONTENT_VERSION;
const gatsbyEnv = process.env.GATSBY_ENV;
const pathMetadataDictionary = "/metadata/dictionary";
const pathMetadataRationale = "/metadata/design-principles/rationale";
const pathMetadataStructure = "/metadata/design-principles/structure";

/**
 * Builds the post file path into a slug.
 *
 * @param filePath
 * @returns {*}
 */
const buildPostSlug = function buildPostSlug(filePath) {

    /* Strip the file path's tailing "/". */
    const slug = filePath.replace(/\/$/, "");

    /* Return the "type" metadata slug */
    if ( slug.startsWith("/type/") ) {

        return slug.replace("/type", pathMetadataDictionary);
    }

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
 * A post in draft mode with the gatsby environment in "PROD" or
 * a mismatch in the specified post version with gatsby content version will result in a false value.
 *
 * @param draftExists
 * @param version
 * @returns {boolean}
 * @constructor
 */
const isPostNodeEnabled = function isPostNodeEnabled(draftExists, version) {

    /* Post will not be enabled if draft mode is true and environment is "PROD". */
    if ( draftExists === true && gatsbyEnv === "PROD" ) {

        return false;
    }

    /* Post will not be enabled if a specified version does not correlate with gatsby content version. */
    if ( version && version > 0 ) {

        return Number(gatsbyContentVersion) === Number(version);
    }

    return true;
};

/**
 * Returns true if the post node is relevant to the site.
 * Posts include any content and "type" metadata (which will ultimately build the metadata pages).
 *
 * @param type
 * @param relativeFilePath
 * @returns {boolean}
 */
const isPostNodeFeatured = function isPostNodeFeatured(type, relativeFilePath) {

    const fileMetadataType = relativeFilePath && relativeFilePath.includes("/type/");

    const contentFeatured = type === "MarkdownRemark";
    const metadataFeatured = type === "MetadataSchemaEntity" && fileMetadataType;

    return contentFeatured || metadataFeatured;
};

module.exports.buildPostSlug = buildPostSlug;
module.exports.isPostNodeEnabled = isPostNodeEnabled;
module.exports.isPostNodeFeatured = isPostNodeFeatured;
