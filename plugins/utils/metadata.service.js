/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for formatting metadata JSON into FE model.
 */

// Core dependencies
const fs = require("fs");
const path = require("path");

// Template variables
const denyProperties = ["describedBy", "schema_version", "schema_type"];
const denySchemaFilePaths = ["property_migrations.json", "versions.json"];
const EntityDescription = {
    "CORE": "Core entities are those that apply to 100% of all entities and are highly stable. Example Core fields include those for IDs and accessions. Core fields are inherited by Type entities.",
    "MODULE": "Module entities contribute groups of fields with a specific theme to one or more type entities.",
    "SYSTEM": "System entities ...",
    "TYPE": "Type entities model the different classes of artifacts composing an experiment. Type entities ingerit properties from their corresponding core entity."
};
const metadataJsonPath = getMetadataJSONPath();
const urlGitHubPrefix = "https://github.com/HumanCellAtlas/metadata-schema/blob/master/json_schema";

/**
 * Returns a map object of schema JSON and relative path.
 *
 * @returns {Promise.<*>}
 */
const buildSchemaJSONByPath = async function buildSchemaJSONByPath() {

    return await mapSchemaJSONByPath(metadataJsonPath);
};

/**
 * Returns the metadata entities.
 * e.g. top level folders such as "core", "module", "system", "type".
 * Metadata fields are divided into three major entities: Core, Type, and Module.
 * see https://github.com/HumanCellAtlas/metadata-schema/tree/master/json_schema#schema-structure-overview
 *
 * @param setOfMetadataEntities
 * @returns {Array}
 */
const getMetadataEntities = function getMetadataEntities(setOfMetadataEntities) {

    /* Return the entities. */
    return [...setOfMetadataEntities].map(entity => buildFEModelEntity(entity));
};

/**
 * Returns the metadata entity categories.
 * e.g. second level folders such as "biomaterial", "process", "project", "file" etc.
 * Metadata entities are grouped into categories.
 * see https://github.com/HumanCellAtlas/metadata-schema/tree/master/json_schema#schema-structure-overview
 *
 * @param schemaFilePaths
 * @param setOfMetadataEntities
 */
const getMetadataEntityCategories = function getMetadataEntityCategories(schemaFilePaths, setOfMetadataEntities) {

    /* Return the categories. */
    return [...setOfMetadataEntities].reduce((acc, entity) => {

        /* Grab the set of categories for the specified entity. */
        const setOfCategories = getSetOfCategories(schemaFilePaths, entity);

        /* Sort the set of categories by alpha. */
        const sortedCategories = [...setOfCategories].sort();

        /* For each category, build the entity category FE model. */
        sortedCategories.map(category => acc.push(buildFEModelEntityCategory(entity, category)));

        return acc;
    }, []);
};

/**
 * Returns the metadata schema.
 * e.g. schema details like name, description, title...
 *
 * @param schemaJSONByPath
 * @param schemaFilePathsByRelativePath
 * @returns {Array}
 */
const getMetadataSchemas = function getMetadataSchemas(schemaJSONByPath, schemaFilePathsByRelativePath) {

    /* Returns all schema. */
    return [...schemaJSONByPath].map(([schemaFilePath, schemaJSON]) => {

        /* Grab the corresponding relative path for the schema. */
        const schemaRelativePath = schemaFilePathsByRelativePath.get(schemaFilePath);

        return buildFEModelSchema(schemaFilePath, schemaRelativePath, schemaJSON);
    });
};

/**
 * Returns the metadata schema properties.
 * e.g. property details like property name, description, data type...
 *
 * @param schemaJSONByPath
 * @param schemaFilePathsByRelativePath
 * @returns {*}
 */
const getMetadataSchemaProperties = function getMetadataSchemaProperties(schemaJSONByPath, schemaFilePathsByRelativePath) {

    /* Returns all schema properties. */
    return [...schemaJSONByPath].reduce((acc, [schemaFilePath, schemaJSON]) => {

        /* Create the propertyPaths field, starting with schema name. */
        /* This will be added to with property names and will help build the property anchor field. */
        const propertyPaths = [schemaJSON.name];

        /* Grab the top level schema name. */
        const schemaName = schemaJSON.name;

        return acc.concat(processSchemaProperties(schemaName, schemaJSON, schemaFilePath, schemaJSONByPath, schemaFilePathsByRelativePath, propertyPaths, schemaFilePath));
    }, []);
};

