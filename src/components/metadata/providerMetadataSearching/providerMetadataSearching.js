/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata indexing component.
 */

// Core dependencies
import lunr from "lunr";
import React, { useCallback, useEffect, useRef, useState } from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import * as DPGTMService from "../../../utils/dp-gtm/dp-gtm.service";
import { GAEntityType } from "../../../utils/dp-gtm/ga-entity-type.model";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

function ProviderMetadataSearching(props) {
  const {
    children,
    metadataIndexFileName,
    properties,
    resultKey,
    schemas,
    setOfProperties,
    setOfSearchGroups,
    onHandleSiteScroll
  } = props;
  const setOfResultsBySearchGroupsRef = useRef(new Map());
  const [metadataIndex, setMetadataIndex] = useState([]);
  const [metadataIndexMounted, setMetadataIndexMounted] = useState(false);
  const [results, setResults] = useState([]);
  const [queries, setQueries] = useState({
    inputActive: false,
    inputValue: "",
    lastSearchHit: "",
    query: "",
    searchValue: ""
  });
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const { inputActive, inputValue, lastSearchHit, searchValue } = queries;

  const buildInputValueString = useCallback(() => {
    if (searchValue) {
      /* Multiple search values. */
      if (searchValue.includes(" ")) {
        const values = searchValue.split(" ");

        return values.map(value => `+${value}*`).join(" ");
      }

      /* Singular search value. */
      return `+${searchValue}*`;
    }

    return "";
  }, [searchValue]);

  const buildQuery = inputStr => {
    const selectedFacetTermsByFacet = new Map();

    if (inputStr) {
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

  const findIntersectionSetOfResults = useCallback(soResultsBySearchGroups => {
    const sortSetsOfResults = () => {
      return [...soResultsBySearchGroups.values()].sort(function(set0, set1) {
        if (set0.size > set1.size) {
          return 1;
        } else {
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
    if (firstSetOfResults) {
      return new Set(
        [...firstSetOfResults].filter(result => {
          return sortedSetsOfResults.every(sortedSetOfResults =>
            sortedSetOfResults.has(result)
          );
        })
      );
    }

    return new Set();
  }, []);

  const getResults = useCallback(
    soResults => {
      return MetadataSearchService.buildResults(
        schemas,
        properties,
        soResults,
        resultKey,
        setOfProperties,
        inputValue
      );
    },
    [inputValue, properties, resultKey, schemas, setOfProperties]
  );

  const getResultsByQuery = useCallback(
    inputStr => {
      const queryString = `${inputStr}`;
      const indexResults = metadataIndex.search(queryString);

      return new Set(indexResults.map(result => result.ref));
    },
    [metadataIndex]
  );

  const getSetOfInputResults = useCallback(() => {
    /* Continue with query if search value is valid. */
    if (searchValue) {
      /* Grab current set of results for the input. */
      const setOfResultsBySearchGroup = setOfResultsBySearchGroupsRef.current.get(
        "input"
      );

      /* Continue with query if most recent "hit" was on the input. */
      if (lastSearchHit === "input" || !setOfResultsBySearchGroup) {
        const inputStr = buildInputValueString();

        return new Set(getResultsByQuery(inputStr));
      } else {
        /* Otherwise, return input's current set of results. */
        /* i.e. early exit - the input isn't being queried at present and therefore its results are unchanged. */
        return setOfResultsBySearchGroup;
      }
    }

    /* Early exit - setOfProperties [property ids] returned if no input value registered. */
    return setOfProperties;
  }, [
    buildInputValueString,
    getResultsByQuery,
    lastSearchHit,
    searchValue,
    setOfProperties
  ]);

  const getSetOfResults = useCallback(
    soResultsBySearchGroups => {
      return findIntersectionSetOfResults(soResultsBySearchGroups);
    },
    [findIntersectionSetOfResults]
  );

  const getSetOfResultsBySearchGroup = useCallback(
    searchGroup => {
      /* Return a set of results for the search group "input". */
      if (searchGroup === "input") {
        return getSetOfInputResults();
      }
    },
    [getSetOfInputResults]
  );

  const getSetOfResultsBySearchGroups = useCallback(() => {
    return [...setOfSearchGroups].reduce((acc, searchGroup) => {
      const resultsBySearchGroup = getSetOfResultsBySearchGroup(searchGroup);
      acc.set(searchGroup, resultsBySearchGroup);

      return acc;
    }, new Map());
  }, [getSetOfResultsBySearchGroup, setOfSearchGroups]);

  const getShowResultsPanel = useCallback(
    (_results, soResults) => {
      const noResults = _results && _results.length === 0;
      const filteredResults = setOfProperties.size !== soResults.size;
      const resultsEmpty = inputActive && inputValue && noResults;
      const resultsExist = inputActive && filteredResults && !noResults;

      return resultsEmpty || resultsExist;
    },
    [inputActive, inputValue, setOfProperties]
  );

  const onHandleSearch = inputStr => {
    /* Handles input value with other special characters - prevents lunr search error. */
    /* Includes handling of ":" for ontologies. */
    const searchStr = MetadataSearchService.onHandleParseInputString(inputStr);

    /* Handle change in search value. */
    if (searchStr !== searchValue) {
      /* Build current query. */
      const currentQuery = buildQuery(inputStr);

      /* Update inputValue, lastSearchHit, query and searchValue. */
      setQueries(queries => ({
        ...queries,
        inputValue: inputStr,
        lastSearchHit: "input",
        query: currentQuery,
        searchValue: searchStr
      }));

      DPGTMService.trackMetadataSearchInput(inputStr, GAEntityType.METADATA);
    }
  };

  const onHandleSearchClose = () => {
    /* Handle site scrolling. */
    onHandleSiteScroll(true);

    /* Clear queries and set inputActive to false. */
    setQueries(queries => ({
      ...queries,
      inputActive: false,
      inputValue: "",
      lastSearchHit: "",
      query: "",
      searchValue: ""
    }));
  };

  const onHandleSearchOpen = () => {
    /* Handle site scrolling. */
    onHandleSiteScroll(false);

    /* Set inputActive to true. */
    setQueries(queries => ({ ...queries, inputActive: true }));
  };

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
  }, [
    getResults,
    getSetOfResults,
    getSetOfResultsBySearchGroups,
    getShowResultsPanel
  ]);

  /* useEffect - componentDidMount/componentWillUnmount. */
  useEffect(() => {
    /* Grab the index. */
    fetchMetadataIndex();
  }, [fetchMetadataIndex]);

  /* useEffect - componentDidUpdate - searchValue, metadataIndexMounted. */
  /* Update setOfResultsBySearchGroups when index is mounted or with change in searchValue. */
  useEffect(() => {
    if (metadataIndexMounted) {
      /* Generate results. */
      const [
        _results,
        _setOfResultsBySearchGroups,
        _showResultsPanel
      ] = generateResults();

      /* Update state. */
      setOfResultsBySearchGroupsRef.current = _setOfResultsBySearchGroups;
      setResults(_results);
      setShowResultsPanel(_showResultsPanel);
    }
  }, [generateResults, metadataIndexMounted]);

  return (
    <ContextMetadataSearch.Provider
      value={{
        inputActive,
        inputValue,
        results,
        showResultsPanel,
        onHandleSearch,
        onHandleSearchClose,
        onHandleSearchOpen
      }}
    >
      {children}
    </ContextMetadataSearch.Provider>
  );
}

export default ProviderMetadataSearching;
