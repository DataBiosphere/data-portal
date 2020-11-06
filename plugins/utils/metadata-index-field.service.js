/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for metadata index fields.
 */

/**
 * Returns the array, removing any value with a colon and replacing with an underscore.
 *
 * Facilitates the indexing of the values like ontologies, classes, or relations where a value may include a colon.
 * Lunr uses the colon to conduct field based searching and so the removal of the colon will prevent an error on the search.
 * A special case is written into the providerMetadataSearching component that handles user entry of the colon.
 * e.g. an array value of "HANCESTRO:0005" returns "HANCESTRO_0005".
 *
 * @param array
 * @returns {Array}
 */
const parseArraySpecialCharValues = function parseArraySpecialCharValues(array) {

    if ( array && array.length ) {

        return array.map(value => value.replace(/:/g, "_"));
    }

    return [];
};

/**
 * Returns the example as an array of examples or enumerated examples, removing any value with a colon and replacing with an underscore.
 *
 * @param example
 * @returns {*}
 */
const parsePropertyExample = function parsePropertyExample(example) {

    if ( example ) {

        const str = example.replace(/(,|or |"|For example |Should be one of: |\.)/gi, "");
        const examples = str.split(" ");
        return parseArraySpecialCharValues(examples);
    }

    return "";
};

/**
 * Returns the string, removing any value with a colon and replacing with an underscore.
 *
 * Facilitates the indexing of the values like ontologies, classes, or relations where a value may include a colon.
 * Lunr uses the colon to conduct field based searching and so the removal of the colon will prevent an error on the search.
 * A special case is written into the providerMetadataSearching component that handles user entry of the colon.
 * e.g. an string value of "HANCESTRO:0005" returns "HANCESTRO_0005".
 *
 * @param str
 * @returns {*}
 */
const parseStrSpecialCharValues = function parseStrSpecialCharValues(str) {

    if ( str ) {

        return str.replace(/:/g, "_");
    }

    return "";
};

module.exports.parseArraySpecialCharValues = parseArraySpecialCharValues;
module.exports.parsePropertyExample = parsePropertyExample;
module.exports.parseStrSpecialCharValues = parseStrSpecialCharValues;
