const _ = require(`lodash`);
const crypto = require(`crypto`);
const path = require(`path`);

async function onCreateNode({ node, actions, loadNodeContent, createNodeId }) {



    function transformObject(obj, id, type) {
        const objStr = JSON.stringify(obj);
        console.log(objStr);
        const contentDigest = crypto
            .createHash(`md5`)
            .update(objStr)
            .digest(`hex`);
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
        createNode(jsonNode);
        createParentChildLink({ parent: node, child: jsonNode });
    }


    // We only care about JSON content.
    if (node.internal.mediaType !== `application/json`) {
        return;
    }



   // const { createNode, createParentChildLink } = actions;



    const content = await loadNodeContent(node);
    const parsedContent = JSON.parse(content);
    const properties = parsedContent.properties;

    console.log(properties);

    console.log( _.upperFirst(_.camelCase(`${node.name} Json`)));

    if (_.isArray(properties)) {
        properties.forEach((obj, i) => {
            console.log(obj);
            transformObject(
                obj,
                obj.id ? obj.id : createNodeId(`${node.id} [${i}] >>> JSON`),
                _.upperFirst(_.camelCase(`${node.name} Json`))
            )
        });
    }else{
        console.log(parsedContent);
    }

}

exports.onCreateNode = onCreateNode;