/**
 * Returns a complete map object with key value pairs of schemaJSONPath and schemaRelativePath.
 * Allows for a single point of reference to the schema's FE relative path;
 * for use when generating the MetadataSchema and MetadataSchemaProperty graphql.
 *
 * @param schemaJSONByPath
 * @returns {[null]}
 */
const getSchemaFilePathsByRelativePath = function getSchemaFilePathsByRelativePath(schemaJSONByPath) {

    /* Get all schema paths. */
    const schemaJSONPaths = [...schemaJSONByPath.keys()];

    return schemaJSONPaths.reduce((acc, schemaJSONPath) => {

        /* Grab the schema. */
        const schemaJSON = schemaJSONByPath.get(schemaJSONPath);
        const schemaJSONName = schemaJSON.name;

        /* Build the string array of schema's paths from entity, category and schema name. */
        const schemaPaths = getSchemaPaths(schemaJSONPath, schemaJSONName);

        /* Create relative path. */
        /* Required for gatsby-node.js createFilePath function (specifically, the creation of slug). */
        const schemaRelativePath = getSchemaRelativePath(schemaPaths);

        acc.set(schemaJSONPath, schemaRelativePath);

        return acc;
    }, new Map());
};

/**
 * Returns a set of metadata entries.
 *
 * @param schemaFilePaths
 * @returns {Set}
 */
const getSetOfMetadataEntities = function getSetOfMetadataEntities(schemaFilePaths) {

    return new Set(schemaFilePaths.map(schemaFilePath => getSchemaSource(schemaFilePath)));
};

/**
 * Builds up the entity into a FE-compatible model.
 *
 * @param entity
 * @returns {{entityName: *}}
 */
function buildFEModelEntity(entity) {

    const entityName = entity.toUpperCase();

    return {
        entityDescription: EntityDescription[entityName],
        entityName: entity
    };
}

/**
 * Builds up the entity category into a FE-compatible model.
 * If category is undefined, leave blank. Handles case where an entity is not grouped into categories
 * e.g. the entity "system".
 *
 * @param entity
 * @param category
 * @returns {{categoryName: string, entityName: *}}
 */
function buildFEModelEntityCategory(entity, category = "") {

    return {
        categoryName: category,
        entity: entity
    }
}

/**
 * Build up the schema with reference to the schema's category and entity into a FE-compatible model.
 * e.g. each schema belongs to an entity "module", "core", "type" and a category within the entity "biomaterial".
 * https://github.com/HumanCellAtlas/metadata-schema/tree/master/json_schema#schema-structure-rules
 *
 * @param schemaFilePath
 * @param schemaRelativePath
 * @param schemaJSON
 * @returns {{category: string, description, entity: string, relativePath: string, required: Array, schemaName: string, schemaPaths: (string|string|string)[], title, urlMetadataDictionary: string, urlGitHub: string}}
 */
function buildFEModelSchema(schemaFilePath, schemaRelativePath, schemaJSON) {

    /* Grab the schema's entity, category and name from the file path. */
    /* Provides schema full path history. */
    const schemaPaths = getSchemaPaths(schemaFilePath, schemaJSON.name);
    const [entity, category, schemaName] = schemaPaths;

    /* Create the github url for the schema. */
    /* Provides each schema with a link to its original source. */
    const urlGitHub = `${urlGitHubPrefix}/${schemaFilePath}`;

    /* Created required field - remove deny listed properties. */
    const requiredProperties = filterRequiredProperties(schemaJSON);

    return {
        category: category,
        description: schemaJSON.description,
        entity: entity,
        relativePath: schemaRelativePath,
        requiredProperties: requiredProperties,
        schemaName: schemaName,
        schemaPath: schemaFilePath,
        title: schemaJSON.title,
        type: "schema",
        urlGitHub: urlGitHub,
        urlTo: schemaRelativePath
    }
}

