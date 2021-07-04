/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for metadata search indexing.
 */

// Core dependencies
const fs = require("fs");
const lunr = require("lunr");
const path = require("path");

// App dependencies
const {
  getPropertyPaths,
  parseArraySpecialCharValues,
  parsePropertyExample,
  parseStrSpecialCharValues
} = require(path.resolve(__dirname, "./metadata-index-field.service.js"));

/**
 * Generates the lunr search index for the metadata.
 *
 * @param properties
 * @param schemas
 */
const generateMetadataIndex = function generateMetadataIndex(
  properties,
  schemas
) {
  /* Add the metadata properties to the search index. */
  const metadataIndex = lunr(function() {
    this.ref("id");
    this.field("classes");
    this.field("description");
    this.field("example");
    this.field("label");
    this.field("name");
    this.field("ontologies");
    this.field("propertyPath");
    this.field("propertyPaths");
    this.field("relations");
    this.field("schemaDescription");
    this.field("schemaName");
    this.field("title");

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    /* Process properties. */
    properties.forEach(property => {
      const classes = parseArraySpecialCharValues(
        property.graphRestriction.classes
      );
      const description = parseStrSpecialCharValues(property.description);
      const id = property.id;
      const label = property.label;
      const name = property.name;
      const ontologies = parseArraySpecialCharValues(
        property.graphRestriction.ontologies
      );
      const propertyExample = parsePropertyExample(property.example);
      const propertyPath = property.propertyPath;
      const propertyPaths = getPropertyPaths(property.propertyPaths);
      const relations = parseArraySpecialCharValues(
        property.graphRestriction.relations
      );

      this.add({
        classes: classes,
        description: description,
        example: propertyExample,
        id: id,
        label: label,
        name: name,
        ontologies: ontologies,
        propertyPath: propertyPath,
        propertyPaths: propertyPaths,
        relations: relations
      });
    });

    /* Process schemas. */
    schemas.forEach(schema => {
      const description = schema.description;
      const id = schema.id;
      const schemaName = schema.schemaName;
      const title = schema.title;

      this.add({
        schemaDescription: description,
        id: id,
        schemaName: schemaName,
        title: title
      });
    });
  });

  fs.writeFileSync("static/metadata-index.json", JSON.stringify(metadataIndex));
};

module.exports.generateMetadataIndex = generateMetadataIndex;
