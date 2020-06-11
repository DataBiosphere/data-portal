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

    /* Build the site-map object. */
    return siteMapYAML.edges
        .map(n => n.node)
        .reduce((sectionAcc, section) => {

        const sectionTabs = section.tabs;

        if ( sectionTabs ) {

            return sectionTabs.reduce((tabAcc, tab) => {

                const primaryLinks = tab.primaryLinks;

                return primaryLinks.reduce((primaryAcc, pLink) => {

                    if ( !postsByKeyBlacklisted.has(pLink.key) ) {

                        setPostKeyValuePair(primaryAcc, pLink);
                    }

                    const secondaryLinks = pLink.secondaryLinks;

                    if ( secondaryLinks ) {

                        secondaryLinks.forEach(sLink => {

                            if ( !postsByKeyBlacklisted.has(sLink.key) ) {

                                setPostKeyValuePair(primaryAcc, sLink)
                            }
                        });
                    }
                    return primaryAcc;
                }, tabAcc);
            }, sectionAcc);
        }
        return sectionAcc;
        }, new Map());
};

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