/**
 * Built up the schema's properties into a FE-compatible model.
 * e.g. "Catalog URL" from biomaterial.cell_line.catalog_url
 *
 * Incorporates (and flattens) any schema property fields referencing other schemas such as in the entity "modules" or "core".
 * e.g. The property "Cell cycle" from biomaterial.cell_line.cell_cycle references module "module/ontology/cell_cycle_ontology.json".
 *
 * @param schemaName
 * @param schemaJSON
 * @param schemaFilePath
 * @param propertyNames
 * @param requiredProperties
 * @param schemaJSONByPath
 * @param schemaFilePathsByRelativePath
 * @param propPaths
 * @param propPrimaryFilePath
 * @param propPrimary
 * @param propPrimaryRequired
 */
function buildFEModelSchemaProperties(schemaName, schemaJSON, schemaFilePath, propertyNames, requiredProperties, schemaJSONByPath, schemaFilePathsByRelativePath, propPaths, propPrimaryFilePath, propPrimary, propPrimaryRequired) {

    /* Build the properties. */
    const properties = propertyNames.map(propertyName => {

        /* Get the property JSON. */
        const propertyJSON = schemaJSON.properties[propertyName];

        const {description, user_friendly} = propertyJSON || {};

        /* Create property fields. */
        /* Fields are DP metadata specific fields - used by the metadata pages. */
        const propertyPaths = getPropertyPaths(propPaths, propertyName);
        const propertyPath = propertyPaths.join(".");
        const anchor = getPropertyAnchor(propertyPaths); /* TODO. */
        const example = getPropertyExample(propertyJSON);
        const graphRestriction = getPropertyGraphRestriction(propertyJSON);
        const label = user_friendly || propertyName;
        const name = getPropertyName(propertyPaths);
        const propertyFrom = schemaJSON.name;
        const propertyFromLink = getPropertyFromLink(schemaFilePath, schemaFilePathsByRelativePath);
        const _ref = getPropertyReference(propertyJSON);
        const reference = buildPropertyReference(_ref, schemaFilePathsByRelativePath);
        const relativePath = schemaFilePathsByRelativePath.get(propPrimaryFilePath);
        const dataType = getPropertyDataType(propertyJSON, reference);
        const required = requiredProperties.includes(propertyName);
        const primaryRequired = getPropertyPrimaryRequired(propPrimary, required, propPrimaryRequired);

        /* Build the property JSON. */
        return {
            anchor: anchor,
            dataType: dataType,
            description: description,
            example: example,
            graphRestriction: graphRestriction,
            label: label,
            name: name,
            primary: propPrimary,
            primaryRequired: primaryRequired,
            propertyFrom: propertyFrom,
            propertyFromLink: propertyFromLink,
            propertyPath: propertyPath,
            propertyPaths: propertyPaths,
            _ref: _ref,
            referenceFrom: reference.referenceFrom,
            referenceFromLink: reference.referenceFromLink,
            relativePath: relativePath,
            required: required,
            schema: schemaName,
            type: "property",
            urlTo: `${relativePath}#${anchor}`
        };
    });

    /* Sort properties, alpha non-referenced first, then alpha referenced. */
    const sortedProperties = sortSchemaProperties(properties);

    /* Insert any referenced properties. */
    return insertReferencedProperties(sortedProperties, schemaName, schemaJSONByPath, schemaFilePathsByRelativePath, propPrimaryFilePath);
}

/**
 * Returns the property reference field - DP metadata specific field for the metadata pages.
 * Comprises of path and reference schema name for the referenced property.
 * e.g. any property that references "core/biomaterial/biomaterial_core.json" will be coupled with
 * the biomaterial_core schema from the entity "core".
 *
 * @param _ref
 * @param schemaFilePathsByRelativePath
 * @returns {*}
 */
