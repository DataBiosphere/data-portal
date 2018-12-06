/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal homepage autosuggest component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import HCAAutosuggest from "../hcaAutosuggest/hcaAutosuggest";
import * as numberFormatter from "../../utils/number-format.service";
import * as stringFormatter from "../../../src/utils/string-format.service";

// Styles
import compStyles from './homepageAutosuggest.module.css';
import globalStyles from '../../styles/global.module.css';
const classNames = require('classnames');

// Facet blacklist - exclude from autosuggest
const FACET_BLACKLIST = [
    "contactName",
    "laboratory",
    "organismAge",
    "organismAgeUnit"
];

// Facet display names
const FACET_DISPLAY_NAMES = {
    "disease": "knownDiseases"
};

class HomepageAutosuggest extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false, // True if user has entered suggestion text that results in no hits
            selectedFacet: "",
            selectedTerm: ""
        };
        this.onSelected = this.onSelected.bind(this);
    }

    buildExploreDataCategory = (facetName, terms) => {

        const selectableTerms = terms
            .filter(term => !!term.term)
            .map((term) => {
                return {
                    termName: term.term,
                    termCount: numberFormatter.format(term.count, 1)
                }
            });

        return {
            facetName: facetName,
            facetDisplayName: stringFormatter.convertCamelCasetoTitleCase(facetName),
            terms: selectableTerms
        };
    };

    clearSelectedFacet = () => {

        this.setState({
            selectedFacet: "",
            selectedTerm: ""
        });
    };

    getExploreData = () => {

        let data = [];
        if (this.isDataInitialized()) {

            data.push({
                facetName: "error",
                facetDisplayName: "Oops! We don’t have an exact match, it may be called by a different name. Scroll through the list to see what data we currently have available.",
                terms: []
            });

            const termFacets = this.listSelectableTermFacets(this.props.termFacets)
                .map((facet) => {
                    
                    const displayName = FACET_DISPLAY_NAMES[facet.facetName];
                    if ( displayName ) {
                        return Object.assign({}, facet, {
                            facetName: displayName
                        });
                    }
                    return facet;
                });
            termFacets.sort((facet0, facet1) => {
                return facet0.facetName > facet1.facetName ? 1 : -1;
            });
            termFacets.forEach((termFacet) => {
                data.push(this.buildExploreDataCategory(termFacet.facetName, termFacet.terms));
            });
        }

        return data;
    };

    getPlaceholder = () => {

        const browser = typeof window !== "undefined";
        let windowWidth = browser && window.innerWidth;

        if (this.isDataInitialized()) {

            if (windowWidth < 1024) {
                return "Search for data by organs";
            }
            return "Search for data now by organs, projects, etc";
        }

        return "Loading data..."
    };

    getSearchButtonClass = () => {

        if (this.isDataInitialized()) {

            return classNames({
                [globalStyles.button]: true,
                [compStyles.button]: true,
                [globalStyles.accent]: true,
                [globalStyles.hero]: true
            });
        }

        return classNames({
            [globalStyles.button]: true,
            [compStyles.button]: true,
            [globalStyles.hero]: true,
            [globalStyles.disabled]: true
        });
    };

    isDataInitialized = () => {

        return this.props.termFacets;
    };

    listSelectableTermFacets = (termFacets) => {

        return termFacets.filter(termFacet => {

            return FACET_BLACKLIST.indexOf(termFacet.facetName) === -1;
        });
    };

    onBlur = () => {

        this.clearSelectedFacet();
    };

    onEnter = () => {

        this.visitExploreLink();
    };

    onSelected = (term) => {

        if (term) {

            let facetName = this.getExploreData().filter(t => t.terms.find(f => f.termName === term));
            this.setState({selectedFacet: facetName[0].facetName, selectedTerm: term});
        }
        else {

            this.clearSelectedFacet();
        }
    };

    onSuggestionsFound = (suggestionsFound) => {

        this.setState({disabled: !suggestionsFound});
    };

    visitExploreLink = () => {

        if (this.state.selectedTerm) {
            const facetFilter = JSON.stringify([{
                "facetName": this.state.selectedFacet,
                "terms": [this.state.selectedTerm]
            }]);
            window.location.href = `${process.env.GATSBY_EXPLORE_URL}projects?filter=${facetFilter}`;
        }
    };

    render() {
        return (
            <div className={compStyles.hompageAutosuggest}>
                <HCAAutosuggest autosuggestData={this.getExploreData()}
                                disabled={!this.isDataInitialized()}
                                placeholder={this.getPlaceholder()}
                                homepage={true}
                                showCount={false}
                                onBlur={this.onBlur.bind(this)}
                                onEnter={this.onEnter.bind(this)}
                                onSelected={this.onSelected.bind(this)}
                                onSuggestionsFound={this.onSuggestionsFound.bind(this)}/>
                <a onClick={this.visitExploreLink} className={this.getSearchButtonClass()}>Search</a>
            </div>
        );
    }
}

export default HomepageAutosuggest;
