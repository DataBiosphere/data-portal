/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic service supporting gatsby-node.
 * Builds the post's navigation (for metadata and markdown pages).
 */

// Template variables
const orderEntities = ["type", "core", "module", "system"];

/**
 * Returns the metadata object key-value pair comprising of metadata slug and
 * a string array of schema entity, category and schema title.
 *
 * @param metadataSchema
 * @returns {*}
 */
const buildMetadataEntityCategorySchemaTitleByKey = function buildMetadataEntityCategorySchemaTitleByKey(metadataSchema) {

    return metadataSchema.edges
        .map(n => n.node)
        .reduce((acc, node) => {

        const {category, entity, fields, title} = node,
            {slug} = fields;

        acc.set(slug, [entity, category, title]);

        return acc;
    }, new Map());
};

/**
 * Builds metadata primary and secondary links.
 *
 * @param metadataEntityCategorySchemaTitleByKey
 * @param allMetadataEntity
 */
const buildMetadataLinksByEntity = function buildMetadataLinksByEntity(metadataEntityCategorySchemaTitleByKey, allMetadataEntity) {

    /* Create an object key-value pair of entity and set of associated categories. */
    const setOfCategoriesByEntity = allMetadataEntity.edges
        .map(n => n.node)
        .reduce((acc, entity) => {

            const {categories, entityName} = entity;

            /* Grab the set of categories. */
            const setOfCategories = new Set(categories.map(category => category.categoryName));

            acc.set(entityName, setOfCategories);

            return acc;
        }, new Map());

    /* Build the primary and secondary links for each entity's category. */
    return [...setOfCategoriesByEntity].reduce((acc, [entity, setOfCategories]) => {

        const categoryLinks = [...setOfCategories].map(category => {

            /* Find all related metadata posts i.e. schema from the same entity - they share the same primary link key. */
            const filteredMetadataPosts = filterMetadataPostsByEntityCategory(metadataEntityCategorySchemaTitleByKey, entity, category);

            /* For each set of links, get the first link key - this will be the slug/path for the primary link. */
            const primaryLinkKey = filteredMetadataPosts.keys().next().value;

            /* Handle special case where entity "system" does not have any categories. */
            /* e.g. "System" becomes the category name for entity "system". */
            let pLinkName;

            if ( category ) {

                pLinkName = capitalizeString(category);
            }
            else {

                pLinkName = capitalizeString(entity);
            }

            /* Build the secondary links. */
            const secondaryLinks = [...filteredMetadataPosts].map(([metadataPostKey, entityCategorySchemaTitle]) => {

                const [,,schemaTitle] = entityCategorySchemaTitle;

                return {
                    active: false, /* Let "active" be false, for now. */
                    key: metadataPostKey,
                    name: schemaTitle,
                    path: metadataPostKey
                }
            });

            /* Return the primary link. */
            return {
                active: false, /* The metadata primary link is never active. */
                key: primaryLinkKey,
                name: pLinkName,
                path: primaryLinkKey,
                sLinks: secondaryLinks
            };
        });

        acc.set(entity, categoryLinks);

        return acc;
    }, new Map());
};

/**
 * Builds the metadata tab comprising of entities with corresponding path for the entity.
 * The path matches the entity's first category's first schema.
 *
 * @param metadataEntityCategorySchemaTitleByKey
 * @param allMetadataEntity
 * @returns {Array}
 */
const buildMetadataTabs = function buildMetadataTabs(metadataEntityCategorySchemaTitleByKey, allMetadataEntity) {

    const metadataEntities = allMetadataEntity.edges.map(n => n.node);

    /* Reorder entities - by predefined order. */
    /* This sets up the metadata tab order of display. */
    const reorderedEntities = orderEntities.map(entity => {

        return metadataEntities.find(MetadataEntity => MetadataEntity.entityName === entity);
    });

    /* Create an object key-value pair of entity and set of associated categories. */
    return reorderedEntities
        .map(entity => {

            const {entityName} = entity;

            /* Find the first metadata path for the specified entity. */
            const tabPath = findMetadataTabPathByEntity(metadataEntityCategorySchemaTitleByKey, entityName);

            /* Create tab name. */
            const tabName = buildMetadataTabName(entityName);

            return {
                active: false, /* Let "active" be false, for now. */
                key: entityName,
                name: tabName,
                path: tabPath
            }
        })
};

/**
 * Returns the metadata post's navigation, including the post's section and tabs.
 *
 * @param postSlug
 * @param postsSiteMap
 * @param metaLinksByEntity
 * @param metaTabs
 * @param entity
 * @returns {{}|{links, section, secondaryTabs, tabKey, tabs}}
 */
const getMetadataPostNavigation = function getMetadataPostNavigation(postSlug, postsSiteMap, metaLinksByEntity, metaTabs, entity) {

    /* Get the metadata post's site map. The metadata post will be built onto this site map. */
    const metadataSiteMap = getPostSiteMapBySectionKey("metadata", postsSiteMap);

    return buildPostMetadataNavigation(postSlug, metadataSiteMap, metaLinksByEntity, metaTabs, entity);
};

