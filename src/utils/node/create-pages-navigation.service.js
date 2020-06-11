/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic service supporting gatsby-node.
 * Builds the post's navigation (for metadata and markdown pages).
 */

/**
 * Returns the metadata object key-value pair comprising of metadata slug and title.
 *
 * @param metadataSchema
 * @returns {*}
 */
const buildMetadataKeysByTitle = function buildMetadataKeysByTitle(metadataSchema) {

    const metadataNodes = metadataSchema.edges.map(n => n.node);

    return metadataNodes.reduce((acc, node) => {

        const {fields, title} = node,
            {slug} = fields;

        acc.set(slug, title);

        return acc;
    }, new Map());
};

/**
 * Builds metadata primary and secondary links.
 *
 * @param metadataPostsKeysByTitle
 */
const buildMetadataLinks = function buildMetadataLinks(metadataPostsKeysByTitle) {

    /* Get the complete list of metadata keys. */
    const metadataKeys = [...metadataPostsKeysByTitle.keys()];

    /* From the list of metadata keys, create a set of primary link "keys". */
    const primaryLinks = metadataKeys.reduce((acc, key) => {

        acc.add(key.split("/")[3]);

        return acc;
    }, new Set());

    /* Sort the primary link keys alphabetically. */
    const sortedPrimaryLinks = [...primaryLinks].sort(function (link0, link1) {

        if (link0 < link1) {
            return -1;
        }
        if (link0 > link1) {
            return 1;
        }
        return 0;
    });

    /* Build the primary and secondary links. */
    return sortedPrimaryLinks.map(pLinkKey => {

        /* Find all related metadata posts - they share the same primary link key. */
        const metadataPostsByPrimaryLink = filterPostsKeysByPath(pLinkKey, metadataPostsKeysByTitle);

        /* For each set of links, get the first link key - this will be the slug/path for the primary link. */
        const primaryLinkKey = metadataPostsByPrimaryLink.keys().next().value;

        /* Build the secondary links. */
        const secondaryLinks = [...metadataPostsByPrimaryLink].map(sLink => {

            return {
                active: false, /* Let "active" be false, for now. */
                key: sLink[0],
                name: sLink[1],
                path: sLink[0]
            }
        });

        /* Based off https://stackoverflow.com/a/196991 (see string-format.service.js) */
        const pLinkName = pLinkKey.replace(/\w\S*/g, (text) => {return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();});

        /* Build the primary links. */
        return {
            active: false, /* The metadata primary link is never active. */
            key: primaryLinkKey,
            name: pLinkName,
            path: primaryLinkKey,
            sLinks: secondaryLinks
        }
    });
};

/**
 * Returns the metadata post's navigation, including the post's section and tabs.
 *
 * @param postSlug
 * @param metaLinks
 * @param postsSiteMap
 * @returns {{links, section, tabs}}
 */
const getMetadataPostNavigation = function getMetadataPostNavigation(postSlug, metaLinks, postsSiteMap) {

    /* Get the metadata post's site map. The metadata post will be built into this site map. */
    const metadataSiteMap = getPostSiteMapBySectionKey("metadata", postsSiteMap);

    return buildPostMetadataNavigation(postSlug, metadataSiteMap, metaLinks);
};

/**
 * Returns the post's navigation, including the post's section and tabs.
 *
 * @param postSlug
 * @param postsSiteMap
 * @param metaLinks
 * @returns {{links, section, tabs}}
 */
const getPostNavigation = function getPostNavigation(postSlug, postsSiteMap, metaLinks) {

    /* Get the post's section key. */
    const postSectionKey = getPostSectionKey(postSlug);

    /* Get the post's site map. */
    const postSiteMap = getPostSiteMapBySectionKey(postSectionKey, postsSiteMap);

    if ( !postSiteMap ) {

        return {};
    }

    /* Build the post's navigation. */
    return buildPostNavigation(postSlug, postSiteMap, metaLinks);
};

