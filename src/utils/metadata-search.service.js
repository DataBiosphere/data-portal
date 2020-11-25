/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating metadata search functionality.
 */

/* Search input deny list. */
export const DenyListInputs = ["^", "~", ":", "-", "+", "*", "\\"];

// Template variables
const AllowListScoreCriteria = ["description", "example", "classes", "ontologies", "schema", "pathSegmentFirst", "pathSegmentSecond", "path", "friendlyName"];
const AllListScoreTypeEarlyBreakers = ["pathSegmentSecondFullMatch", "pathSegmentSecondSomeMatch", "pathSomeMatch", "friendlyNameFullMatch"];
const DenyListScoreType = ["searchModel"];
const DenyListScoreTypeProcesses = ["pathSegmentFirstFullMatch", "pathSegmentFirstSomeMatch"];

/**
 * Returns search results - modelled, analyzed, scored, and filtered.
 *
 * @param schemas
 * @param properties
 * @param setOfResults
 * @param resultKey
 * @param setOfProperties
 * @param inputValue
 * @returns {Array}
 */
export function buildResults(schemas, properties, setOfResults, resultKey, setOfProperties, inputValue) {

    if ( inputValue ) {

        const queryStr = inputValue.toLowerCase().trim();
        const querySegmentDepth = getQuerySegmentDepth(queryStr);

        /* Filter the properties and schemas for any search hits. */
        const filteredProperties = filterEntities(properties, setOfResults, resultKey, setOfProperties);
        const filteredSchemas = filterEntities(schemas, setOfResults, resultKey, setOfProperties);

        /* Build the search models. */
        const searchModels = buildSearchModels(filteredSchemas, filteredProperties);

        /* Early exit. */
        if ( searchModels.length === 0 ) {

            return [];
        }

        /* Grab the current length of query. */
        const queryLength = queryStr.length;

        /* Build the analyzed models. */
        const analyzedModels = buildAnalyzedModels(searchModels, queryStr, queryLength);

        /* Build the set of search models by score type. */
        const setOfSearchModelsByScoreType = buildSetOfSearchModelsByScoreType(analyzedModels);

        /* Filter and return search models. */
        return filterSearchModels(setOfSearchModelsByScoreType, querySegmentDepth, queryLength);
    }

    return [];
}

/**
 * Returns the complete set of properties, specified by element key.
 * Mimics a full setOfResults; used when a search group has not been queried.
 *
 * @param entities
 * @param resultKey
 * @returns {Set}
 */
export function getSetOfProperties(entities, resultKey) {

    if ( entities ) {

        return entities.reduce((acc, entity) => {

            /* Add to set the entity. */
            acc.add(entity[resultKey]);

            return acc;
        }, new Set());
    }

    return new Set();
}

/**
 * Returns a set of search groups.
 *
 * @returns {Set}
 */
export function getSetOfSearchGroups() {

    const setOfSearchGroups = new Set();

    /* Add "input" to the set. */
    setOfSearchGroups.add("input");

    return setOfSearchGroups;
}

/**
 * Returns the next index (key) on the results list from the current index.
 *
 * @param currentIndex
 * @param resultsDepth
 * @returns {*}
 */
export function onHandleSearchResultArrowDown(currentIndex, resultsDepth) {

    /* Increment down the list. */
    if ( currentIndex < resultsDepth ) {

        return currentIndex + 1;
    }

    /* Return to start of list. */
    return 0;
}

/**
 * Returns the previous index (key) on the results list from the current index.
 *
 * @param currentIndex
 * @param resultsDepth
 * @returns {*}
 */
export function onHandleSearchResultArrowUp(currentIndex, resultsDepth) {

    /* Increment up the list. */
    if ( currentIndex > 0 ) {

        return currentIndex - 1;
    }

    /* Go to end of list. */
    return resultsDepth;
}

/**
 * Handles input value with other special characters - prevents lunr search error.
 * Replaces any special characters with a non-space.
 * Replaces any multiple spaces and trims - improves lunr search performance.
 *
 * @param inputStr
 * @returns {*}
 */
