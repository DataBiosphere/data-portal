const _ = require(`lodash`);
const crypto = require(`crypto`);
const {createFilePath} = require(`gatsby-source-filesystem`);


async function onCreateNode({node, getNode, actions, loadNodeContent}) {


	const {createNode, createParentChildLink} = actions;

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
		createParentChildLink({parent: node, child: jsonNode})
	}


	// We only care about JSON content.
	if (node.internal.mediaType !== `application/json`) {
		return
	}


	const content = await loadNodeContent(node);
	const parsedContent = JSON.parse(content);


	const relativeFilePath = createFilePath({
		node,
		getNode,
		basePath: ''
	});

	function removeFileType(ref) {
		return ref.split('.json')[0];
	}

	function splitRef(ref) {
		let regex = /_/g;
		let splitRef = ref.split('/');

		return splitRef[splitRef.length - 1].split('.')[0].replace(regex, ' ');
	}

	const sections = relativeFilePath.split('/');

	const propertyNames = _.keys(parsedContent.properties);
	const requiredProperties = parsedContent.required || [];

	const properties = propertyNames.map((name) => {
		return {
			name: name,
			description: parsedContent.properties[name].description,
			arrayModuleRef: parsedContent.properties[name].items ? parsedContent.properties[name].items.$ref ? removeFileType(parsedContent.properties[name].items.$ref) : '' : '',
			arrayName: parsedContent.properties[name].items ? parsedContent.properties[name].items.$ref ? splitRef(parsedContent.properties[name].items.$ref) : '' : '',
			arrayType: parsedContent.properties[name].items ? parsedContent.properties[name].items.type : '',
			objectModuleRef: parsedContent.properties[name].$ref ? removeFileType(parsedContent.properties[name].$ref) : '',
			objectName: parsedContent.properties[name].$ref ? splitRef(parsedContent.properties[name].$ref) : '',
			required: requiredProperties.includes(name),
			type: parsedContent.properties[name].type,
			userFriendly: parsedContent.properties[name].user_friendly
		}
	});


	const entity = {
		title: parsedContent.title,
		description: parsedContent.description,
		properties: properties,
		relativeFilePath: relativeFilePath,
		schemaType: sections[1], // core, type or module
		coreEntity: sections[2], // core type biomaterial, project,
		category: sections[4] ? sections[3] : ''
	};

	transformObject(
		entity,
		`${node.id}  >>> HC`,
		'HealthCheck');


}

exports.onCreateNode = onCreateNodede = onCreateNode;