function buildPropertyReference(_ref, schemaFilePathsByRelativePath) {

    if ( _ref ) {

        /* Handle case where _ref is an internal reference. */
        const [refPath,] = _ref.split("#");

        /* Grab the reference schema's relative path. */
        const schemaPath = schemaFilePathsByRelativePath.get(refPath);

        /* Grab the schema name - schema path should exist - initialize schemaName as precaution. */
        let schemaName = "";

        if ( schemaPath ) {

            schemaName = schemaPath.split("/").pop();
        }

        return {
            referenceFrom: schemaName,
            referenceFromLink: schemaPath
        }
    }

    return {};
}

/**
 * Returns required properties, excluding properties from the deny list.
 *
 * @param schemaJSON
 * @returns {Array}
 */
function filterRequiredProperties(schemaJSON) {

    if ( schemaJSON && schemaJSON.required ) {

        return schemaJSON.required.filter(property => !denyProperties.includes(property));
    }

    return [];
}

/**
 * Generates JSON for the specified file.
 *
 * @param filePath
 * @returns {Promise.<void>}
 */
async function generateJSON(filePath) {

    const content = await fs.readFileSync(filePath);

    return await JSON.parse(content);
}

/**
 * Returns the metadata JSON path specified by gatsby environment.
 *
 * @returns {string}
 */
function getMetadataJSONPath() {

    if ( process.env.GATSBY_ENV === "LOCAL" ) {

        return path.resolve(__dirname, "../../../hca-metadata-schema/json_schema");
    }

    return path.resolve(__dirname, "../../_metadata-schema/json_schema");
}

/**
 * Returns the property anchor field, built from the propertyPaths field.
 * Omits the schema name e.g. the property "lot_number" from schema "cell_line"
 * has a property path "cell_line.lot_number". The anchor value returned will be "lot_number".
 *
 * @param propertyPaths
 */
function getPropertyAnchor(propertyPaths) {

    const [, ...propPaths] = propertyPaths;

    return propPaths.join("-");
}

/**
 * Returns the property data type field - DP metadata specific field for the metadata pages.
 *
 * @param propertyJSON
 * @param reference
 * @returns {*}
 */
function getPropertyDataType(propertyJSON, reference) {

    /* If the property JSON references another schema, return the referenced schema as the type. */
    if ( reference ) {

        const {referenceFrom} = reference || {};

        if ( referenceFrom ) {

            return referenceFrom;
        }
    }

    const {enum: propertyEnum, items, type} = propertyJSON || {};

    let dataType = "";

    if ( type ) {

        dataType = type;
    }
    else if ( items && items.$ref ) {

        if ( items.type ) {

            dataType = items.type;
        }
    }

    if ( propertyEnum ) {

        return `${dataType} enum`;
    }

    return dataType;
}

/**
 * Returns a string for the property example or enum - DP metadata specific field for the metadata pages.
 *
 * @param propertyJSON
 * @returns {string}
 */
function getPropertyExample(propertyJSON) {

    const {enum: propertyEnum, example: propertyExample} = propertyJSON || {};

    let example, precedingText;

    if ( propertyEnum ) {

        example = propertyEnum;
        precedingText = "Should be one of:";
    }

    if ( JSON.stringify(propertyExample) ) {

        if ( !propertyEnum ) {

            /* Stringify the property field example prior to processing. */
            const regex = /"/g;
            example = JSON.stringify(propertyExample).replace(regex, "").split("; ");
            precedingText = "For example";
        }
    }

    if ( !example ) {

        return "";
    }

    /* Return string for property enum or example. */
    const count = example.length - 1;

    return example.map((e, i) => {

        if ( i === 0 ) {

            return `${precedingText} "${e}"`;
        }

        if ( i !== count ) {

            return `, "${e}"`;
        }

        return ` or "${e}"`;
        }).join("").concat(".");
}

/**
 * Returns the schema's relative path.
 *
 * @param schemaFilePath
 * @param schemaFilePathsByRelativePath
 */
function getPropertyFromLink(schemaFilePath, schemaFilePathsByRelativePath) {

    /* Handles case where schemaFilePath includes an internal reference. */
    /* e.g. "type/process/analysis/analysis_process.json#/definitions/task". */
    const [filePath,] = schemaFilePath.split("#");

    return schemaFilePathsByRelativePath.get(filePath);
}

