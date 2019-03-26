const _ = require(`lodash`);
const crypto = require(`crypto`);
const {createFilePath} = require(`gatsby-source-filesystem`);


async function onCreateNode({node, getNode, actions, loadNodeContent}) {


	const {createNode, createParentChildLink} = actions;

	function transformObject(obj, id, type) {
		const objStr = JSON.stringify(obj);
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
		};
		createNode(jsonNode);
		createParentChildLink({parent: node, child: jsonNode})
	}

	// We only care about JSON content.
	if (node.internal.mediaType !== `application/json`) {
		return
	}

	// We only care about the health check JSON content
	if (!node.relativePath.includes('config.json')) {
		return
	}

	const content = await loadNodeContent(node);
	const parsedContent = JSON.parse(content);
	const systems = parsedContent.systems.map(s => s);

	const relativeFilePath = createFilePath({
		node,
		getNode,
		basePath: ''
	});

	const healthCheck = {
		systems: systems,
		relativeFilePath: relativeFilePath,
	};

	transformObject(
		healthCheck,
		`${node.id}  >>> JSON`,
		'HealthCheck');


}

exports.onCreateNode = onCreateNodede = onCreateNode;
