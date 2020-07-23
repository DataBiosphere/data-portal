/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Custom source plugin for formatting metadata JSON into FE-model.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {buildSchemaJSONByPath, buildSetOfTypePaths, getMetadataCores, getMetadataProperties, getMetadataTypes} = require(path.resolve(__dirname, "./metadata.service.js"));

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {

    const { createNode } = actions;

    /* Get all metadata schema JSON. */
    const schemaJSONByPath = await buildSchemaJSONByPath();

    /* Get a set of schemas paths for all metadata schema belonging to "type" entity. */
    const setOfTypePaths = buildSetOfTypePaths(schemaJSONByPath);

    /* Build up the metadata cores. */
    const metadataCores = getMetadataCores(setOfTypePaths);

    /* Build up the metadata types. */
    const metadataTypes = getMetadataTypes(schemaJSONByPath, setOfTypePaths);

    /* Build up the metadata properties. */
    const metadataProperties = getMetadataProperties(schemaJSONByPath, setOfTypePaths);

    /* Create node - metadata cores. */
    metadataCores.forEach(core => {

        const nodeContent = JSON.stringify(core);

        const nodeMeta = {
            id: createNodeId(core.name),
            parent: null,
            children: [],
            internal: {
                type: `MetadataCore`,
                mediaType: `application/json`,
                content: nodeContent,
                contentDigest: createContentDigest(core),
            },
        };

        const node = Object.assign({}, core, nodeMeta);

        createNode(node)
    });

    /* Create node - metadata types. */
    metadataTypes.forEach(type => {

        const nodeContent = JSON.stringify(type);

        const nodeMeta = {
            id: createNodeId(type.name),
            parent: null,
            children: [],
            internal: {
                type: `MetadataType`,
                mediaType: `application/json`,
                content: nodeContent,
                contentDigest: createContentDigest(type),
            },
        };

        const node = Object.assign({}, type, nodeMeta);

        createNode(node)
    });

    /* Create node - metadata properties. */
    metadataProperties.forEach(property => {

        const nodeContent = JSON.stringify(property);

        const nodeMeta = {
            id: createNodeId(`${property.unfriendly}`),
            parent: null,
            children: [],
            internal: {
                type: `MetadataProperty`,
                mediaType: `application/json`,
                content: nodeContent,
                contentDigest: createContentDigest(property),
            },
        };

        const node = Object.assign({}, property, nodeMeta);

        createNode(node)
    });
};

exports.createSchemaCustomization = ({ actions }) => {

    const { createTypes } = actions;

    createTypes(`
    type Fields {
      slug: String!
    }
    type MetadataCore implements Node @dontInfer {
        id: ID!
        name: String!
        types: [MetadataType]
    }
    type MetadataType implements Node @dontInfer {
        id: ID!
        core: MetadataCore @link(by: "name", from: "core")
        description: String
        entity: String
        fields: Fields
        name: String!
        properties: [MetadataProperty]
        relativePath: String!
        required: [String]
        title: String
        unfriendly: String
    }
    type MetadataProperty implements Node @dontInfer {
        id: ID!
        anchor: String
        core: String
        dataType: String
        description: String
        entity: String
        example: String
        grouped: Boolean
        label: String
        name: String!
        primary: Boolean
        primaryRequired: Boolean
        _ref: String
        required: Boolean
        type: MetadataType @link(by: "name", from: "type")
        unfriendly: String
    }`);
};

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        MetadataCore: {
            types: {
                type: ["MetadataType"],
                resolve(source, args, context, info) {
                    return context.nodeModel.runQuery({
                        query: {
                            filter: {
                                core: {
                                    elemMatch: {
                                        name: {
                                            eq: source.name,
                                        },
                                    }
                                }
                            },
                        },
                        type: "MetadataType",
                        firstOnly: false,
                    })
                },
            },
        },
        MetadataType: {
            properties: {
                type: ["MetadataProperty"],
                resolve(source, args, context, info) {
                    return context.nodeModel.runQuery({
                        query: {
                            filter: {
                                type: {
                                    elemMatch: {
                                        name: {
                                            eq: source.name,
                                        },
                                    }
                                }
                            },
                        },
                        type: "MetadataProperty",
                        firstOnly: false,
                    })
                },
            },
        },
    };

    createResolvers(resolvers);
};
