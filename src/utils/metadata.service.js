/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating metadata functionality.
 */

// Template variables
const Ontology = {
  EFO: "EFO",
  HCAO: "HCAO",
};
const OntologyLibraryURL = {
  DATA: "http://edamontology.org",
  EFO: "http://www.ebi.ac.uk/efo",
  FORMAT: "http://edamontology.org",
  OBO: "http://purl.obolibrary.org/obo",
};
const OntologyTermIdentifier = {
  "EFO:0000399": "UBERON:0000105",
  "MONDO:0000001": "EFO:0000408",
};
const OntologyTermOntology = {
  "FBbi:00000241": "fbbi",
};

/**
 * Returns the ontology search url.
 *
 * @param ontology
 * @returns {string}
 */
export function buildOntologySearchUrl(ontology = "") {
  if (ontology) {
    const [, identifier] = ontology.split(":");

    return `https://www.ebi.ac.uk/ols/ontologies/${identifier}`;
  }

  return "";
}

/**
 * Returns the ontology term url for the specified identifier.
 *
 * @param ontology
 * @param identifier
 * @returns {string}
 */
export function buildOntologyTermUrl(ontology, identifier = "") {
  if (ontology && identifier) {
    /* Grab the identifier used to build the url. */
    const id = getOntologyTermIdentifier(identifier);

    /* Grab the url variables required to build the url. */
    const ontologyShortName = getOntologyShortName(ontology, identifier);
    const libraryURL = getOntologyTermLibraryURL(id);
    const term = getOntologyTerm(id);
    const iriParam = `${libraryURL}/${term}`;

    return `https://www.ebi.ac.uk/ols/ontologies/${ontologyShortName}/terms?iri=${iriParam}`;
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
export function findMetadataTypeEntityCategory(
  metadataTypeEntityCategories,
  category
) {
  if (metadataTypeEntityCategories.categories) {
    return metadataTypeEntityCategories.categories.find(
      (metadataTypeCategory) => metadataTypeCategory.categoryName === category
    );
  }

  return {};
}

/**
 * Returns the metadata category.
 *
 * @param sitePageId
 * @param entity
 * @returns {void | Array | T | *}
 */
export function getMetadataCategory(sitePageId, entity) {
  return entity.categories.find((category) =>
    category.schemas.find((schema) => schema.id === sitePageId)
  );
}

/**
 * Returns the metadata entity for the specified page id.
 * @param allMetadataEntity
 * @param sitePageId
 * @returns {*}
 */
export function getMetadataEntity(allMetadataEntity, sitePageId) {
  /* Get the entity. */
  return allMetadataEntity.edges
    .map((node) => node.node)
    .find((entity) => {
      return entity.categories.some((category) => {
        return category.schemas.some((schema) => schema.id === sitePageId);
      });
    });
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
  const schema = category.schemas.find((schema) => schema.id === sitePageId);

  /* Early exit - return schema with all metadata properties unfiltered. */
  /* Toggle "Show required fields only" is unchecked. */
  if (showAllMetadata) {
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
 * Returns the preferred, selected ontology identifier from the specified ontologies.
 * Returns HCAO, and then EFO as the preferred ontology id, if they exist.
 *
 * @param ontologies
 * @returns {string}
 */
export function selectPreferredOntologyId(ontologies) {
  /* Initialize ontology Id. */
  let ontologyId = "";

  if (ontologies) {
    for (let ontology of ontologies) {
      const [, identifier] = ontology.split(":");
      const id = identifier.toUpperCase();

      /* Break and return HCAO ontology. */
      if (id === Ontology.HCAO) {
        ontologyId = id;
        break;
      }

      /* Continue search; maintain EFO ontology. */
      if (ontologyId === Ontology.EFO) {
        continue;
      }

      /* Assign ontology identifier. */
      ontologyId = id;
    }
  }

  return ontologyId;
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
  if (properties) {
    return properties.filter((property) => {
      const { primaryRequired, required } = property || {};

      return primaryRequired && required;
    });
  }

  return [];
}

/**
 * Returns a pre-determined ontology id (in short name format) for the specified identifier.
 * If no pre-determined ontology exists, the originally selected ontology is returned.
 * This is a special case for identifier "FBbi:00000241" where the required ontology is "fbbi".
 * "FBbi:00000241" does not currently exist within the "HCAO" ontology.
 *
 * @param ontology
 * @param identifier
 * @returns {*}
 */
function getOntologyShortName(ontology, identifier) {
  /* Grab the ontology term ontology, and return the ontology short name, if it exists. */
  const ontologyTermOntology = OntologyTermOntology[identifier];

  if (ontologyTermOntology) {
    return ontologyTermOntology;
  }

  /* Otherwise, return the originally selected ontology. */
  return ontology.toLowerCase();
}

/**
 * Returns ontology term.
 *
 * @param identifier
 * @returns {*}
 */
function getOntologyTerm(identifier) {
  if (identifier) {
    return identifier.replace(":", "_");
  }

  return "";
}

/**
 * Returns the identifier; switching out any identifier for a different ontology term identifier; if required.
 * Some identifier are not listed in the ontology of choice.
 * These identifier may be cross referenced by another identifier.
 * The temporary fix for these anomalies is to use the cross referenced identifier instead.
 *
 * @param identifier
 * @returns {*}
 */
function getOntologyTermIdentifier(identifier) {
  /* Grab any cross referenced ontology term identifier. */
  const ontologyTermIdentifier = OntologyTermIdentifier[identifier];

  if (ontologyTermIdentifier) {
    return ontologyTermIdentifier;
  }

  /* The identifier is not cross referenced and can be used as is. */
  return identifier;
}

/**
 * Returns the encoded ontology library url.
 *
 * @param identifier
 * @returns {*}
 */
function getOntologyTermLibraryURL(identifier) {
  /* Initialize the library url. */
  let iriLibrary = OntologyLibraryURL.OBO;

  if (identifier) {
    const [curie] = identifier.toUpperCase().split(":");

    /* Grab the library url that corresponds with the curie. */
    if (OntologyLibraryURL[curie]) {
      iriLibrary = OntologyLibraryURL[curie];
    }
  }

  return encodeURIComponent(iriLibrary);
}
