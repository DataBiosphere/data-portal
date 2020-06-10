/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic site map service supporting gatsby-node.
 */

/**
 * Returns a site-map map object.
 * The site-map object key-value pair comprises of each section, tab, primary and secondary
 * document's key, and corresponding path or key (if path does not exist).
 *
 * @param siteMapYAML
 * @param postsByKeyBlacklisted
 * @returns {*}
 */
const buildPostKeysByPath = function buildPostKeysByPath(siteMapYAML, postsByKeyBlacklisted) {

    const siteMap = siteMapYAML.edges.map(n => n.node);

    /* Build the site-map object. */
    return siteMap.reduce((acc, section) => {

        const sectionTabs = section.tabs;

        if ( sectionTabs ) {

            return sectionTabs.reduce((acc, tab) => {

                const primaryLinks = tab.primaryLinks;

                return primaryLinks.reduce((acc, pLink) => {

                    setPostKeyValuePair(acc, pLink, postsByKeyBlacklisted);

                    const secondaryLinks = pLink.secondaryLinks;

                    if ( secondaryLinks ) {

                        secondaryLinks.forEach(sLink => setPostKeyValuePair(acc, sLink, postsByKeyBlacklisted));
                    }
                    return acc;
                }, acc);
            }, acc);
        }
        return acc;
        }, new Map());
};

/**
 * Returns a post key value pair, if the post is not blacklisted.
 * The key is the site map document key and value is the site map document path or key.
 *
 * @param acc
 * @param doc
 * @param postsByKeyBlacklisted
 */
function setPostKeyValuePair(acc, doc, postsByKeyBlacklisted) {

    if ( !postsByKeyBlacklisted.has(doc.key) ) {

        acc.set(doc.key, doc.path || doc.key);
    }
}

module.exports.buildPostKeysByPath = buildPostKeysByPath;
