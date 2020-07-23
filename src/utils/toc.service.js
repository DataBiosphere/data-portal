/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating table of contents functionality.
 */

// App dependencies
import {TOCMetadataQuery} from "../hooks/toc-metadata-query";
import {TOCPageQuery} from "../hooks/toc-page-query";

/**
 * Returns the TOCs.
 *
 * @param docPath
 * @param showAllMetadata
 * @returns {Array}
 */
export function getTOCs(docPath, showAllMetadata) {

    /* Metadata TOC. */
    if ( docPath.startsWith("/metadata/dictionary/" ) && !docPath.includes("metadata-dictionary") ) {

        return buildTOCsMetadata(docPath, showAllMetadata);
    }
    /* Page (markdown) TOC. */
    else {

        return buildTOCsMarkdown(docPath);
    }
}

/**
 * Returns the TOC in FE model.
 *
 * @param anchor
 * @param depth
 * @param name
 * @param required
 * @returns {{anchor: *, level: *, name: *, required: boolean}}
 */
function buildTOC(anchor, depth, name, required = true) {

    return {
        anchor: `#${anchor}`,
        depth: depth,
        name: name,
        required: required
    }
}

/**
 * Returns the pages TOC.
 *
 * @param docPath
 */
function buildTOCsMarkdown(docPath) {

    const tocQuery = TOCPageQuery();

    /* Find the TOC query for the specified path. */
    const tocPage = tocQuery.find(page => page.fields.slug === docPath);

    /* Remove any top level headings. */
    const headings = tocPage.headings.filter(heading => heading.depth !== 1);

    /* Return the TOC. */
    return headings.map(heading => {

        const anchor = getAnchor(heading.value);
        const tocDepth = heading.depth;
        const tocName = heading.value;

        return buildTOC(anchor, tocDepth, tocName);
    });
}

/**
 * Returns the metadata TOC.
 *
 * @param docPath
 * @param showAllMetadata
 * @returns {Array}
 */
function buildTOCsMetadata(docPath, showAllMetadata) {

    const tocQuery = TOCMetadataQuery();

    /* Find the type for the specified path. */
    const tocType = getMetadataType(tocQuery, docPath);

    /* Filter for primary properties and/or show/hide fields. */
    const tocProperties = filterMetadataProperties(tocType, showAllMetadata);

    /* Return the TOC. */
    return getMetadataTOC(tocProperties);
}

/**
 * Returns the TOC anchor built from the TOC name.
 *
 * @param name
 * @returns {string}
 */
function getAnchor(name) {

    const specialCharacters = /[:?.,()]/g;
    const whiteSpace = /\s/g;

    return name.replace(whiteSpace, "-").replace(specialCharacters, "").toLowerCase();
}

/**
 * Returns a built TOC, for each property.
 *
 * @param tocProperties
 */
function getMetadataTOC(tocProperties) {

    return tocProperties.map(property => {

        const anchor = property.anchor;
        const tocDepth = 2;
        let tocName;
        const tocRequired = property.required;

        if ( tocRequired ) {

            tocName = `${property.label} *`;
        }
        else {

            tocName = property.label;
        }

        return buildTOC(anchor, tocDepth, tocName, tocRequired);
    });
}

/**
 * Returns the metadata type for the specified path.
 *
 * @param tocQuery
 * @param docPath
 * @returns {*}
 */
function getMetadataType(tocQuery, docPath) {

    return tocQuery.reduce((acc, core) => {

        const metadataType = core.types.find(type => type.fields.slug === docPath);

        Object.assign(acc, metadataType);

        return acc;
    }, {});
}

/**
 * Returns properties that are primary.
 * If the show all metadata toggle is false, then only properties that are primary and required are returned.
 *
 * @param tocType
 * @param showAllMetadata
 * @returns {Array.<T>}
 */
function filterMetadataProperties(tocType, showAllMetadata) {

    /* Filter to include only the primary properties. */
    /* Filter if the show all metadata toggle is "required" only. */
    return tocType.properties.filter(property => {

        const {primary, primaryRequired} = property;

        if ( showAllMetadata ) {

            return primary;
        }

        return primary && primaryRequired;
    });
}