/**
 * Returns the graph restrictions for the specified property - DP metadata specific field for the metadata pages.
 *
 * @param propertyJSON
 * @returns {{classes, direct, includeSelf, ontologies, relations}}
 */
function getPropertyGraphRestriction(propertyJSON) {

    const {graph_restriction} = propertyJSON || {},
        {classes, direct, include_self, ontologies, relations} = graph_restriction || {};

    return {
        classes: classes,
        direct: direct,
        includeSelf: include_self,
        ontologies: ontologies,
        relations: relations
    }
}

/**
 * Returns the full property name.
 * The full property path, excluding the schema name is returned.
 * i.e. the referenced property "cell_line.cell_morphology.cell_size" returns a property name
 * of "cell_morphology.cell_size".
 *
 * @param propertyPaths
 */
function getPropertyName(propertyPaths) {

    const [, ...propPaths] = propertyPaths;

    return propPaths.join(".");
}

/**
 * Create the propertyPaths field - DP metadata specific field required for metadata "path".
 * Provides schema full path history.
 * e.g. for the schema "cell_line" the associated property "lot_number"
 * the value returned will be ["cell_line", "catalog_url"].
 *
 * @param propertyPaths
 * @param propertyName
 * @returns {Array}
 */
function getPropertyPaths(propertyPaths, propertyName) {

    if ( propertyPaths ) {

        return propertyPaths.concat(propertyName);
    }

    return propertyName;
}

/**
 * Returns the primaryRequired field for the property - DP metadata specific field for the metadata pages.
 * Provides a boolean for the toggle of show/hide required properties.
 * e.g. When toggle is "show only required properties", secondary and tertiary "required" properties will be hidden
 * if their corresponding primary property is not "required".
 * Secondary and tertiary properties inherit the primary property's primaryRequired field.
 *
 * @param primary
 * @param required
 * @param primaryShowRequired
 * @returns {*}
 */
function getPropertyPrimaryRequired(primary, required, primaryShowRequired) {

    /* Primary schema - return required value. */
    if ( primary ) {

        return required;
    }

    /* Secondary and or tertiary schema will return the value of its primary schema. */
    return primaryShowRequired;
}

/**
 * Returns the property reference field - if it exists.
 *
 * @param propertyJSON
 * @returns {*}
 */
function getPropertyReference(propertyJSON) {

    const {items, $ref} = propertyJSON || {};

    if ( $ref ) {

        return $ref;
    }

    if ( items && items.$ref ) {

        return items.$ref;
    }

    return "";
}

/**
 * Returns the schema's category.
 * e.g. "biomaterial", "process".
 *
 * @param schemaFileRelativePath
 * @returns {*}
 */
function getSchemaCategory(schemaFileRelativePath) {

    const category = schemaFileRelativePath.split("/")[1];

    /* Return category if it isn't a JSON file. */
    /* Handles case where an entity is not grouped by categories e.g. the entity "system". */
    if ( category.endsWith(".json") ) {

        return "";
    }

    return category;
}

/**
 * Returns the schema's entity.
 * e.g. "module", "core", "type", "system".
 *
 * @param schemaFileRelativePath
 * @returns {*}
 */
function getSchemaEntity(schemaFileRelativePath) {

    return schemaFileRelativePath.split("/")[0];
}

/**
 * Returns the schema as JSON for the specified path.
 * Handles special case where the specified path may include an internal reference to
 * properties within a JSON file. In this instance, the internal properties are packaged up similiar to a typical
 * metadata schema JSON file for ease of further processing of such properties.
 *
 * @param schemaFilePath
 * @param schemaJSONByPath
 * @returns {*}
 */
