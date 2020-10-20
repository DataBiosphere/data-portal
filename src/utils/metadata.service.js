/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating metadata functionality.
 */

// Template variables
const oboLibrary = "://purl.obolibrary.org/obo/";
const ebiLibrary = "://www.ebi.ac.uk/efo/";
const operationLibrary = "://edamontology.org/";

/**
 * Returns the ontology search url.
 *
 * @param restriction
 * @param ontology
 * @returns {string}
 */
export function buildOntologySearchUrl(restriction, ontology) {

    const [curie, identifier] = restriction.split(":");

    if ( ontology ) {

        return `https://www.ebi.ac.uk/ols/ontologies/${identifier}`;
    }

    return buildOntologyTermUrl(curie, identifier);
}

/**
 * Returns the metadata category.
 *
 * @param sitePageId
 * @param allMetadataEntity
 * @returns {void | Array | T | *}
 */
export function getMetadataCategory(sitePageId, allMetadataEntity) {

    const entity = getMetadataEntity(allMetadataEntity);

    return entity.categories.find(category => category.schemas.find(schema => schema.id === sitePageId));
}

/**
 * Returns the metadata entity.
 *
 * @param allMetadataEntity
 * @returns {T}
 */
export function getMetadataEntity(allMetadataEntity) {

    /* Get the entity. */
    return allMetadataEntity.edges.find(entity => entity.node).node;
}

/**
 * Returns the metadata schema.
 *
 * @param category
 * @param sitePageId
 * @param showAllMetadata
 * @returns {void | Array | T | *}
 */
export function getMetadataSchema(category, sitePageId, showAllMetadata) {

    /* Grab the schema. */
    const schema = category.schemas.find(schema => schema.id === sitePageId);

    /* Early exit - return schema with all metadata properties unfiltered. */
    /* Toggle "Show required fields only" is unchecked. */
    if ( showAllMetadata ) {

        return schema;
    }

    /* Filter schema properties for required fields only. */
    const filteredProperties = filterMetadataSchemaProperties(schema.properties);

    /* Clone the schema and update the properties. */
    const schemaClone = Object.assign({}, schema);
    schemaClone.properties = filteredProperties;

    return schemaClone;
}

/**
 * Returns the ontology search term url.
 *
 * @param curie
 * @param identifier
 * @returns {string}
 */
function buildOntologyTermUrl(curie, identifier) {

    const iriLibrary = switchOntologyIriLibrarySearchUrl(curie);
    const ontologyId = curie.concat("_", identifier);
    const ontologySearchTermCurie = switchOntologySearchTermCurie(curie);
    const termSearchStr = encodeURIComponent(`${iriLibrary}${ontologyId}`);

    return `https://www.ebi.ac.uk/ols/ontologies/${ontologySearchTermCurie}/terms?iri=http${termSearchStr}`;
}

/**
 * Returns filtered metadata schema properties to show only required fields.
 * Used when toggle "Show required fields only" is checked.
 *
 * @param properties
 * @returns {*}
 */
function filterMetadataSchemaProperties(properties) {

    /* Handle case when only required metadata properties are rendered. */
    if ( properties ) {

        return properties.filter(property => {

            const {primaryRequired, required} = property || {};

            return primaryRequired && required;
        });
    }

    return [];
}

/**
 * Switches ontology libraries specified by ontology curie.
 *
 * @param curie
 * @returns {*}
 */
function switchOntologyIriLibrarySearchUrl(curie) {

    const value = curie.toLowerCase();

    switch(value) {
        case "data":
            return operationLibrary;
        case "efo":
            return ebiLibrary;
        case "format":
            return operationLibrary;
        default:
            return oboLibrary;
    }
}

/**
 * Switches ontology search term curie for the specified curie.
 *
 * @param curie
 * @returns {*}
 */
function switchOntologySearchTermCurie(curie) {

    const value = curie.toLowerCase();

    switch(value) {
        case "data":
            return "edam";
        case "format":
            return "edam";
        default:
            return value;
    }
}