/**
 * Returns the post's navigation, including the post's section and tabs.
 *
 * @param postSlug
 * @param postsSiteMap
 * @param metaLinksByEntity
 * @returns {{links, section, tabs}}
 */
const getPostNavigation = function getPostNavigation(postSlug, postsSiteMap, metaLinksByEntity) {

    /* Get the post's section key. */
    const postSectionKey = getPostSectionKey(postSlug);

    /* Get the post's site map. */
    const postSiteMap = getPostSiteMapBySectionKey(postSectionKey, postsSiteMap);

    if ( !postSiteMap ) {

        return {};
    }

    /* Build the post's navigation. */
    return buildPostNavigation(postSlug, postSiteMap, metaLinksByEntity);
};

/**
 * Removes any deny listed posts from the site map.
 *
 * @param siteMapYAML
 * @param denyListPostsByKey
 * @returns {Array}
 */
const removeDenyListedPosts = function removeDenyListedPosts(siteMapYAML, denyListPostsByKey) {

    const siteMapNodes = siteMapYAML.edges.map(e => e.node);

    return siteMapNodes.map(node => {

        /* Clone node. */
        const nodeClone = Object.assign({}, node);

        /* Update the node with tabs. */
        nodeClone.tabs = node.tabs.reduce((acc, tab) => {

            /* Clone tab. */
            const tabClone = Object.assign({}, tab);

            /* Update the tab with primary links. */
            tabClone.primaryLinks = tab.primaryLinks.reduce((acc, pLink) => {

                /* Clone the primary link. */
                const pLinkClone = Object.assign(pLink);

                /* Secondary links - only accumulate if not on the deny list. */
                if ( pLink.secondaryLinks ) {

                    pLinkClone.secondaryLinks = pLink.secondaryLinks.reduce((acc, sLink) => {

                        if ( isPostAllowList(sLink, denyListPostsByKey) ) {

                            acc.push(sLink);
                        }

                        return acc;
                    }, []);
                }

                /* Primary link - only accumulate if not on the deny list. */
                if ( isPostAllowList(pLink, denyListPostsByKey) ) {

                    acc.push(pLinkClone);
                }

                return acc;
            }, []);

            /* Remove tab, if no primary links. */
            if ( tabClone.primaryLinks.length > 0 ) {

                acc.push(tabClone);
            }

            return acc;
        }, []);

        return node;
    });
};

/**
 * Builds a dummy metadata dictionary tab for use within the metadata section.
 *
 * @param metaLinksByEntity
 * @param active
 * @returns {{active: *, key: string, name: string, path: string}}
 */
function buildDummyMetadataDictionaryTab(metaLinksByEntity, active = false) {

    /* Grab the first "type" entity schema for the metadata dictionary dummy tab. */
    /* We will use this path as the entry point into the metadata dictionary. */
    const [firstSchema,] = metaLinksByEntity.get("type");

    return {
        active: active,
        key: "/metadata/dictionary/",
        name: "Dictionary",
        path: firstSchema.path
    };
}

/**
 * Returns the metadata tab name, for the specified entity.
 *
 * @param entityName
 * @returns {string}
 */
function buildMetadataTabName(entityName) {

    if ( entityName === "type" ) {

        return `${capitalizeString(entityName)}s`;
    }
    else if ( entityName === "module" ) {

        return `Entity ${capitalizeString(entityName)}s`
    }

    return `${capitalizeString(entityName)} Modules`;
}

/**
 * Builds the post's links for the specified post.
 *
 * @param postSlug
 * @param postTab
 */
