/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic service supporting gatsby-node create pages.
 */

// Template variables
const path = require("path");
const templatePath = {
    "CONTENT": "src/templates/contentTemplate.js",
    "METADATA": "src/templates/metadataTemplate.js",
    "SYSTEM_STATUS": "src/templates/systemStatusTemplate.js"
};

/**
 * Returns the post's path or key (if the post path does not exist),
 * specified by post slug.
 *
 * @param slug
 * @param postKeyByPath
 * @returns {*}
 * @constructor
 */
const buildPostPath = function buildPostPath(slug, postKeyByPath) {

    if ( !slug ) {

        return null;
    }
    else {

        return getPostPathOrKey(slug, postKeyByPath);
    }
};

/**
 * Returns the template path specified by template name.
 *
 * @param templateName
 * @returns {string}
 * @constructor
 */
const getPostTemplate = function getPostTemplate(templateName) {

    const template = templateName || "CONTENT";

    return path.resolve(`${templatePath[template]}`);
};

/**
 * Returns the corresponding post's path.
 *
 * @param slug
 * @param postKeyByPath
 * @returns {*}
 */
function getPostPathOrKey(slug, postKeyByPath) {

    if ( postKeyByPath && postKeyByPath.has(slug) ) {

        return postKeyByPath.get(slug);
    }

    return null;
}

module.exports.buildPostPath = buildPostPath;
module.exports.getPostTemplate = getPostTemplate;
