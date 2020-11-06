/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata indexing component.
 */

// Core dependencies
import lunr from "lunr";
import React from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

class ProviderMetadataSearching extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleInput = (event) => {

            /* Update lastSearchHit state. */
            this.setState({
                lastSearchHit: "input",
            });

            /* Handle change in search value. */
            this.onHandleSearch(event);
        };

        this.onHandleSearchClose = () => {

            const {onHandleSiteScroll} = this.props;

            /* Handle site scrolling. */
            onHandleSiteScroll(true);

            this.setState({inputActive: false});
        };

        this.onHandleSearchOpen = () => {

            const {onHandleSiteScroll} = this.props;

            /* Handle site scrolling. */
            onHandleSiteScroll(false);

            this.setState({inputActive: true});
        };

        this.state = ({
            inputActive: false,
            inputValue: "",
            lastSearchHit: "",
            metadataIndex: [],
            metadataIndexMounted: false,
            query: "", // Analytics-specific value, used to specify the current query state when tracking a change
            searchValue: "",
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map(),
            onHandleInput: this.onHandleInput,
            onHandleSearchClose: this.onHandleSearchClose,
            onHandleSearchOpen: this.onHandleSearchOpen
        });
    }

    componentDidMount() {

        /* Grab the index. */
        this.fetchMetadataIndex();
    }

    componentDidUpdate(_, prevState) {

        /* Metadata index mounted - update results. */
        this.metadataIndexMountedStateChanged(prevState);

        /* Search state changed. */
        this.searchStateChanged(prevState);
    }

    componentWillUnmount() {

        this.setState = ({
            inputActive: false,
            inputValue: "",
            lastSearchHit: "",
            metadataIndex: [],
            metadataIndexMounted: false,
            query: "",
            searchValue: "",
            setOfResults: new Set(),
            setOfResultsBySearchGroups: new Map()
        });
    }

    buildInputValueString = (searchValue) => {

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
    };

    /**
     * Build the query string from the input value.
     *
     * @param inputValue
     */
    buildQuery = (inputValue) => {

        const selectedFacetTermsByFacet = new Map();

        if ( inputValue ) {

            selectedFacetTermsByFacet.set("search", inputValue);
        }

        // Convert selected facet terms to valid query string object
        return new URLSearchParams(selectedFacetTermsByFacet).toString();
    };

    fetchMetadataIndex = () => {

        const {metadataIndexFileName} = this.props;

        fetch(metadataIndexFileName)
            .then(res => res.json())
            .then(res => {
                const index = lunr.Index.load(res);

                this.setState({metadataIndex: index, metadataIndexMounted: true})
            })
            .catch(err => {
                console.log(err, "Error loading index");
            });
    };

    findIntersectionSetOfResults = (setOfResultsBySearchGroups) => {

        /* Sort the set of results by set size. */
        const sortedSetsOfResults = this.sortSetsOfResults(setOfResultsBySearchGroups);
        const firstSetOfResults = sortedSetsOfResults.shift();

        /* Create a new set of intersection results. */
        /* i.e. filter through the smallest set to confirm results exist in all other search group sets. */
        return new Set([...firstSetOfResults].filter(result => {

            return sortedSetsOfResults.every(setOfResults => setOfResults.has(result));
        }));
    };

    getResultsByQuery = (query) => {

        const {metadataIndex} = this.state;

        const queryString = `${query}`;
        const results = metadataIndex.search(queryString);

        return new Set(results.map(result => result.ref));
    };

    getSetOfInputResults = () => {

        const {setOfProperties} = this.props,
            {lastSearchHit, searchValue, setOfResultsBySearchGroups} = this.state;

        /* Continue with query if search value is valid. */
        if ( searchValue ) {

            /* Grab current set of results for the input. */
            const setOfResultsBySearchGroup = setOfResultsBySearchGroups.get("input");

            /* Continue with query if most recent "hit" was on the input. */
            if ( lastSearchHit === "input" || !setOfResultsBySearchGroup ) {

                const inputString = this.buildInputValueString(searchValue);

                return new Set(this.getResultsByQuery(inputString));
            }
            /* Otherwise, return input's current set of results. */
            /* i.e. early exit - the input isn't being queried at present and therefore its results are unchanged. */
            else {

                return setOfResultsBySearchGroup;
            }
        }

        /* Early exit - setOfProperties [property ids] returned if no input value registered. */
        return setOfProperties;
    };

    getSetOfResults = () => {

        /* Get the set of results by search groups. */
        const setOfResultsBySearchGroups = this.getSetOfResultsBySearchGroups();

        /* Update set of results by search group. */
        this.updateSetOfResultsBySearchGroups(setOfResultsBySearchGroups);

        /* Return any intersecting sets of results. i.e. searching will be "AND" between input and other specified search groups. */
        return this.findIntersectionSetOfResults(setOfResultsBySearchGroups);
    };

    getSetOfResultsBySearchGroup = (searchGroup) => {

        /* Return a set of results for the search group "input". */
        if ( searchGroup === "input" ) {

            return this.getSetOfInputResults();
        }
    };

    getSetOfResultsBySearchGroups = () => {

        const {setOfSearchGroups} = this.props;

        return [...setOfSearchGroups].reduce((acc, searchGroup) => {

            const resultsBySearchGroup = this.getSetOfResultsBySearchGroup(searchGroup);
            acc.set(searchGroup, resultsBySearchGroup);

            return acc;
        }, new Map());
    };

    isInputDenied = (inputValue) => {

        return MetadataSearchService.DenyListInputs.some(deniedInput => inputValue.includes(deniedInput));
    };

    isShowNoResultsPanel = (results) => {

        const {inputActive, inputValue} = this.state;
        const noResults = results && results.length === 0;

        return inputActive && inputValue && noResults;
    };

    isShowResultsPanel = (results) => {

        const {setOfProperties} = this.props,
            {inputActive, setOfResults} = this.state;
        const noResults = results && results.length === 0;
        const filteredResults = setOfProperties.size !== setOfResults.size;

        return inputActive && filteredResults && !noResults;
    };

    metadataIndexMountedStateChanged = (prevState) => {

        const {metadataIndexMounted} = this.state;

        const stateChanged = ( prevState.metadataIndexMounted !== metadataIndexMounted );

        if ( stateChanged ) {

            /* Update set of results. */
            this.updateSetOfResults();
        }
    };

    onHandleSearch = (inputValue) => {

        let searchValue = inputValue.trim();

        /* Pre process input value for any special character. */
        if ( this.isInputDenied(inputValue) ) {

            /* Replace ":" with "_". */
            /* Handles special searches for graph restrictions like ontologies, classes and relations where any value may include ":". */
            /* Lunr typically uses the colon as field based searching. Use of the colon whilst searching for a specific ontology return an error. */
            /* See https://lunrjs.com/guides/searching.html. */
            if ( inputValue.includes(":") ) {

                searchValue = inputValue.replace(/:/g, "_");
            }
            /* Handles input value with other special characters - prevents lunr search error. */
            /* Replaces any ";", "/", "\", "*", "~", "-", "^" or "+" with a non-space. */
            /* Replaces any multiple spaces and trims - improves lunr search performance. */
            else {

                searchValue = inputValue.replace(/[;/\\*~\-^+]/g, "").replace(/\s\s+/g, " ").trim();
            }
        }

        const currentQuery = this.buildQuery(inputValue);

        /* Update inputValue, query and searchValue state. */
        this.setState({
            inputValue: inputValue,
            query: currentQuery,
            searchValue: searchValue
        });
    };

    searchStateChanged = (prevState) => {

        const {searchValue, metadataIndexMounted} = this.state;

        const searchValueChanged = prevState.searchValue !== searchValue;

        if ( metadataIndexMounted && searchValueChanged ) {

            /* Update set of results. */
            this.updateSetOfResults();
        }
    };

    sortSetsOfResults = (setOfResultsBySearchGroups) => {

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

    updateSetOfResults = () => {

        /* Get the set of results. */
        const setOfResults = this.getSetOfResults();

        /* Clone setOfResults, and update state. */
        const setOfResultsClone = new Set(setOfResults);

        this.setState({setOfResults: setOfResultsClone});
    };

    updateSetOfResultsBySearchGroups = (setOfResultsBySearchGroups) => {

        /* Clone setOfResultsBySearchGroups and update state. */
        const setOfResultsBySearchGroupsClone = new Map(setOfResultsBySearchGroups);

        this.setState({setOfResultsBySearchGroups: setOfResultsBySearchGroupsClone});
    };

    render() {
        const {children, properties, resultKey, schemas, setOfProperties} = this.props,
            {inputActive, inputValue, setOfResults, onHandleInput, onHandleSearchClose, onHandleSearchOpen} = this.state;
        const results = MetadataSearchService.buildResults(schemas, properties, setOfResults, resultKey, setOfProperties, inputValue);
        const showNoResultsPanel = this.isShowNoResultsPanel(results);
        const showResultsPanel = this.isShowResultsPanel(results);
        return (
            <ContextMetadataSearch.Provider
                value={{inputActive, inputValue, results, showNoResultsPanel, showResultsPanel, onHandleInput, onHandleSearchClose, onHandleSearchOpen}}>
                {children}
            </ContextMetadataSearch.Provider>
        )
    }
}

export default ProviderMetadataSearching;