export function onHandleSpecialChars(inputStr) {

    if ( inputStr ) {

        return inputStr.replace(/[`~!@#$%^&*()|\-+=\\\]}{["';?/><,]/g, "").replace(/\s\s+/g, " ").trim();
    }

    return inputStr;
}

/**
 * Returns the analyzed model.
 * Uses the allow list score criteria to build an analyzed model of the search model.
 * Returns a boolean value for each search model element, for each type of "hit" on the element.
 * e.g. query string "cell_line" will return true values for a full, starts with and partial path match.
 *
 * @param searchModel
 * @param queryStr
 * @param queryLength
 * @returns {*}
 */
function buildAnalyzedModel(searchModel, queryStr, queryLength) {

    return AllowListScoreCriteria.reduce((acc, modelKey) => {

        /* Create the keys. */
        const fullMatchKey = `${modelKey}FullMatch`;
        const someMatchKey = `${modelKey}SomeMatch`;

        const [fullMatchValue, someMatchValue] = getAnalyzedModelValues(searchModel, modelKey, queryStr, queryLength);

        /* Assign values to associated key and return accumulator. */
        const fullMatch = {[fullMatchKey]: fullMatchValue};
        const someMatch = {[someMatchKey]: someMatchValue};
        acc = Object.assign(acc, {...fullMatch, ...someMatch});

        return acc;
    }, {});

}

/**
 * Returns the analyzed models.
 *
 * @param searchModels
 * @param queryStr
 * @param queryLength
 * @returns {Array}
 */
function buildAnalyzedModels(searchModels, queryStr, queryLength) {

    if ( searchModels.length > 0 ) {

        return searchModels.map(searchModel => {

            /* Build the analyzed model. */
            const analyzedModel = buildAnalyzedModel(searchModel, queryStr, queryLength);

            return Object.assign({searchModel: searchModel}, analyzedModel);
        });
    }

    return [];
}

/**
 * Returns the search models.
 * Schemas and properties models are normalized to facilitate the scoring of hits.
 *
 * @param schemas
 * @param properties
 */
function buildSearchModels(schemas, properties) {

    return schemas.concat(properties)
        .map(result => {

            const {description, example, graphRestriction, label,
                    propertyPath, propertyPaths, schemaName, title} = result || {},
                {classes, ontologies} = graphRestriction || {};
            const modelDescription = description ? description.toLowerCase() : description;
            const modelExample = example ? example.toLowerCase() : example;
            const modelFriendly = title ? title.toLowerCase() : label.toLowerCase();
            const modelPath = propertyPath ? propertyPath.toLowerCase() : propertyPath;
            const modelSchema = schemaName ? schemaName.toLowerCase() : schemaName;
            const [pathSegmentFirst, pathSegmentSecond,] = propertyPaths || [];

            return {
                description: modelDescription,
                classes: classes,
                example: modelExample,
                friendlyName: modelFriendly,
                hit: result,
                ontologies: ontologies,
                path: modelPath,
                pathSegmentFirst: pathSegmentFirst,
                pathSegmentSecond: pathSegmentSecond,
                schema: modelSchema
            }
        });
}

/**
 * Returns a set of models.
 *
 * @param model
 * @param setOfModels
 * @returns {Set.<T>}
 */
function buildSetOfModels(model, setOfModels = new Set()) {

    return setOfModels.add(model);
}

/**
 * Returns a set of score types.
 *
 * @param analyzedModels
 * @returns {Set}
 */
function buildSetOfScoreTypes(analyzedModels) {

    const setOfScoreTypes = new Set();

    analyzedModels.forEach(analyzedModel => {

        /* Grab the model keys. */
        const modelKeys = Object.keys(analyzedModel);

        /* For each model key, add to the set. */
        /* Deny list excludes the search model. */
        modelKeys.forEach(modelKey => {

            if ( !DenyListScoreType.includes(modelKey) ) {

                setOfScoreTypes.add(modelKey);
            }
        })
    });

    return setOfScoreTypes;
}

/**
 * Returns map object key value pair of score type and set of search models.
 *
 * @param analyzedModels
 * @returns {Map}
 */
function buildSetOfSearchModelsByScoreType(analyzedModels) {

    const setOfModelsByScoreType = new Map();

    if ( analyzedModels.length > 0 ) {

        /* Build the complete set of score types and associated map object. */
        const setOfScoreTypes = buildSetOfScoreTypes(analyzedModels);
        [...setOfScoreTypes].forEach(scoreType => setOfModelsByScoreType.set(scoreType, new Set()));

        /* For each model, add the model and any hits on score types to the map object. */
        analyzedModels.forEach(analyzedModel => {

            const {searchModel} = analyzedModel;

            /* Grab the score types. */
            const scoreTypes = [...setOfModelsByScoreType.keys()];

            scoreTypes.forEach(scoreType => {

                if ( analyzedModel[scoreType] ) {

                    const setOfModels = setOfModelsByScoreType.get(scoreType);
                    setOfModelsByScoreType.set(scoreType, buildSetOfModels(searchModel, setOfModels))
                }
            })
        });
    }

    return setOfModelsByScoreType;
}

/**
 * Returns the entities filtered by results from the search.
 *
 * @param entities
 * @param setOfResults
 * @param resultKey
 * @param setOfEntities
 * @returns {*}
 */
function filterEntities(entities, setOfResults, resultKey, setOfEntities) {

    /* Set of results is empty. */
    if ( setOfResults.size === 0 ) {

        return [];
    }

    /* Full set of entities are returned - results set is complete. */
    if ( setOfEntities.size === setOfResults.size ) {

        return entities;
    }

    /* Filter entities - results set activated and returned hits from the search. */
    if ( entities ) {

        return entities.filter(entity => setOfResults.has(entity[resultKey]));
    }

    return [];
}

/**
 * Returns filtered results.
 *
 * @param setOfSearchModelsByScoreType
 * @param querySegmentDepth
 * @param queryLength
 */
function filterSearchModels(setOfSearchModelsByScoreType, querySegmentDepth, queryLength) {

    let setOfResultsByScoreType = new Map();

    if ( setOfSearchModelsByScoreType.size > 0 ) {

        for ( let [scoreType, setOfSearchModels] of setOfSearchModelsByScoreType ) {

            const setSizeSearchModels = setOfSearchModels.size;

            /* Early continue. */
            if ( setSizeSearchModels === 0 ) {

                continue;
            }

            /* Grab the models. */
            const models = setOfSearchModels.values();

            /* Process each model to see if it should be included as a result. */
            for ( const model of models ) {

                /* Confirm score type should be processed. */
                const processHits = isProcessHits(model, scoreType, querySegmentDepth);

                /* Process score types. */
                if ( processHits ) {

                    /* Register when a result has a hit in the score type "classes", "example" or "ontologies". */
                    /* The boolean will determine whether the field is displayed in the search results. */
                    const resultHasClassesHit = scoreType.startsWith("classes");
                    const resultHasExampleHit = scoreType.startsWith("example");
                    const resultHasOntologiesHit = scoreType.startsWith("ontologies");

                    /* Clone model and model hit. */
                    /* Update clone with boolean. */
                    const modelClone = Object.assign({}, model);
                    const modelHitClone = Object.assign({}, model.hit);
                    Object.assign(modelHitClone, {showClasses: resultHasClassesHit, showExample: resultHasExampleHit, showOntologies: resultHasOntologiesHit});
                    modelClone.hit = modelHitClone;

                    /* Switch the score type - if required. */
                    const sType = switchScoreType(scoreType);

                    /* Grab the set of results for the score type. */
                    const setOfResults = setOfResultsByScoreType.get(sType);

                    /* Add the result to the score type - if it hasn't already been added. */
                    /* Bundle score types like "description" and "example" and "classes" etc. together. */
                    /* With modifications to the model (clone), this step prevents duplicate properties added to the set of results "generalHit". */
                    /* This satisfies two criteria - . */
                    /* Any property with a hit on description and then example, should not display twice. */
                    /* The property will not need to display the example field; the hit on description is sufficient. */
                    if ( !isResultInScoreType(model, setOfResults, sType) ) {

                        setOfResultsByScoreType.set(sType, buildSetOfModels(modelClone, setOfResults));
                    }
                }
            }

            /* Early break. */
            if ( isEarlyBreak(scoreType, setOfResultsByScoreType, queryLength) ) {

                break;
            }
        }
    }

    return getDistinctResults(reorderSetOfResultsByScoreType(setOfResultsByScoreType));
}

/**
 * Returns the full match boolean value and some match boolean value for the specified model element and query string.
 *
 * @param searchModel
 * @param modelKey
 * @param queryStr
 * @param queryLength
 * @returns {[boolean,boolean]}
 */
function getAnalyzedModelValues(searchModel, modelKey, queryStr, queryLength) {

    /* Initialize the full match and some match values. */
    let fullMatchValue = false;
    let someMatchValue = false;

    /* Grab the model value to compare against. */
    /* Convert any string value to an array to streamline the process. */
    let modelValue = searchModel[modelKey];

    if ( typeof modelValue === "string" ) {

        modelValue = Array.from([modelValue]);
    }

    if ( Array.isArray(modelValue) ) {

        fullMatchValue = modelValue.some(modelStr => modelStr.toLowerCase() === queryStr);

        if ( !fullMatchValue ) {

            /* Look for "starts with" match value, if there is no full match. */
            someMatchValue = modelValue.some(modelStr => modelStr.toLowerCase().startsWith(queryStr));

            if ( !someMatchValue && queryLength > 1 ) {

                /* Only look for partial matches within the value, if there is no full match, or starts with match. */
                /* Bypass if query length is only one character. */
                someMatchValue = modelValue.some(modelStr => {

                    /* Check query string, including query with more than a single word. */
                    const queries = queryStr.split(" ");
                    return queries.some(query => modelStr.toLowerCase().includes(query));
                });
            }
        }
    }

    return [fullMatchValue, someMatchValue];
}

/**
 * Returns distinct results.
 * The set of results by score type are in order of display preference.
 * Any subsequent duplicates are removed from the results - the duplicate will have had a hit on a more preferential
 * score type.
 * e.g. any duplications within the score type "generalHit" (which comprises of score types like "example" or "description") will not be
 * included into the results if the same schema or property has a hit on a score type like "schema" or "path".
 *
 * @param setOfResultsByScoreType
 */
function getDistinctResults(setOfResultsByScoreType) {

    if ( setOfResultsByScoreType.size > 0 ) {

        const setOfResultsByIdentifier = new Map();

        [...setOfResultsByScoreType.values()].forEach(setOfResults => {

            if ( setOfResults ) {

                [...setOfResults].forEach(result => {

                    const {hit, path, schema} = result || {};
                    const resultIdentifier = schema || path;
                    const resultExists = setOfResultsByIdentifier.has(resultIdentifier);

                    if ( !resultExists ) {

                        setOfResultsByIdentifier.set(resultIdentifier, hit);
                    }
                });
            }
        });

        return [...setOfResultsByIdentifier.values()];
    }

    return [];
}

/**
 * Returns the query path segment depth.
 *
 * @param queryStr
 * @returns {*}
 */
function getQuerySegmentDepth(queryStr) {

    if ( queryStr.includes(".") ) {

        return queryStr.split(".").length;
    }

    return 0;
}

/**
 * Returns true if there is an early break on processing results.
 * Break occurs with hits on:
 * - some hit on schema, with query length a single character and results exist.
 * - some hit on property path second segment.
 * - full hit on friendly field.
 *
 * @param scoreType
 * @param setOfResultsByScoreType
 * @param queryLength
 * @returns {boolean}
 */
function isEarlyBreak(scoreType, setOfResultsByScoreType, queryLength) {

    /* Score type is some hit on schema, query length is one character and there are results. */
    if ( queryLength === 1 && setOfResultsByScoreType.size > 0 && scoreType === "schemaSomeMatch" ) {

        return true;
    }

    return AllListScoreTypeEarlyBreakers.includes(scoreType);
}

/**
 * Returns true if the hits for the specified score type should be added to the results.
 *
 * @param model
 * @param scoreType
 * @param querySegmentDepth
 * @returns {boolean}
 */
function isProcessHits(model, scoreType, querySegmentDepth) {

    if ( DenyListScoreTypeProcesses.includes(scoreType) ) {

        return false;
    }

    /* Grab any variables required for processing score type. */
    const {hit, pathSegmentSecond} = model || {},
        {propertyPaths} = hit || {};
    const pathHasTwoSegments = propertyPaths && propertyPaths.length === 2;
    const pathDepth = propertyPaths ? propertyPaths.length : 0;
    const secondSegmentIsProvenance = /provenance/.test(pathSegmentSecond);

    /* Grab score types - for a/typical processing of each score type [group] of interest. */
    const fullPathHit = scoreType === "pathFullMatch";
    const somePathHit = scoreType === "pathSomeMatch";
    const pathHit = fullPathHit || somePathHit;
    const fullSecondSegmentHit = scoreType === "pathSegmentSecondFullMatch";
    const someSecondSegmentHit = scoreType === "pathSegmentSecondSomeMatch";
    const secondSegmentHit = fullSecondSegmentHit || someSecondSegmentHit;

    if ( secondSegmentHit ) {

        return pathHasTwoSegments && !secondSegmentIsProvenance;
    }
    else if ( pathHit ) {

        return pathDepth - querySegmentDepth === 0;
    }
    else {

        return true;
    }
}

/**
 * Returns true if the model is already registered with the score type "generalHit".
 *
 * @param model
 * @param setOfModels
 * @param scoreType
 */
function isResultInScoreType(model, setOfModels, scoreType) {

    /* Only process score types "generalHit". */
    /* Other score types are not bundled up together and therefore will not have modified, cloned models. */
    if ( scoreType.startsWith("generalHit") && setOfModels ) {

        const {hit, path} = model || {},
            {type} = hit || {};

        /* Grab the model type. */
        const propertyExists = /property/.test(type);

        /* If the model type is a property, check the property is not already in the set. */
        /* Schema models will not be duplicated; lunr indexing on schema is for description only. */
        if ( propertyExists ) {

            return [...setOfModels].some(model => model.path === path);
        }
    }

    return false;
}

/**
 * Returns the set of results by score type with the score type "generalHits" placed in last position, if it exists.
 *
 * @param setOfResultsByScoreType
 * @returns {*}
 */
function reorderSetOfResultsByScoreType(setOfResultsByScoreType) {

    if ( setOfResultsByScoreType.size > 0 ) {

        /* Reorganise general hits to the end of the results. */
        /* Higher value hits are displayed first. */
        /* Grab the general hits. */
        const setOfGeneralHitResults = setOfResultsByScoreType.get("generalHit");

        /* Delete the general hits. */
        setOfResultsByScoreType.delete("generalHit");

        /* Only add the general hits back in, if they exist. */
        if ( setOfGeneralHitResults ) {

            setOfResultsByScoreType.set("generalHit", setOfGeneralHitResults);
        }
    }

    return setOfResultsByScoreType;
}

/**
 * Switches key score type to key result hit type.
 * Used to generalize and group hits on score types like "description" and "example".
 *
 * @param scoreType
 * @returns {*}
 */
function switchScoreType(scoreType) {

    switch (scoreType) {
        case "friendlyNameSomeMatch":
            return "generalHit";
        case "descriptionFullMatch":
            return "generalHit";
        case "descriptionSomeMatch":
            return "generalHit";
        case "exampleFullMatch":
            return "generalHit";
        case "exampleSomeMatch":
            return "generalHit";
        case "classesFullMatch":
            return "generalHit";
        case "classesSomeMatch":
            return "generalHit";
        case "ontologiesFullMatch":
            return "generalHit";
        case "ontologiesSomeMatch":
            return "generalHit";
        case "relationsFullMatch":
            return "generalHit";
        case "relationsSomeMatch":
            return "generalHit";
        default:
            return scoreType;
    }
}
