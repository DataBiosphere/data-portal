/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata indexing component.
 */

// Core dependencies
import lunr from "lunr";
import React, {useCallback, useEffect, useState} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

function ProviderMetadataSearching(props) {

    const {children, metadataIndexFileName, properties, resultKey, schemas, setOfProperties, setOfSearchGroups, onHandleSiteScroll} = props;
    const [inputActive, setInputActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [lastSearchHit, setLastSearchHit] = useState("");
    const [metadataIndex, setMetadataIndex] = useState([]);
    const [metadataIndexMounted, setMetadataIndexMounted] = useState(false);
    const [query, setQuery] = useState(""); // Analytics-specific value, used to specify the current query state when tracking a change
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [setOfResults, setSetOfResults] = useState(new Set());
    const [setOfResultsBySearchGroups, setSetOfResultsBySearchGroups] = useState(new Map());
    const [showResultsPanel, setShowResultsPanel] = useState(false);

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

    const findIntersectionSetOfResults = useCallback(() => {

        const sortSetsOfResults = () => {

            return [...setOfResultsBySearchGroups.values()]
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
    }, [setOfResultsBySearchGroups]);

    const getResultsByQuery = useCallback((inputStr) => {

        const queryString = `${inputStr}`;
        const indexResults = metadataIndex.search(queryString);

        return new Set(indexResults.map(result => result.ref));
    }, [metadataIndex]);

    const getSetOfInputResults = useCallback((currentSetOfResultsBySearchGroups) => {

        /* Continue with query if search value is valid. */
        if ( searchValue ) {

            /* Grab current set of results for the input. */
            const setOfResultsBySearchGroup = currentSetOfResultsBySearchGroups.get("input");

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

    const getSetOfResultsBySearchGroup = useCallback((searchGroup, currentSetOfResultsBySearchGroups) => {

        /* Return a set of results for the search group "input". */
        if ( searchGroup === "input" ) {

            return getSetOfInputResults(currentSetOfResultsBySearchGroups);
        }
    }, [getSetOfInputResults]);

    const getSetOfResultsBySearchGroups = useCallback((currentSetOfResultsBySearchGroups) => {

        return [...setOfSearchGroups].reduce((acc, searchGroup) => {

            const resultsBySearchGroup = getSetOfResultsBySearchGroup(searchGroup, currentSetOfResultsBySearchGroups);
            acc.set(searchGroup, resultsBySearchGroup);

            return acc;
        }, new Map());
    }, [getSetOfResultsBySearchGroup, setOfSearchGroups]);

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
        setInputValue(inputStr);
        setLastSearchHit("input");
        setQuery(currentQuery);
        setSearchValue(searchStr);
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

    const updateResults = useCallback(() => {

        setResults(MetadataSearchService.buildResults(schemas, properties, setOfResults, resultKey, setOfProperties, inputValue));
    }, [inputValue, properties, resultKey, schemas, setOfProperties, setOfResults]);

    const updateSetOfResults = useCallback(() => {

        setSetOfResults(findIntersectionSetOfResults());
    }, [findIntersectionSetOfResults]);

    const updateSetOfResultsBySearchGroups = useCallback(() => {

        /* Update set of results by search groups. */
        setSetOfResultsBySearchGroups(currentSetOfResultsBySearchGroups => new Map(getSetOfResultsBySearchGroups(currentSetOfResultsBySearchGroups)));
    }, [getSetOfResultsBySearchGroups]);

    const updateShowResultsPanel = useCallback(() => {

        const noResults = results && results.length === 0;
        const filteredResults = setOfProperties.size !== setOfResults.size;
        const resultsEmpty = inputActive && inputValue && noResults;
        const resultsExist = inputActive && filteredResults && !noResults;
        const showPanel = resultsEmpty || resultsExist;

        if ( showPanel !== showResultsPanel ) {

            setShowResultsPanel(showPanel);
        }
    }, [inputActive, inputValue, results, setOfProperties, setOfResults, showResultsPanel]);

    const updateURLSearchParams = useCallback(() => {

        /* TODO. */
    }, []);

    /* useEffect - componentDidMount/componentWillUnmount. */
    useEffect(() => {

        /* Grab the index. */
        fetchMetadataIndex();
    }, [fetchMetadataIndex]);

    /* useEffect - componentDidUpdate - searchValue, metadataIndexMounted. */
    /* Update setOfResultsBySearchGroups when index is mounted or with change in searchValue. */
    useEffect(() => {

        if ( metadataIndexMounted ) {

            /* Update set of results by search groups. */
            updateSetOfResultsBySearchGroups();

            /* Update URL with query. */
            updateURLSearchParams();
        }
    }, [metadataIndexMounted, updateSetOfResultsBySearchGroups, updateURLSearchParams]);

    /* useEffect - componentDidUpdate - searchValue, metadataIndexMounted. */
    /* Update setOfResults with change in setOfResultsBySearchGroups. */
    useEffect(() => {

        if ( metadataIndexMounted ) {

            /* Update set of results. */
            updateSetOfResults();
        }
    }, [metadataIndexMounted, setOfResultsBySearchGroups, updateSetOfResults]);

    /* useEffect - componentDidUpdate - setOfResults. */
    /* Update results with change in setOfResults. */
    useEffect(() => {

        if ( metadataIndexMounted ) {

            /* Update results. */
            updateResults();
        }
    }, [metadataIndexMounted, updateResults]);

    /* useEffect - componentDidUpdate - results. */
    /* Update showResultsPanel with change in results. */
    useEffect(() => {

        if ( metadataIndexMounted ) {

            /* Update showResultsPanel. */
            updateShowResultsPanel();
        }
    }, [metadataIndexMounted, updateShowResultsPanel]);

    return (
        <ContextMetadataSearch.Provider value={{inputActive, inputValue, results, showResultsPanel, onHandleInput, onHandleSearchClose, onHandleSearchOpen}}>
            {children}
        </ContextMetadataSearch.Provider>
    )
}

export default ProviderMetadataSearching;