function getSchemaJSON(schemaFilePath, schemaJSONByPath) {

    if ( schemaFilePath ) {

        const [schemaPath, schemaInternalRef] = schemaFilePath.split("#");

        /* Get the corresponding schema JSON, for the specified path. */
        const schemaJSON = schemaJSONByPath.get(schemaPath);

        /* If an internal file reference exists, build and return the schema JSON for the reference.
        /* e.g. see https://github.com/HumanCellAtlas/metadata-schema/blob/master/json_schema/type/process/analysis/analysis_process.json.
        /* The schema references itself (see property "tasks") e.g. where "$ref": "type/process/analysis/analysis_process.json#/definitions/task".
        /* The internal reference provides element "breadcrumbs" e.g. breadcrumbs for the example above are the keys "definitions" and "task". */
        if ( schemaInternalRef ) {

            /* Get the internal path as an array. e.g. /definitions/task --> ["definitions", "task"]. */
            const breadcrumbs = schemaInternalRef.trim().slice(1).split("/");

            /* Use the breadcrumbs to find the corresponding JSON for the internal reference. */
            const internalRefJSON = breadcrumbs.reduce((acc, breadcrumb) => {

                /* First pass - assign the schema to the accumulator. */
                if ( !Object.keys(acc).length ) {

                    acc = schemaJSON;
                }

                /* Check the key is valid. */
                if ( acc[breadcrumb] ) {

                    /* Assign the new schema to the accumulator. */
                    acc = Object.assign({}, acc[breadcrumb]);
                }

                return acc;
            }, {});

            /* Build and return the internal reference JSON in a model similar to schemaJSON. */
            /* This will facilitate the processing of the JSON into the metadata properties model. */
            return {
                name: schemaJSON.name,
                properties: internalRefJSON.properties,
                required: internalRefJSON.required
            };
        }

        return schemaJSON;
    }

    return [];
}

/**
 * Returns the schema's full path as an array.
 * e.g. the schema's full path for cell_cycle_ontology would be
 * ["module", "ontology", "cell_cycle_ontology"],
 * built from the schema's entity, category and schema name.
 *
 * @param schemaFilePath
 * @param schemaName
 * @returns {[string,string,string]}
 */
function getSchemaPaths(schemaFilePath, schemaName) {

    /* Get the schema's entity. */
    const entity = getSchemaEntity(schemaFilePath);

    /* Get the schema's category. */
    const category = getSchemaCategory(schemaFilePath);

    /* Create schemaPaths field - DP metadata specific field required for metadata "path". */
    /* Provides schema full path history. */
    return [entity, category, schemaName];
}

/**
 * Returns an array of property names for the specified schema.
 *
 * @param schemaJSON
 * @returns {Array.<*>}
 */
function getSchemaPropertyNames(schemaJSON) {

    /* Get the properties for the schema - filter out deny listed properties. */
    const propertyNames = Object.keys(schemaJSON.properties)
        .filter(property => !denyProperties.includes(property));

    /* Move provenance property to end of the list - if it exists. */
    if ( propertyNames.includes("provenance") ) {

        const provenanceIndex = propertyNames.indexOf("provenance");

        propertyNames.splice(provenanceIndex, 1);
        propertyNames.push("provenance");
    }

    return propertyNames;
}

/**
 * Returns the schema's relative path.
 * Required for gatsby-node.js createFilePath function (specifically, the creation of slug).
 * e.g. "/module/ontology/cell_cycle_ontology" becomes "/metadata/dictionary/ontology/cell_cycle_ontology".
 *
 * @param schemaPaths
 * @returns {string}
 */
function getSchemaRelativePath(schemaPaths) {

    const [entity, category, schemaName] = schemaPaths;

    /* Return relative path defined by category. */
    if ( category ) {

        return `/metadata/dictionary/${category}/${schemaName}`;
    }

    /* Handles case where an entity is not grouped by categories e.g. the entity "system". */
    /* Return relative path defined by entity. */
    return `/metadata/dictionary/${entity}/${schemaName}`;
}

/**
 * Returns the schema's source file name.
 *
 * @param schemaFileRelativePath
 * @returns {*}
 */
function getSchemaSource(schemaFileRelativePath) {

    return schemaFileRelativePath.split("/")[0];
}

/**
 * Returns a set of categories for the specified entity.
 *
 * @param schemaFilePaths
 * @param entity
 * @returns {*}
 */
