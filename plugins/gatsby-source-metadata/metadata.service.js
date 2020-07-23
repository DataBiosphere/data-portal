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
const metadataJsonPath = getMetadataJSONPath();

/**
 * Returns a map object of schema JSON and relative path.
 *
 * @returns {Promise.<*>}
 */
const buildSchemaJSONByPath = async function buildSchemaJSONByPath() {

    return await mapSchemaJSONByPath(metadataJsonPath);
};

/**
 * Returns a set of schema file paths for the entity "type".
 *
 * @param schemaJSONByPath
 * @returns {*}
 */
const buildSetOfTypePaths = function buildSetOfTypePaths(schemaJSONByPath) {

    /* Get all schema paths. */
    const schemaFilePaths = [...schemaJSONByPath.keys()];

    /* Return the set of types for the entity "type" only. */
    return schemaFilePaths.reduce((acc, schemaFilePath) => {

        if ( getSchemaEntity(schemaFilePath) === "type" ) {

            acc.add(schemaFilePath);
        }

        return acc;
    }, new Set());
};

/**
 * Returns the metadata cores FE model.
 * Built from the entity "type" cores.
 * e.g. Biomaterial, File, Process, Project, Protocol.
 *
 * @param setOfTypePaths
 * @returns {Array}
 */
const getMetadataCores = function getMetadataCores(setOfTypePaths) {

    /* Get a set of cores for the entity "type". */
    const setOfCores = buildSetOfCores(setOfTypePaths);

    /* Return the cores. */
    return [...setOfCores].map(core => {

        return {name: core};
    });
};

/**
 * Returns the metadata properties FE model.
 * Built from metadata type's schema property fields.
 * e.g. "Catalog URL" from biomaterial.cell_line.catalog_url
 *
 * Incorporates (and flattens) any schema property fields referencing other schemas such as in "modules" or "core".
 * e.g. The property "Cell cycle" from biomaterial.cell_line.cell_cycle references module "module/ontology/cell_cycle_ontology.json".
 *
 * @param schemaJSONByPath
 * @param setOfTypePaths
 * @returns {*}
 */
const getMetadataProperties = function getMetadataProperties(schemaJSONByPath, setOfTypePaths) {

    /* Build property FE model for each schema. */
    return buildFEModelProperties(schemaJSONByPath, setOfTypePaths);
};

/**
 * Returns the metadata types schemas into a metadata type FE model.
 * e.g. "cell_line.json", "cell_suspension.json", ... from the core "biomaterial".
 *
 * @param schemaJSONByPath
 * @param setOfTypePaths
 * @returns {Array}
 */
const getMetadataTypes = function getMetadataTypes(schemaJSONByPath, setOfTypePaths) {

    /* Build type FE model for each schema. */
    return buildFEModelTypes(schemaJSONByPath, setOfTypePaths);
};

/**
 * Build up the type schema properties into a FE-compatible model.
 *
 * @param schemaJSONByPath
 * @param setOfTypePaths
 * @returns {*}
 */
function buildFEModelProperties(schemaJSONByPath, setOfTypePaths) {

    return [...setOfTypePaths].reduce((acc, schemaFilePath) => {

        /* Build the schema's properties into property FE Model. */
        const schemaProperties = processSchemaFile(schemaFilePath, schemaJSONByPath);

        return acc.concat(schemaProperties);
    }, []);
}

/**
 * Build up the type schema JSON into the FE model.
 *
 * @param schemaJSONByPath
 * @param setOfTypePaths
 * @returns {Array}
 */
function buildFEModelTypes(schemaJSONByPath, setOfTypePaths) {

    return [...setOfTypePaths].map(schemaFilePath => {

        /* Get the type JSON. */
        const typeSchemaJSON = schemaJSONByPath.get(schemaFilePath);

        /* Create unfriendly field - DP metadata specific field required for metadata "path". */
        const unfriendly = `${typeSchemaJSON.name}`;

        /* Created required field - remove deny listed properties. */
        const requiredProperties = filterRequiredProperties(typeSchemaJSON.required);

        /* Get the corresponding core. */
        const core = getSchemaCore(schemaFilePath);

        /* Create relative path. */
        /* Required for gatsby-node.js createFilePath function (specifically, the creation of slug). */
        const schemaRelPath = `/metadata/dictionary/${core}/${typeSchemaJSON.name}`;

        return {
            core: core,
            description: typeSchemaJSON.description,
            entity: getSchemaEntity(schemaFilePath),
            name: typeSchemaJSON.name,
            relativePath: schemaRelPath,
            required: requiredProperties,
            title: typeSchemaJSON.title,
            unfriendly: unfriendly
        }
    });
}

