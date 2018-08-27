const _ = require(`lodash`);
const crypto = require(`crypto`);
const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);


async function onCreateNode({ node, getNode, boundActionCreators, loadNodeContent }) {


    const { createNode, createParentChildLink } = boundActionCreators;

    function transformObject(obj, id, type) {
        const objStr = JSON.stringify(obj)
        const contentDigest = crypto
            .createHash(`md5`)
            .update(objStr)
            .digest(`hex`)
        const jsonNode = {
            ...obj,
            id,
            children: [],
            parent: node.id,
            internal: {
                contentDigest,
                type,
            },
        }
        createNode(jsonNode)
        createParentChildLink({ parent: node, child: jsonNode })
    }



    // We only care about JSON content.
    if (node.internal.mediaType !== `application/json`) {
        return
    }

    console.log(node.sourceInstanceName);

    const content = await loadNodeContent(node);
    const parsedContent = JSON.parse(content);


    const relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: ""
    });

    const sections = relativeFilePath.split("/");

    const propertyNames = _.keys(parsedContent.properties);

    const properties = propertyNames.map((name) =>{
        return {
            name: name,
            description: parsedContent.properties[name].description,
            userFriendly: parsedContent.properties[name].user_friendly
        }
    });
    

    const entity = {
        title: parsedContent.title,
        description:parsedContent.description,
        properties: properties,
        relativeFilePath: relativeFilePath,
        schemaType: sections[1], // core, type or module
        coreEntity: sections[2], // core type biomaterial, project,
        category: sections[4] ? sections[3] : ""
    };

    console.log(entity);

    transformObject(
        entity,
        `${node.id}  >>> JSON`,
        "MetadataSchemaEntity");


}

exports.onCreateNode = onCreateNodede = onCreateNode;