/**
 * Removes any blacklisted posts from the site map.
 *
 * @param siteMapYAML
 * @param postsByKeyBlacklisted
 * @returns {Array}
 */
const removeBlacklistedPosts = function removeBlacklistedPosts(siteMapYAML, postsByKeyBlacklisted) {

    const siteMapNodes = siteMapYAML.edges.map(e => e.node);

    return siteMapNodes.map(node => {

        node.tabs = node.tabs.flatMap(tab => {

            tab.primaryLinks = tab.primaryLinks.flatMap(pLink => {

                /* Keep secondary links if they are not blacklisted. */
                if ( pLink.secondaryLinks ) {

                    pLink.secondaryLinks = pLink.secondaryLinks.flatMap(sLink => getWhitelistedLink(sLink, postsByKeyBlacklisted));
                }

                /* Keep primary links if they are not blacklisted. */
                return getWhitelistedLink(pLink, postsByKeyBlacklisted);
            });

            /* Remove tab, if no primary links. */
            if ( tab.primaryLinks.length ) {

                return tab;
            }

            return [];
        });

        return node;
    });
};

/**
 * Builds the post's links for the specified post.
 *
 * @param postSlug
 * @param postTab
 */
function buildPostLinks(postSlug, postTab) {

    if ( !postTab || !postTab.primaryLinks ) {

        return;
    }

    return postTab.primaryLinks.map(pLink => {

        let secondaryLinks;

        /* Secondary links. */
        if (pLink.secondaryLinks) {

            secondaryLinks = pLink.secondaryLinks.map(sLink => {

                /* Return built secondary links. */
                return {
                    active: sLink.key === postSlug,
                    key: sLink.key,
                    name: sLink.name,
                    path: getSiteMapPath(sLink)
                }
            })
        }

        /* Return built primary links. */
        return {
            active: pLink.key === postSlug,
            key: pLink.key,
            name: pLink.name,
            path: getSiteMapPath(pLink),
            sLinks: secondaryLinks
        };
    });
}

/**
 * Builds the metadata post's navigation.
 *
 * @param postSlug
 * @param metadataSiteMap
 * @param metaLinks
 * @returns {{links, section, tabs}}
 */
function buildPostMetadataNavigation(postSlug, metadataSiteMap, metaLinks) {

    /* Post section. */
    const postSection = buildPostSection(metadataSiteMap);

    /* Post tabs. */
    const postTabs = buildPostTabs("dictionary", metadataSiteMap);

    /* Post tab. */
    const postTab = getPostTab("dictionary", metadataSiteMap);

    /* No post tab for this post i.e. no primary links for this post's tab exist. */
    if ( !postTab ) {

        return {}
    }

    /* Build any related non-metadata site map links. */
    const siteMapLinks = buildPostLinks(postSlug, postTab);

    /* Update the metaLinks with active state. */
    const metadataLinks = getMetaLinksActiveState(postSlug, metaLinks);

    /* Add metadata links to the site map links. */
    siteMapLinks.push(...metadataLinks);

    return {
        links: siteMapLinks,
        section: postSection,
        tabKey: postTab.key,
        tabs: postTabs
    }
}

/**
 * Builds the post's navigation.
 *
 * @param postSlug
 * @param postSiteMap
 * @param metaLinks
 * @returns {{links, section, tabs}}
 */
function buildPostNavigation(postSlug, postSiteMap, metaLinks) {

    /* Post section. */
    const postSection = buildPostSection(postSiteMap);

    /* Get the post's tab key. */
    const postTabKey = getPostTabKey(postSlug);

    /* Post tabs. */
    const postTabs = buildPostTabs(postTabKey, postSiteMap);

    /* Post tab. */
    const postTab = getPostTab(postTabKey, postSiteMap);

    /* No post tab for this post i.e. no primary links exist. */
    if ( !postTab ) {

        return {}
    }

    /* Post links - post's site map links. */
    const siteMapLinks = buildPostLinks(postSlug, postTab);

    /* Add metadata links to the post's site map links, if the post's tab is "dictionary". */
    if ( postTabKey === "dictionary" ) {

        siteMapLinks.push(...metaLinks);
    }

    /* Return the built post's navigation. */
    return {
        links: siteMapLinks,
        section: postSection,
        tabKey: postTab.key,
        tabs: postTabs,
    }
}

