/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Custom source plugin for formatting metadata JSON into FE-model.
 */

// Core dependencies
const path = require('path')

// App dependencies
const {
  buildSchemaJSONByPath,
  getMetadataEntities,
  getMetadataEntityCategories,
  getMetadataSchemas,
  getMetadataSchemaProperties,
  getSetOfMetadataEntities,
  getSchemaFilePathsByRelativePath,
} = require(path.resolve(__dirname, '../utils/metadata.service.js'))
const {
  getCategorySchemas,
  getEntityCategories,
  getFieldTypeUsedBy,
  getSchemaProperties,
} = require(path.resolve(
  __dirname,
  '../utils/metadata-field-extension.service.js'
))
const { generateMetadataIndex } = require(path.resolve(
  __dirname,
  '../utils/metadata-index.service.js'
))

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  /* Get all metadata schema JSON. */
  const schemaJSONByPath = await buildSchemaJSONByPath()

  /* Get all schema paths. */
  const schemaFilePathsByRelativePath = getSchemaFilePathsByRelativePath(
    schemaJSONByPath
  )
  const schemaFilePaths = [...schemaFilePathsByRelativePath.keys()]

  /* Get the set of metadata schema entities. */
  const setOfMetadataEntities = getSetOfMetadataEntities(schemaFilePaths)

  /* Build all metadata schema entities. */
  const metadataEntities = getMetadataEntities(setOfMetadataEntities)

  /* Build all metadata schema entity categories. */
  const metadataEntityCategories = getMetadataEntityCategories(
    schemaFilePaths,
    setOfMetadataEntities
  )

  /* Build all metadata schema. */
  const metadataSchemas = getMetadataSchemas(
    schemaJSONByPath,
    schemaFilePathsByRelativePath
  )

  /* Build all metadata schema properties. */
  const metadataSchemaProperties = getMetadataSchemaProperties(
    schemaJSONByPath,
    schemaFilePathsByRelativePath
  )

  /* Create node - metadata entities. */
  metadataEntities.forEach(entity => {
    const nodeContent = JSON.stringify(entity)

    const nodeMeta = {
      id: createNodeId(entity.entityName),
      parent: null,
      children: [],
      internal: {
        type: `MetadataEntity`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(entity),
      },
    }

    const node = Object.assign({}, entity, nodeMeta)

    createNode(node)
  })

  /* Create node - metadata entity categories. */
  metadataEntityCategories.forEach(entityCategory => {
    const nodeContent = JSON.stringify(entityCategory)

    const nodeMeta = {
      id: createNodeId(
        `${entityCategory.entity}${entityCategory.categoryName}`
      ),
      parent: null,
      children: [],
      internal: {
        type: `MetadataEntityCategory`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(entityCategory),
      },
    }

    const node = Object.assign({}, entityCategory, nodeMeta)

    createNode(node)
  })

  /* Create node - metadata schema. */
  metadataSchemas.forEach(schema => {
    const nodeContent = JSON.stringify(schema)

    const nodeMeta = {
      id: createNodeId(schema.relativePath),
      parent: null,
      children: [],
      internal: {
        type: `MetadataSchema`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(schema),
      },
    }

    const node = Object.assign({}, schema, nodeMeta)

    createNode(node)
  })

  /* Create node - metadata schema properties. */
  metadataSchemaProperties.forEach(schemaProperty => {
    const nodeContent = JSON.stringify(schemaProperty)

    const nodeMeta = {
      id: createNodeId(`${schemaProperty.schema}${schemaProperty.name}`),
      parent: null,
      children: [],
      internal: {
        type: `MetadataSchemaProperty`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(schemaProperty),
      },
    }

    const node = Object.assign({}, schemaProperty, nodeMeta)

    createNode(node)
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  /* Create field "categories" of type MetadataEntityCategory. */
  /* For linking categories to their corresponding entity. */
  createFieldExtension({
    name: 'categories',
    extend(options, prevFieldConfig) {
      return {
        resolve(source, arg, context, info) {
          const categories = context.nodeModel.getAllNodes({
            type: 'MetadataEntityCategory',
          })
          return getEntityCategories(categories, source)
        },
      }
    },
  })

  /* Create field "properties" of type MetadataSchemaProperty. */
  /* For linking properties to their corresponding schema. */
  createFieldExtension({
    name: 'properties',
    extend(options, prevFieldConfig) {
      return {
        resolve(source, arg, context, info) {
          const properties = context.nodeModel.getAllNodes({
            type: 'MetadataSchemaProperty',
          })
          return getSchemaProperties(properties, source)
        },
      }
    },
  })

  /* Create field "schemas" of type MetadataSchema. */
  /* For linking schemas to their corresponding entity and category. */
  createFieldExtension({
    name: 'schemas',
    extend(options, prevFieldConfig) {
      return {
        resolve(source, arg, context, info) {
          const schemas = context.nodeModel.getAllNodes({
            type: 'MetadataSchema',
          })
          return getCategorySchemas(schemas, source)
        },
      }
    },
  })

  /* Create field "usedByProperties" of type [UsedByProperties]. */
  /* Builds field that lists any properties that use the specified schema. */
  createFieldExtension({
    name: 'usedByProperties',
    extend(options, prevFieldConfig) {
      return {
        resolve(source, arg, context, info) {
          const metadataSchemaProperties = context.nodeModel.getAllNodes({
            type: 'MetadataSchemaProperty',
          })
          return getFieldTypeUsedBy(metadataSchemaProperties, source)
        },
      }
    },
  })

  createTypes(`
    type Fields {
      slug: String!
    }
    type GraphRestriction implements Node @dontInfer {
        classes: [String]
        direct: Boolean
        includeSelf: Boolean
        ontologies: [String]
        relations: [String]
    }
    type MetadataEntity implements Node @dontInfer {
        id: ID!
        entityName: String!
        categories: [MetadataEntityCategory] @categories
    }
    type MetadataEntityCategory implements Node @dontInfer {
        id: ID!
        categoryName: String
        entity: MetadataEntity @link(by: "entityName", from: "entity")
        schemas: [MetadataSchema] @schemas
    }
    type MetadataSchema implements Node @dontInfer {
        id: ID!
        category: String
        description: String
        entity: String
        fields: Fields
        properties: [MetadataSchemaProperty] @properties
        relativePath: String!
        requiredProperties: [String]
        schemaName: String
        schemaPath: String
        title: String
        type: String
        urlGitHub: String
        urlTo: String
        usedByProperties: [MetadataSchemaProperty] @usedByProperties
    }
    type MetadataSchemaProperty implements Node @dontInfer {
        id: ID!
        anchor: String
        dataType: String
        description: String
        example: String
        graphRestriction: GraphRestriction
        label: String
        name: String
        primary: Boolean
        primaryRequired: Boolean
        propertyFriendlies: [String]
        propertyFrom: String
        propertyFromLink: String
        propertyPath: String
        propertyPaths: [String]
        _ref: String
        referenceFrom: String
        referenceFromLink: String
        relativePath: String
        required: Boolean
        schema: MetadataSchema @link(by: "schemaName", from: "schema")
        type: String
        urlTo: String
    }`)
}

exports.onPostBootstrap = ({ getNodesByType }) => {
  /* Get the properties. */
  const properties = getNodesByType('MetadataSchemaProperty')

  /* Get the schemas. */
  const schemas = getNodesByType('MetadataSchema')

  /* Generate the metadata search index. */
  generateMetadataIndex(properties, schemas)
}
