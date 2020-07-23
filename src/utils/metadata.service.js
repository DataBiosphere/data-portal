/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating metadata functionality.
 */

/**
 * Returns the metadata core.
 *
 * @param allMetadataCore
 */
export function getMetadataCore(allMetadataCore) {

    /* Get the core. */
    return allMetadataCore.edges.find(core => core.node).node;
}

/**
 * Returns the metadata type for the specified page id.
 *
 * @param sitePageId
 * @param allMetadataCore
 * @returns {void | Array | T | *}
 */
export function getMetadataType(sitePageId, allMetadataCore) {

    /* Get the core. */
    const core = getMetadataCore(allMetadataCore);

    /* Return the corresponding type. */
    return core.types.find(type => type.id === sitePageId);
}