/**
 * Returns a set of cores for the "type" entity.
 *
 * @param setOfTypeByPath
 * @returns {Set}
 */
function buildSetOfCores(setOfTypeByPath) {

    /* Return the set of cores for the entity "type" only. */
    return new Set([...setOfTypeByPath].map(schemaFilePath => getSchemaCore(schemaFilePath)));
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
 * Returns the property anchor field, specified by the unFriendly field.
 *
 * @param unFriendly
 */
function getPropertyAnchor(unFriendly) {

    const whiteSpace = /\s/g;
    return unFriendly.replace(whiteSpace, "").replace(/\./g, "-");
}

/**
 * Returns the property data type field - DP metadata specific field for the metadata pages.
 *
 * @param propertyJSON
 * @returns {*}
 */
function getPropertyDataType(propertyJSON) {

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
            precedingText = "e.g.";
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
 * Returns the type field for the property - DP metadata specific field for the metadata pages.
 * Secondary and tertiary properties inherit the type field of the primary property.
 *
 * @param primary
 * @param schemaType
 * @param primaryType
 * @returns {*}
 */
function getPropertyType(primary, schemaType, primaryType) {

    /* Primary schema - return schemaType. */
    if ( primary ) {

        return schemaType;
    }

    /* Secondary and or tertiary schema will return the value of its primary schema. */
    return primaryType;
}

/**
 * Returns the unfriendly field for the property - DP metadata specific field - for the metadata "path".
 * Secondary and tertiary properties build upon the "parent" property's unfriendly field.
 * Primary property unfriendly fields comprise of type and property name.
 *
 * @param parentUnfriendly
 * @param type
 * @param propertyName
 * @returns {*}
 */
function getPropertyUnfriendly(parentUnfriendly, type, propertyName) {

    if ( !parentUnfriendly ) {

        return `${type}.${propertyName}`;
    }

    return `${parentUnfriendly}.${propertyName}`;
}

/**
 * Returns the schema's core.
 *
 * @param schemaFileRelativePath
 * @returns {*}
 */
function getSchemaCore(schemaFileRelativePath) {

    return schemaFileRelativePath.split("/")[1];
}

/**
 * Returns the schema's entity.
 *
 * @param schemaFileRelativePath
 * @returns {*}
 */
function getSchemaEntity(schemaFileRelativePath) {

    return schemaFileRelativePath.split("/")[0];
}

/**
 * Returns the schema as JSON for the specified path.
 *
 * @param schemaFilePath
 * @param schemaJSONByPath
 * @returns {*}
 */
function getSchemaJSON(schemaFilePath, schemaJSONByPath) {

    let schemaPath = schemaFilePath;
    const internalRefExists = schemaFilePath.includes("#");
    let schemaInternalRef;

    /* Check if the schema path includes an internal reference. */
    if ( internalRefExists ) {

        schemaPath = schemaFilePath.split("#")[0];
        schemaInternalRef = schemaFilePath.split("#")[1];
    }

    /* Get the corresponding schema JSON, for the specified path. */
    const schemaJSON = schemaJSONByPath.get(schemaPath);

    /* If an internal file reference exists, build and return the schema JSON for the reference.
    /* e.g. see https://github.com/HumanCellAtlas/metadata-schema/blob/master/json_schema/type/process/analysis/analysis_process.json.
    /* The schema references itself (see property "tasks") e.g. where "$ref": "type/process/analysis/analysis_process.json#/definitions/task".
    /* The internal reference provides object "breadcrumbs" e.g. breadcrumbs for the example above are the keys "definitions" and "task". */
    if ( internalRefExists ) {

        /* Get the internal path as an array. e.g. /definitions/task --> ["definitions", "task"]. */
        const breadcrumbs = schemaInternalRef.trim().slice(1).split("/");

        /* Use the breadcrumbs to find the corresponding JSON for the internal reference. */
        const internalRefJSON = breadcrumbs.reduce((acc, breadcrumb) => {

            /* First pass - assign the schema to the accumulator. */
            if ( !Object.keys(acc).length ) {

                acc = schemaJSON;
            }

            /* Check the key is valid. */
            if (acc[breadcrumb]) {

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
 * Returns required properties, excluding properties from the deny list.
 *
 * @param requiredProperties
 * @returns {Array}
 */
function filterRequiredProperties(requiredProperties) {

    if ( !requiredProperties ) {

        return [];
    }

    return requiredProperties.filter(property => !denyProperties.includes(property));
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

        if ( dirent.isFile() && dirent.name.endsWith(".json") ) {

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
 * Processes schema and builds properties into the property FE model.
 *
 * @param schemaFilePath
 * @param schemaJSONByPath
 * @param parentUnfriendly
 * @param primary
 * @param primaryRequired
 * @param primaryType
 * @returns {*}
 */
function processSchemaFile(schemaFilePath, schemaJSONByPath, parentUnfriendly = "", primary = true, primaryRequired = false, primaryType = "") {

    /* Get the JSON for the specified path. */
    const schemaJSON = getSchemaJSON(schemaFilePath, schemaJSONByPath);

    /* Get the type of the schema - the metadata type [name]. */
    const schemaType = schemaJSON.name;

    /* Created set of required properties - remove deny listed properties. */
    const requiredProperties = filterRequiredProperties(schemaJSON.required);

    /* Create list of property names. */
    const propertyNames = getSchemaPropertyNames(schemaJSON);

    /* Build the properties. */
    return propertyNames.reduce((acc, propertyName) => {

        /* Get the property JSON. */
        const propertyJSON = schemaJSON.properties[propertyName];

        const {description, user_friendly} = propertyJSON || {};

        /* Create property fields. */
        /* Fields are DP metadata specific fields - used by the metadata pages. */
        const dataType = getPropertyDataType(propertyJSON);
        const example = getPropertyExample(propertyJSON);
        const label = user_friendly || propertyName;
        const required = requiredProperties.includes(propertyName);
        const _ref = getPropertyReference(propertyJSON);
        const grouped = !!_ref || !primary;
        const primaryShow = getPropertyPrimaryRequired(primary, required, primaryRequired);
        const type = getPropertyType(primary, schemaType, primaryType);
        const unfriendly = getPropertyUnfriendly(parentUnfriendly, type, propertyName);

        /* Build the property JSON. */
        const property = {
            anchor: getPropertyAnchor(unfriendly),
            core: getSchemaCore(schemaFilePath),
            dataType: dataType,
            description: description,
            entity: getSchemaEntity(schemaFilePath),
            example: example,
            grouped: grouped,
            label: label,
            name: propertyName,
            primary: primary,
            primaryRequired: primaryShow,
            _ref: _ref,
            required: required,
            type: type,
            unfriendly: unfriendly
        };

        /* Add schema to accumulator. */
        /* Primary schema is retained. */
        /* Process any secondary -> tertiary --> ++ schema references. */
        /* Secondary schema with tertiary schema will be ignored. */
        if ( _ref ) {

            /* Primary schema retained - any secondary schema with tertiary schema is ignored. */
            if ( primary ) {

                acc.push(property);
            }

            /* Get the secondary/tertiary properties. */
            const allSchemaProperties = processSchemaFile(_ref, schemaJSONByPath, unfriendly, false, primaryShow, type);

            acc.push(...allSchemaProperties);
        }
        else {

            acc.push(property);
        }

        return acc;
    }, []);
}

module.exports.buildSchemaJSONByPath = buildSchemaJSONByPath;
module.exports.buildSetOfTypePaths = buildSetOfTypePaths;
module.exports.getMetadataCores = getMetadataCores;
module.exports.getMetadataProperties = getMetadataProperties;
module.exports.getMetadataTypes = getMetadataTypes;
