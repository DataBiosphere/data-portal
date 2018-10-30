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

const classNames = require('classnames');

// Vars
const SELECTABLE_TERM_FACET_NAMES = [
    "biologicalSex",
    "disease",
    "genusSpecies",
    "institution",
    "instrumentManufacturerModel",
    "laboratory",
    "organ",
    "organPart",
    "project"
];

class HomepageAutosuggest extends React.Component {

    constructor() {
        super();
        this.state = {selectedFacet: "", selectedTerm: ""};
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

    getExploreData = () => {

        let data = [];
        if (this.isDataInitialized()) {

            const termFacets = this.listSelectableTermFacets(this.props.termFacets);
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
                [compStyles.homepage]: true
            });
        }

        return classNames({
            [compStyles.homepage]: true,
            [compStyles.disabled]: true
        });
    };

    isDataInitialized = () => {

        return this.props.termFacets;
    };

    listSelectableTermFacets = (termFacets) => {

        return termFacets.filter(termFacet => {

            return SELECTABLE_TERM_FACET_NAMES.indexOf(termFacet.facetName) >= 0;
        });
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

            this.setState({selectedFacet: "", selectedTerm: ""});
        }
    };

    visitExploreLink = () => {

        if (this.state.selectedTerm) {
            const facetFilter = JSON.stringify([{
                "facetName": this.state.selectedFacet,
                "terms": [this.state.selectedTerm]
            }]);
            window.location.href = `${process.env.GATSBY_EXPLORE_URL}specimens?filter=${facetFilter}`;
        }
        if (!this.state.selectedTerm) {
            console.log("error");
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
                                onEnter={this.onEnter.bind(this)}
                                onSelected={this.onSelected.bind(this)}/>
                <a onClick={this.visitExploreLink} className={this.getSearchButtonClass()}>Search</a>
            </div>
        );
    }
}

export default HomepageAutosuggest;
