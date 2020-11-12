/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata indexing component.
 */

// Core dependencies
import lunr from "lunr";
import React, {useCallback, useEffect, useRef, useState} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

function ProviderMetadataSearching(props) {

    const {children, metadataIndexFileName, properties, resultKey, schemas, setOfProperties, setOfSearchGroups, onHandleSiteScroll} = props;
    const setOfResultsBySearchGroupsRef = useRef(new Map());
    const [inputActive, setInputActive] = useState(false);
    const [metadataIndex, setMetadataIndex] = useState([]);
    const [metadataIndexMounted, setMetadataIndexMounted] = useState(false);
    const [results, setResults] = useState([]);
    const [queries, setQueries] = useState({inputValue: "", lastSearchHit: "", query: "", searchValue: ""});
    const [showResultsPanel, setShowResultsPanel] = useState(false);
    const {inputValue, lastSearchHit, query, searchValue} = queries;

    const buildInputValueString = useCallback(() => {

        if ( searchValue ) {

            /* Multiple search values. */
            if ( searchValue.includes(" ") ) {

                const values = searchValue.split(" ");

                return values.map(value => `+${value}*`).join(" ");
            }

            /* Singular search value. */
            return `+${searchValue}*`;
        }

        return "";
    }, [searchValue]);

    const buildQuery = (inputStr) => {

        const selectedFacetTermsByFacet = new Map();

        if ( inputStr ) {

            selectedFacetTermsByFacet.set("search", inputStr);
        }

        // Convert selected facet terms to valid query string object
        return new URLSearchParams(selectedFacetTermsByFacet).toString();
    };

    const fetchMetadataIndex = useCallback(() => {

        fetch(metadataIndexFileName)
            .then(res => res.json())
            .then(res => {
                const index = lunr.Index.load(res);

                setMetadataIndex(index);
                setMetadataIndexMounted(true);
            })
            .catch(err => {
                console.log(err, "Error loading index");
            });
    }, [metadataIndexFileName]);

    const findIntersectionSetOfResults = useCallback((soResultsBySearchGroups) => {

        const sortSetsOfResults = () => {

            return [...soResultsBySearchGroups.values()]
                .sort(function (set0, set1) {

                    if ( set0.size > set1.size ) {

                        return 1;
                    }
                    else {

                        return -1;
                    }
                });
        };

        /* Sort the set of results by set size. */
        const sortedSetsOfResults = sortSetsOfResults();
        const firstSetOfResults = sortedSetsOfResults.shift();

        /* Find any intersecting sets of results. i.e. searching will be "AND" between input and other specified search groups. */
        /* Create a new set of intersection results. */
        /* i.e. filter through the smallest set to confirm results exist in all other search group sets. */
        if ( firstSetOfResults ) {

            return new Set([...firstSetOfResults].filter(result => {

                return sortedSetsOfResults.every(sortedSetOfResults => sortedSetOfResults.has(result));
            }));
        }

        return new Set();
    }, []);

    const getResults = useCallback((soResults) => {

        return MetadataSearchService.buildResults(schemas, properties, soResults, resultKey, setOfProperties, inputValue);
    }, [inputValue, properties, resultKey, schemas, setOfProperties]);

    const getResultsByQuery = useCallback((inputStr) => {

        const queryString = `${inputStr}`;
        const indexResults = metadataIndex.search(queryString);

        return new Set(indexResults.map(result => result.ref));
    }, [metadataIndex]);

    const getSetOfInputResults = useCallback(() => {

        /* Continue with query if search value is valid. */
        if ( searchValue ) {

            /* Grab current set of results for the input. */
            const setOfResultsBySearchGroup = setOfResultsBySearchGroupsRef.current.get("input");

            /* Continue with query if most recent "hit" was on the input. */
            if ( lastSearchHit === "input" || !setOfResultsBySearchGroup ) {

                const inputStr = buildInputValueString();

                return new Set(getResultsByQuery(inputStr));
            }
            /* Otherwise, return input's current set of results. */
            /* i.e. early exit - the input isn't being queried at present and therefore its results are unchanged. */
            else {

                return setOfResultsBySearchGroup;
            }
        }

        /* Early exit - setOfProperties [property ids] returned if no input value registered. */
        return setOfProperties;
    }, [buildInputValueString, getResultsByQuery, lastSearchHit, searchValue, setOfProperties]);

    const getSetOfResults = useCallback((soResultsBySearchGroups) => {

        return findIntersectionSetOfResults(soResultsBySearchGroups);
    }, [findIntersectionSetOfResults]);

    const getSetOfResultsBySearchGroup = useCallback((searchGroup) => {

        /* Return a set of results for the search group "input". */
        if ( searchGroup === "input" ) {

            return getSetOfInputResults();
        }
    }, [getSetOfInputResults]);

    const getSetOfResultsBySearchGroups = useCallback(() => {

        return [...setOfSearchGroups].reduce((acc, searchGroup) => {

            const resultsBySearchGroup = getSetOfResultsBySearchGroup(searchGroup);
            acc.set(searchGroup, resultsBySearchGroup);

            return acc;
        }, new Map());
    }, [getSetOfResultsBySearchGroup, setOfSearchGroups]);

    const getShowResultsPanel = useCallback((_results, soResults) => {

        const noResults = _results && _results.length === 0;
        const filteredResults = setOfProperties.size !== soResults.size;
        const resultsEmpty = inputActive && inputValue && noResults;
        const resultsExist = inputActive && filteredResults && !noResults;

        return resultsEmpty || resultsExist;
    }, [inputActive, inputValue, setOfProperties]);

    const isInputDenied = (inputStr) => {

        return MetadataSearchService.DenyListInputs.some(deniedInput => inputStr.includes(deniedInput));
    };

    const onHandleInput = (event) => {

        if ( event !== inputValue ) {

            /* Handle change in search value. */
            onHandleSearch(event);
        }
    };

    const onHandleSearch = (inputStr) => {

        let searchStr = inputStr.trim();

        /* Pre process input value for any special character. */
        if ( isInputDenied(inputStr) ) {

            /* Replace ":" with "_". */
            /* Handles special searches for graph restrictions like ontologies, classes and relations where any value may include ":". */
            /* Lunr typically uses the colon as field based searching. Use of the colon whilst searching for a specific ontology return an error. */
            /* See https://lunrjs.com/guides/searching.html. */
            if ( inputStr.includes(":") ) {

                searchStr = inputStr.replace(/:/g, "_");
            }
            /* Handles input value with other special characters - prevents lunr search error. */
            /* Replaces any ";", "/", "\", "*", "~", "-", "^" or "+" with a non-space. */
            /* Replaces any multiple spaces and trims - improves lunr search performance. */
            else {

                searchStr = inputStr.replace(/[;/\\*~\-^+]/g, "").replace(/\s\s+/g, " ").trim();
            }
        }

        const currentQuery = buildQuery(inputStr);

        /* Update inputValue, lastSearchHit, query and searchValue. */
        setQueries({inputValue: inputStr, lastSearchHit: "input", query: currentQuery, searchValue: searchStr});
    };

    const onHandleSearchClose = () => {

        /* Handle search params TODO. */

        /* Handle site scrolling. */
        onHandleSiteScroll(true);

        setInputActive(false);
    };

    const onHandleSearchOpen = () => {

        /* Handle site scrolling. */
        onHandleSiteScroll(false);

        setInputActive(true);
    };

    const updateURLSearchParams = useCallback(() => {

        /* TODO. */
    }, []);

    const generateResults = useCallback(() => {

        /* Get set of results by search groups. */
        const _setOfResultsBySearchGroups = getSetOfResultsBySearchGroups();

        /* Get set of results. */
        const _setOfResults = getSetOfResults(_setOfResultsBySearchGroups);

        /* Get results. */
        const _results = getResults(_setOfResults);

        /* Get show results panel. */
        const _showResultsPanel = getShowResultsPanel(_results, _setOfResults);

        /* Update URL with query. */
        //updateURLSearchParams();

        return [_results, _setOfResultsBySearchGroups, _showResultsPanel];
    }, [getResults, getSetOfResults, getSetOfResultsBySearchGroups, getShowResultsPanel]);

    /* useEffect - componentDidMount/componentWillUnmount. */
    useEffect(() => {

        /* Grab the index. */
        fetchMetadataIndex();
    }, [fetchMetadataIndex]);

    /* useEffect - componentDidUpdate - searchValue, metadataIndexMounted. */
    /* Update setOfResultsBySearchGroups when index is mounted or with change in searchValue. */
    useEffect(() => {

        if ( metadataIndexMounted ) {

            /* Generate results. */
            const [_results, _setOfResultsBySearchGroups, _showResultsPanel] = generateResults();

            setOfResultsBySearchGroupsRef.current = _setOfResultsBySearchGroups;
            setResults(_results);
            setShowResultsPanel(_showResultsPanel);
        }
    }, [generateResults, metadataIndexMounted]);

    return (
        <ContextMetadataSearch.Provider value={{inputActive, inputValue, results, showResultsPanel, onHandleInput, onHandleSearchClose, onHandleSearchOpen}}>
            {children}
        </ContextMetadataSearch.Provider>
    )
}

export default ProviderMetadataSearching;