function buildPostLinks(postSlug, postTab) {

    if ( !postTab || !postTab.primaryLinks ) {

        return [];
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
 * @param metaLinksByEntity
 * @param metaTabs
 * @param entity
 * @returns {*}
 */
function buildPostMetadataNavigation(postSlug, metadataSiteMap, metaLinksByEntity, metaTabs, entity) {

    /* Post section. */
    const postSection = buildPostSection(metadataSiteMap);

    /* Post tabs. */
    const postTabs = buildPostTabs("dictionary", metadataSiteMap);

    /* Build dummy "Metadata Dictionary" tab. */
    /* Insert "Metadata Dictionary" tab to post tabs. */
    const metadataDictionaryTab = buildDummyMetadataDictionaryTab(metaLinksByEntity, true);
    postTabs.splice(1, 0, metadataDictionaryTab);

    /* Grab the metaLinks for the post's entity. */
    /* Handles special case for metadata pages. */
    /* Schema's are grouped by schema entity, controlled by a secondary tab menu (unlike regular post navigation). */
    /* e.g. the entity "module", selected by the tab menu, will only display categories and corresponding schema belonging to "module". */
    const metaLinks = metaLinksByEntity.get(entity);

    /* Update the metaLinks with active state. */
    const metadataLinks = getMetaLinksActiveState(postSlug, metaLinks);

    /* Update the metaTabs with active state. */
    const metadataTabs = getMetaTabsActiveState(metaTabs, entity);

    /* Grab the label - matches metadata tab name. */
    const label = buildMetadataTabName(entity);

    return {
        label: label,
        links: metadataLinks,
        section: postSection,
        secondaryTabs: metadataTabs,
        tabKey: "dictionary",
        tabs: postTabs
    }
}

/**
 * Builds the post's navigation.
 *
 * @param postSlug
 * @param postSiteMap
 * @param metaLinksByEntity
 * @returns {{links, section, tabs}}
 */
function buildPostNavigation(postSlug, postSiteMap, metaLinksByEntity) {

    /* Post section. */
    const postSection = buildPostSection(postSiteMap);
    const sectionKey = postSection.key;

    /* Get the post's tab key. */
    const postTabKey = getPostTabKey(postSlug);

    /* Post tabs. */
    const postTabs = buildPostTabs(postTabKey, postSiteMap);

    /* Handle case where post belongs to the section "metadata". */
    /* Build dummy "Metadata Dictionary" tab. */
    if ( sectionKey === "metadata" ) {

        /* Insert "Metadata Dictionary" tab to post tabs. */
        const metadataDictionaryTab = buildDummyMetadataDictionaryTab(metaLinksByEntity);
        postTabs.splice(1, 0, metadataDictionaryTab);
    }

    /* Post tab. */
    const postTab = getPostTab(postTabKey, postSiteMap);

    /* No post tab for this post i.e. no primary links exist. */
    if ( !postTab ) {

        return {}
    }

    /* Post links - post's site map links. */
    const siteMapLinks = buildPostLinks(postSlug, postTab);

    /* Return the built post's navigation. */
    return {
        label: null, /* Not required for markdown posts. */
        links: siteMapLinks,
        secondaryTabs: null, /* Not required for markdown posts. */
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
 * Returns a formatted string with capitalization.
 *
 * @param str
 * @returns {*}
 */
function capitalizeString(str) {

    if ( str && typeof str === "string" ) {

        const [first, ...rest] = [...str];

        return [first.toUpperCase(), ...rest].join("");
    }

    return str;
}

/**
 * Returns the metadata tab's path for the specified tab [entity].
 * Finds the first schema path belonging the specified entity.
 *
 * @param metadataEntityCategorySchemaTitleByKey
 * @param entityName
 */
function findMetadataTabPathByEntity(metadataEntityCategorySchemaTitleByKey, entityName) {

    const [metadataPostKey,] = [...metadataEntityCategorySchemaTitleByKey]
        .find(([metadataPostKey, entityCategorySchemaTitle]) => {

            const [schemaEntity,,] = entityCategorySchemaTitle;
            return schemaEntity === entityName;
        });

    return metadataPostKey;
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
 * Returns the metadata tabs with corresponding active state for the post.
 *
 * @param metaTabs
 * @param entity
 */
function getMetaTabsActiveState(metaTabs, entity) {

    return metaTabs.map(tab => {

        /* Clone tab. */
        const tabClone = Object.assign({}, tab);

        /* Update active state. */
        tabClone.active = tab.key === entity;

        return tabClone;
    })
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
<<<<<<< HEAD
 * Returns the post keys by path for the specified key.
=======
 * Returns the metadata object key-value pair comprising of metadata slug and
 * a string array of schema entity, category and schema title, filtered by entity and category.
 * Filters all schemas that belong to the specified entity.
 *
 * @param metadataEntityCategorySchemaTitleByKey
 * @param entity
 * @param category
 * @returns {Map}
 */
function filterMetadataPostsByEntityCategory(metadataEntityCategorySchemaTitleByKey, entity, category) {

    return new Map([...metadataEntityCategorySchemaTitleByKey].filter(([metadataPostKey, entityCategorySchemaTitle]) => {

        const [schemaEntity, schemaCategory,] = entityCategorySchemaTitle;

        return schemaEntity === entity && schemaCategory === category;
    }));
}

/**
 * Returns true if the link is not on the deny list.
 *
 * @param link
 * @param denyListPostsByKey
 * @returns {*}
 */
function isPostAllowList(link, denyListPostsByKey) {

    return !denyListPostsByKey.has(link.key);
}

module.exports.buildMetadataEntityCategorySchemaTitleByKey = buildMetadataEntityCategorySchemaTitleByKey;
module.exports.buildMetadataLinksByEntity = buildMetadataLinksByEntity;
module.exports.buildMetadataTabs = buildMetadataTabs;
module.exports.getMetadataPostNavigation = getMetadataPostNavigation;
module.exports.getPostNavigation = getPostNavigation;
module.exports.removeDenyListedPosts = removeDenyListedPosts;
