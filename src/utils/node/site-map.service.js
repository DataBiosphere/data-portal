/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic site map service supporting gatsby-node.
 */

/**
 * Parse the site map YAML and returns a site-map map object.
 * The site-map object key-value pair comprises of each section, tab, primary and secondary
 * document's key and corresponding path (if it exists) or key.
 *
 * @param siteMapYAML
 * @returns {*}
 * @constructor
 */
const buildPostKeysByPath = function buildPostKeysByPath(siteMapYAML, markdownRemark) {

    const siteMap = siteMapYAML.edges.map(n => n.node);

    /* Build the site-map object. */
    const postsKeysByPath = siteMap.reduce((acc, section) => {

        const sectionTabs = section.tabs;

        if ( sectionTabs ) {

            return sectionTabs.reduce((acc, tab) => {

                const primaryLinks = tab.primaryLinks;

                return primaryLinks.reduce((acc, pLink) => {

                    setPostKeyValuePair(acc, pLink);

                    const secondaryLinks = pLink.secondaryLinks;

                    if ( secondaryLinks ) {

                        secondaryLinks.forEach(sLink => setPostKeyValuePair(acc, sLink));
                    }
                    return acc;
                }, acc);
            }, acc);
        }
        return acc;
        }, new Map());

    /* Find any posts blacklisted and remove the post from the site-map object. */
    const postsBlacklisted = filterPostsBlacklisted(markdownRemark);

    /* Remove blacklisted posts from the postKeysByPath object. */
    /* This will be referenced when building the navigation as a check for available posts. */
    if ( postsBlacklisted ) {

        postsBlacklisted.forEach(post => postsKeysByPath.delete(post));
    }

    return postsKeysByPath;
};

/**
 * Returns a list of posts disabled.
 *
 * @param markdownRemark
 * @returns {Array}
 */
function filterPostsBlacklisted(markdownRemark) {

	const postsBlacklist = markdownRemark.edges.map(e => e.node).filter(node => {

		const {fields} = node,
			{enabled} = fields;

		return enabled === false;
	});

	if ( postsBlacklist.length ) {

		return postsBlacklist.map(post => post.fields.slug);
	}
}

/**
 * Returns a post key value pair.
 * The key is the site map document key and value is the site map document path or key.
 *
 * @param acc
 * @param doc
 */
function setPostKeyValuePair(acc, doc) {

    acc.set(doc.key, doc.path || doc.key);
}

module.exports.buildPostKeysByPath = buildPostKeysByPath;