/**
 * Builds the post's section for the specified post.
 *
 * @param siteMap
 * @returns {{key, name, path: path}}
 */
function buildPostSection(siteMap) {

    return {
        key: siteMap.key,
        name: siteMap.name,
        path: getSiteMapPath(siteMap)
    }
}

/**
 * Builds the post's tabs.
 *
 * @param tabKey
 * @param siteMap
 */
function buildPostTabs(tabKey, siteMap) {

    return siteMap.tabs.reduce((acc, tab) => {

        /* Build tab, if primary links exist. */
        if ( tab.primaryLinks ) {

            /* Find the tab's first primary link - this will be used for the tab's path. */
            const firstPLink = tab.primaryLinks[0];

            const postTab = {
                active: tab.key === tabKey,
                key: tab.key,
                name: tab.name,
                path: getSiteMapPath(firstPLink)
            };

            return acc.concat(postTab);
        }
    }, []);
}

/**
 * Returns the site map path for the specified link.
 *
 * @param link
 * @returns {path}
 */
function getSiteMapPath(link) {

    return link.path ? link.path : link.key;
}

/**
 * Returns the metadata links with corresponding active state for the post.
 *
 * @param postSlug
 * @param metaLinks
 */
function getMetaLinksActiveState(postSlug, metaLinks) {

    return metaLinks.map(pLink => {

        /* Primary links. */
        const pLinkClone = Object.assign({}, pLink);

        if ( pLink.sLinks ) {

            /* Secondary links. */
            pLinkClone.sLinks = pLink.sLinks.map(sLink => {

                const sLinkClone = Object.assign({}, sLink);

                sLinkClone.active = sLink.key === postSlug;

                return sLinkClone;
            })
        }

        return pLinkClone;
    });
}

/**
 * Returns the post's section key.
 *
 * @param slug
 * @returns {*}
 */
function getPostSectionKey(slug) {

    return slug.split("/")[1];
}

/**
 * Returns the post's tab.
 *
 * @param tabKey
 * @param siteMap
 * @returns {void | Array | T | *}
 */
function getPostTab(tabKey, siteMap) {

    return siteMap.tabs.find(tab => tab.key === tabKey);
}

/**
 * Returns the post's tab key.
 *
 * @param slug
 * @returns {*}
 */
function getPostTabKey(slug) {

    return slug.split("/")[2];
}

/**
 * Returns the site map for the specified section.
 *
 * @param sectionKey
 * @param postsSiteMap
 * @returns {*}
 */
function getPostSiteMapBySectionKey(sectionKey, postsSiteMap) {

    if ( !postsSiteMap ) {

        return {};
    }

    return postsSiteMap.find(section => section.key === sectionKey);
}

/**
 * Returns the link if it isn't blacklisted.
 *
 * @param link
 * @param postsByKeyBlacklisted
 * @returns {*}
 */
function getWhitelistedLink(link, postsByKeyBlacklisted) {

    if ( postsByKeyBlacklisted.has(link.key) ) {

        return [];
    }

    return link;
}

/**
 * Returns the post keys by path for the specified key.
 *
 * @param key
 * @param postsKeysByPath
 * @returns {Map}
 */
function filterPostsKeysByPath(key, postsKeysByPath) {

    return new Map([...postsKeysByPath].filter(([postKey]) => postKey.includes(`/${key}/`)));
}

module.exports.buildMetadataKeysByTitle = buildMetadataKeysByTitle;
module.exports.buildMetadataLinks = buildMetadataLinks;
module.exports.getMetadataPostNavigation = getMetadataPostNavigation;
module.exports.getPostNavigation = getPostNavigation;
module.exports.removeBlacklistedPosts = removeBlacklistedPosts;
