/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating metadata functionality.
 */

// Template variables
const OntologyId = {
    "EFO": "EFO",
    "HCAO": "HCAO"
};
const OntologyIriLibrary = {
    "DATA": "://edamontology.org/",
    "EFO": "://www.ebi.ac.uk/efo/",
    "FORMAT": "://edamontology.org/",
    "OBO": "://purl.obolibrary.org/obo/"
};

/**
 * Returns the ontology search url.
 *
 * @param ontology
 * @returns {string}
 */
export function buildOntologySearchUrl(ontology = "") {

    if ( ontology ) {

        const [, identifier] = ontology.split(":");

        return `https://www.ebi.ac.uk/ols/ontologies/${identifier}`;
    }

    return "";
}

/**
 * Returns the ontology search term url.
 *
 * @param ontologyId
 * @param restriction
 * @returns {string}
 */
export function buildOntologyTermUrl(ontologyId, restriction = "") {

    if ( ontologyId && restriction ) {

        const identifier = ontologyId.toLowerCase();
        const iriLibrary = getOntologyIriLibrarySearchUrl(restriction);
        const ontology = restriction.replace(":", "_");
        const ontologySearchTermCurie = switchOntologySearchTermCurie(identifier);
        const termSearchStr = encodeURIComponent(`${iriLibrary}${ontology}`);

        return `https://www.ebi.ac.uk/ols/ontologies/${ontologySearchTermCurie}/terms?iri=http${termSearchStr}`;
    }

    return "";
}

/**
 * Returns the metadata schemas, for the specified category.
 *
 * @param metadataTypeEntityCategories
 * @param category
 * @returns {{}}
 */
export function findMetadataTypeEntityCategory(metadataTypeEntityCategories, category) {

    if ( metadataTypeEntityCategories.categories ) {

        return metadataTypeEntityCategories.categories.find(metadataTypeCategory => metadataTypeCategory.categoryName === category);
    }

    return {};
}

/**
 * Returns an ontology identifier.
 * Returns HCAO, and then EFO as the preferred ontology id, if they exist.
 *
 * @param ontologies
 * @returns {string}
 */
export function getOntologyIdentifier(ontologies) {

    /* Initialize ontology Id. */
    let ontologyId = "";

    if ( ontologies ) {

        for ( let ontology of ontologies ) {

            const [,identifier] = ontology.split(":");
            const id = identifier.toUpperCase();

            /* Break and return HCAO ontology. */
            if ( id === OntologyId.HCAO ) {

                ontologyId = id;
                break;
            }

            /* Continue search; maintain EFO ontology. */
            if ( ontologyId === OntologyId.EFO ) {

                continue;
            }

            /* Assign ontology identifier. */
            ontologyId = id;
        }
    }

    return ontologyId;
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
 * Returns the ontology libraries specified by ontology curie.
 *
 * @param restriction
 * @returns {*}
 */
function getOntologyIriLibrarySearchUrl(restriction) {

    if ( restriction ) {

        const [curie,] = restriction.split(":");
        const id = curie.toUpperCase();

        if ( OntologyIriLibrary[id] ) {

            return OntologyIriLibrary[id];
        }
    }

    return OntologyIriLibrary.OBO;
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
