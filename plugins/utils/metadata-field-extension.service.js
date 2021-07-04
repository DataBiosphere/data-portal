/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for metadata field extension.
 */

/**
 * Returns the schemas for the specified entity and category.
 *
 * @param schemas
 * @param category
 */
const getCategorySchemas = function getCategorySchemas(schemas, category) {
  /* Filter the schemas for the specified category and entity. */
  return schemas.filter(schema => {
    return (
      schema.entity === category.entity &&
      schema.category === category.categoryName
    );
  });
};

/**
 * Returns the categories for the specified entity.
 *
 * @param categories
 * @param entity
 */
const getEntityCategories = function getEntityCategories(categories, entity) {
  /* Filter the categories for the specified entity. */
  return categories.filter(category => category.entity === entity.entityName);
};

/**
 * Returns the field usedByProperties comprising of any properties that refer to the specified schema.
 * usedByProperties returns the full property path, and corresponding page link.
 * e.g. "cell_line.cell_morphology" and "cell_suspension.cell_morphology" refer to the schema
 * "module/biomaterial/cell_morphology.json". Both "cell_line.cell_morphology" and "cell_suspension.cell_morphology"
 * will be returned with their corresponding page slug.
 *
 * @param metadataSchemaProperties
 * @param schema
 */
const getFieldTypeUsedBy = function getFieldTypeUsedBy(
  metadataSchemaProperties,
  schema
) {
  /* Grab the schema path. */
  const schemaPath = schema.schemaPath;

  /* Filter the schema properties for any that refer to the schema path. */
  /* Return the corresponding property paths that refer to the schema path. */
  return metadataSchemaProperties
    .filter(property => property._ref === schemaPath)
    .reduce((acc, property) => {
      /* Only add the property, if it is primary */
      /* This eliminates "nested" referenced properties and maintains a clear pathway on property usage. */
      /* i.e. although "cell_line.cell_morphology.cell_size_unit.ontology" references the ontology module "length_unit_ontology",
            /* when viewing this ontology module, we do not wish to see the path "cell_line.cell_morphology.cell_size_unit",
            /* rather only "cell_morphology.cell_size_unit". This will allow the user to navigate back to the module
            /* "cell_morphology" and then from here back to the type "cell_line". */
      if (property.primary) {
        acc.push(property);
      }

      return acc;
    }, []);
};

/**
 * Returns the properties for the specified schema.
 *
 * @param properties
 * @param schema
 */
const getSchemaProperties = function getSchemaProperties(properties, schema) {
  /* Filter the properties for the specified schema. */
  return properties.filter(property => property.schema === schema.schemaName);
};

/**
 * Returns the type for the specified property.
 *
 * @param types
 * @param property
 * @returns {*}
 */
function findType(types, property) {
  if (types) {
    return types.find(type => type.name === property.type);
  }

  return {};
}

module.exports.getCategorySchemas = getCategorySchemas;
module.exports.getEntityCategories = getEntityCategories;
module.exports.getFieldTypeUsedBy = getFieldTypeUsedBy;
module.exports.getSchemaProperties = getSchemaProperties;
