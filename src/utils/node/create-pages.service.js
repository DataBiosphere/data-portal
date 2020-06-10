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
 * Returns the post's path or key (if the post path does not exist).
 *
 * A null path will prevent the post's page from being created.
 *
 * @param slug
 * @param postsKeysByPath
 * @returns {*}
 * @constructor
 */
const buildPostPath = function buildPostPath(slug, postsKeysByPath) {

    if ( !slug ) {

        return null;
    }

    return getPostPathOrKey(slug, postsKeysByPath);
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
 * Returns a set of posts blacklisted i.e. not "enabled".
 *
 * @param markdownRemark
 * @returns {Set}
 */
const setOfPostsBlacklisted = function setOfPostsBlacklisted(markdownRemark) {

    return markdownRemark.edges.map(e => e.node).reduce((acc, node) => {

        const {fields} = node,
            {enabled, slug} = fields;

        if ( enabled === false ) {

            acc.add(slug);
        }

        return acc;
    }, new Set());
};

/**
 * Returns the corresponding post's path.
 *
 * @param slug
 * @param postsKeysByPath
 * @returns {*}
 */
function getPostPathOrKey(slug, postsKeysByPath) {

    if ( postsKeysByPath && postsKeysByPath.has(slug) ) {

        return postsKeysByPath.get(slug);
    }

    return null;
}

module.exports.buildPostPath = buildPostPath;
module.exports.getPostTemplate = getPostTemplate;
module.exports.setOfPostsBlacklisted = setOfPostsBlacklisted;
