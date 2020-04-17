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
			myPath: node.relativeFilePath,
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

	// We only care about the metadata JSON content
	if (node.relativePath.includes('config.json')) {
		return
	}

	// We only want the JSON from hca metadata json-schema
	if (node.sourceInstanceName === 'markdown-pages') {
		return
	}

	const content = await loadNodeContent(node);
	const parsedContent = JSON.parse(content);

	const relativeFilePath = createFilePath({
		node,
		getNode,
		basePath: ''
	});

	const sections = relativeFilePath.split('/');
	const coreEntity = sections[2];

	if ( !coreEntity ) {

		return
	}

	const propertyNames = _.keys(parsedContent.properties);

	const definitionTaskPropertyNames = parsedContent.definitions ? parsedContent.definitions.task ? _.keys(parsedContent.definitions.task.properties) : '' : '';
	const definitionParameterPropertyNames = parsedContent.definitions ? parsedContent.definitions.parameter ? _.keys(parsedContent.definitions.parameter.properties) : '' : '';

	// Get properties of each element
	// Excluded properties from each type json
	const excludedProperties = ['describedBy', 'schema_version', 'schema_type'];
	const properties = propertyNames.filter(name => !excludedProperties.includes(name)).map(name => {

		// stringify properties.example
		// gatsby infers type on build and chooses type based on first read - graphiql cannot handle a field of differing type
		parsedContent.properties[name].example = JSON.stringify(parsedContent.properties[name].example);

		return {
			name: name,
			properties: parsedContent.properties[name]
		}
	});

	// Get definition/task if it exists in json (e.g. https://github.com/HumanCellAtlas/metadata-schema/blob/master/json_schema/type/process/analysis/analysis_process.json)
	const definitionTaskProperties = definitionTaskPropertyNames ? definitionTaskPropertyNames.map(name => {
		return {
			name: name,
			type: parsedContent.definitions.task.properties[name].type ? parsedContent.definitions.task.properties[name].type : ''
		}
	}) : '';

	// Get definition/parameter if it exists in json (e.g. https://github.com/HumanCellAtlas/metadata-schema/blob/master/json_schema/type/process/analysis/analysis_process.json)
	const definitionParameterProperties = definitionParameterPropertyNames ? definitionParameterPropertyNames.map(name => {
		return {
			name: name,
			type: parsedContent.definitions.parameter.properties[name].type ? parsedContent.definitions.parameter.properties[name].type : '',
			description: parsedContent.definitions.parameter.properties[name].description ? parsedContent.definitions.parameter.properties[name].description : ''
		}
	}) : '';

	let definitions;

	if (parsedContent.definitions && parsedContent.definitions.task) {

		definitions = {
			task: {
				required: parsedContent.definitions.task.required,
				type: parsedContent.definitions.task.type,
				properties: definitionTaskProperties
			},
			parameter: {
				required: parsedContent.definitions.parameter.required,
				type: parsedContent.definitions.parameter.type,
				properties: definitionParameterProperties
			}
		};
	}

	const entity = {
		coreEntity: coreEntity, // core type biomaterial, project,
		description: parsedContent.description,
		name: parsedContent.name,
		type: parsedContent.type,
		definitions: definitions,
		properties: properties,
		relativeFilePath: relativeFilePath,
		required: parsedContent.required,
		schemaType: sections[1], // core, type or module
		title: parsedContent.title
	};

	transformObject(
		entity,
		`${node.id}  >>> JSON`,
		'MetadataSchemaEntity');


}

exports.onCreateNode = onCreateNodede = onCreateNode;