function getSetOfCategories(schemaFilePaths, entity) {

    return schemaFilePaths.reduce((acc, schemaFilePath) => {

        /* Process any schema file that belongs to the entity. */
        if ( schemaFilePath.startsWith(entity) ) {

            /* Grab the category. */
            const category = getSchemaCategory(schemaFilePath);
            acc.add(category);
        }

        return acc;
    }, new Set());
}

/**
 * Returns a complete list of properties, inserting any referenced schema properties directly after they are referenced.
 * e.g. the schema "cell_line" has a property "cell_cycle" that references the schema "cell_cycle_ontology" from an ontology module.
 * We roll out the "cell_cycle_ontology" properties under "cell_line.cell_cycle" for display by inserting those referenced properties
 * into the complete list, just after "cell_cycle".
 *
 * @param properties
 * @param schemaName
 * @param schemaJSONByPath
 * @param schemaFilePathsByRelativePath
 * @param propPrimaryFilePath
 * @returns {*}
 */
function insertReferencedProperties(properties, schemaName, schemaJSONByPath, schemaFilePathsByRelativePath, propPrimaryFilePath) {

    if ( properties ) {

        /* Process each property to ascertain whether there is a referenced schema. */
        /* Any referenced schema's properties shall be inserted into the properties array. */
        return properties.reduce((acc, property) => {

            /* Push the property on to the accumulator. */
            acc.push(property);

            /* Grab any referenced properties. */
            const referenceSchemaFilePath = property._ref;

            if ( referenceSchemaFilePath ) {

                /* Get the JSON for the specified path. */
                const referenceSchemaJSON = getSchemaJSON(referenceSchemaFilePath, schemaJSONByPath);
                const [schemaFilePath,] = referenceSchemaFilePath.split("#");
                const referencePropertyPaths = property.propertyPaths;
                const referencePrimaryRequired = property.primaryRequired;

                /* Build the referenced properties and push them onto the accumulator. */
                /* Note, this is a recursive call on a method, and will complete when all referenced properties have been processed. */
                const referenceProperties = processSchemaProperties(schemaName, referenceSchemaJSON, schemaFilePath, schemaJSONByPath, schemaFilePathsByRelativePath, referencePropertyPaths, propPrimaryFilePath, false, referencePrimaryRequired);

                acc.push(...referenceProperties);
            }

            return acc;
        }, []);
    }

    return [];
}

/**
 * Returns true if the dirent is a file, and is of type JSON, and is not on the deny list.
 * Deny list schemas are any top-level JSON files found under /metadadata-schema/json_schema/
 * e.g. "version.json" or "property_migrations.json".
 *
 * @param dirent
 * @returns {boolean | *}
 */
function isDirentJSONSchemaFile(dirent) {

    const jsonFileExists = dirent.name.endsWith(".json");
    const jsonSchemaFile = !denySchemaFilePaths.includes(dirent.name);

    return dirent.isFile() && jsonFileExists && jsonSchemaFile;
}

/**
 * Returns a map object with key value pairs [schemaRelativePath, schemaJSON] for the specified directory
 * i.e. the key is the schema file relative path, and the value is its corresponding schema JSON.
 * Method recursion facilitates the return of any schema files within any sub-directories.
 *
 * @param dirPath
 * @returns {Promise.<*>}
 */
async function mapSchemaJSONByPath(dirPath) {

    const dirents = await fs.readdirSync(dirPath, {withFileTypes: true});

    return await dirents.reduce(async (promise, dirent) => {

        let acc = await promise;

        if ( isDirentJSONSchemaFile(dirent) ) {

            /* Get the JSON. */
            const schemaPath = path.resolve(dirPath, dirent.name);
            const schemaJSON = await generateJSON(schemaPath);

            /* Get the schema relative path. */
            const schemaRelPath = path.relative(metadataJsonPath, path.resolve(dirPath, dirent.name));

            /* Add to the accumulator. */
            acc.set(schemaRelPath, schemaJSON);
        }

        if ( dirent.isDirectory() ) {

            /* Build the path for the directory. */
            const dirRelPath = path.resolve(dirPath, dirent.name);

            /* Explore new directory. */
            const schemaFiles = await mapSchemaJSONByPath(dirRelPath);

            acc = new Map([...acc, ...schemaFiles]);
        }

        return acc;
    }, Promise.resolve(new Map()));
}

