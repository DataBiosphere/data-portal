/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Based on gatsby-remark-autolink-headers but swaps standard anchor tags for custom InternalLink component that uses the
 * router to navigate.
 * 
 * TODO - pull InternalLink component into its own package so it can be used here, as well as in our custom content-specific components.
 */

// Dependencies
const slugs = require("github-slugger")();
const toString = require("mdast-util-to-string");
const visit = require('unist-util-visit');

/**
 * Add attribute to the specified node if it doesn't already exist.
 * 
 * @param context - node
 * @param key - attribute key
 * @param value - attribute value
 * @returns {*} - updated node
 */
function patch(context, key, value) {
    
    if ( !context[key] ) {
        context[key] = value;
    }

    return context[key];
}

module.exports = ({markdownNode, markdownAST}) => {

    slugs.reset();

    visit(markdownAST, "heading", function (node) {

        // If elements array exists, do not create links for heading types not included in array
        const elements = node.elements;
        if (Array.isArray(elements) && !elements.includes("h" + node.depth)) {
            return;
        }

        // Calculate the slug for the heading
        const slug = slugs.slug(toString(node), false);

        // Add ID to heading tag
        const data = patch(node, "data", {});
        patch(data, "id", slug);
        patch(data, "htmlAttributes", {});
        patch(data, "hProperties", {});
        patch(data.htmlAttributes, "id", slug);
        patch(data.hProperties, "id", slug);
        patch(data.hProperties, "style", "position:relative");

        // Add anchor as child to heading tag
        const anchorNode = {
            type: "html",
            value: `<internal-link anchor="${slug}"/>`
        };
        node.children.push(anchorNode);
    });
    return markdownAST;
};