/**
 * Return the properties for the specified schema.
 *
 * @param schemaName
 * @param schemaJSON
 * @param schemaFilePath
 * @param schemaJSONByPath
 * @param schemaFilePathsByRelativePath
 * @param propertyPaths
 * @param propPrimaryFilePath
 * @param propPrimary
 * @param propPrimaryRequired
 */
function processSchemaProperties(schemaName, schemaJSON, schemaFilePath, schemaJSONByPath, schemaFilePathsByRelativePath, propertyPaths, propPrimaryFilePath, propPrimary = true, propPrimaryRequired = false) {

    /* Created required field - remove deny listed properties. */
    const requiredProperties = filterRequiredProperties(schemaJSON);

    /* Create list of property names. */
    const propertyNames = getSchemaPropertyNames(schemaJSON);

    /* Sort property names by alpha. */
    const sortedPropertyNames = propertyNames.sort();

    /* Build the properties. */
    return buildFEModelSchemaProperties(schemaName, schemaJSON, schemaFilePath, sortedPropertyNames, requiredProperties, schemaJSONByPath, schemaFilePathsByRelativePath, propertyPaths, propPrimaryFilePath, propPrimary, propPrimaryRequired);
}

/**
 * Moves the specified property to the end of the array of properties.
 *
 * @param properties
 * @param propertyName
 * @returns {*}
 */
function relocateSchemaPropertyToSchemaEnd(properties, propertyName) {

    /* Grab the property index. */
    const propertyIndex = properties.findIndex(property => {

        return property.name.endsWith(propertyName);
    });

    /* Move property to end of the list - if it exists. */
    if ( propertyIndex >= 0 ) {

        const property = properties[propertyIndex];
        properties.splice(propertyIndex, 1);
        properties.push(property);
    }

    return properties;
}

/**
 * Sorts schema properties alphabetically first, where all properties of type object are listed last.
 * e.g. a property named "unit" of type time_unit_ontology object will come after properties
 * named "relevance" and "value" from the same schema.
 *
 * @param properties
 * @returns {*}
 */
function sortSchemaProperties(properties) {

    if ( properties.length > 0 ) {

        /* Sort properties. */
        const sortedProperties = properties.sort(function(p0, p1) {

            const p0ObjExists = p0._ref;
            const p1ObjExists = p1._ref;
            const p0Name = p0.name;
            const p1Name = p1.name;

            /* Handle case where first property name alphabetically precedes the second property name. */
            if ( p0Name < p1Name ) {

                /* Handle case where the first property is of type "object" and the second property is not. */
                /* In this instance, the second property takes precedence. */
                if ( p0ObjExists && !p1ObjExists ) {

                    return 1;
                }
                else {

                    return -1;
                }
            }
            /* Handle case where first property name alphabetically supercedes the second property name. */
            else {

                /* Handle case where the first property is of type "object" and the second property is not. */
                /* In this instance, the second property takes precedence. */
                if ( !p0ObjExists && p1ObjExists ) {

                    return -1;
                }
                else {

                    return 1;
                }
            }
        });

        /* Move *_core and then provenance, should they exist, to the end of the schema properties. */
        const relocatedProperties = relocateSchemaPropertyToSchemaEnd(sortedProperties, "_core");
        return relocateSchemaPropertyToSchemaEnd(relocatedProperties, "provenance");
    }

    return properties;
}

module.exports.buildSchemaJSONByPath = buildSchemaJSONByPath;
module.exports.getMetadataEntities = getMetadataEntities;
module.exports.getMetadataEntityCategories = getMetadataEntityCategories;
module.exports.getMetadataSchemas = getMetadataSchemas;
module.exports.getMetadataSchemaProperties = getMetadataSchemaProperties;
module.exports.getSchemaFilePathsByRelativePath = getSchemaFilePathsByRelativePath;
module.exports.getSetOfMetadataEntities = getSetOfMetadataEntities;
