/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search browser component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import * as stringFormatter from '../../../src/utils/string-format.service';
import * as numberFormatter from '../../utils/number-format.service';
import ClickHandler from "../clickHandler/clickHandler";
import HCAAutosuggest from '../hcaAutosuggest/hcaAutosuggest';

// Styles
import mainStyles from '../../pages/index.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';
import compStyles from './searchBrowser.module.css';

const classNames = require('classnames');

// Facet search allow list
const ACCEPT_SEARCH_FACETS = [
    "biologicalSex",
    "cellLineType",
    "developmentStage",
    "donorDisease",
    "fileFormat",
    "fileSource",
    "genusSpecies",
    "institution",
    "instrumentManufacturerModel",
    "libraryConstructionApproach",
    "modelOrgan",
    "modelOrganPart",
    "nucleicAcidSource",
    "organ",
    "organismAgeValue",
    "organPart",
    "pairedEnd",
    "preservationMethod",
    "projectTitle",
    "publicationTitle",
    "sampleDisease",
    "sampleEntityType",
    "selectedCellType",
    "specimenDisease",
    "specimenOrgan",
    "specimenOrganPart",
    "workflow"
];

// Facet display names
const FACET_DISPLAY_NAMES = {
    "libraryConstructionApproach": "libraryConstructionMethod",
    "sampleEntityType": "sampleType",
    "specimenOrgan": "organ",
    "specimenOrganPart": "organPart",
    "workflow": "analysisProtocol"
};

class SearchBrowser extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false, // True if user has entered suggestion text that results in no hits
            selectedFacet: '',
            selectedTerm: ''
        };
        this.onSelected = this.onSelected.bind(this);
    }

    /**
     * Create category (facet) and options (terms) to back autosuggest.
     *
     * @param facetName
     * @param facetDisplayName
     * @param terms
     * @returns {{facetName: *, facetDisplayName: *, terms: *}}
     */
    buildExploreDataCategory = (facetName, facetDisplayName, terms) => {

        // Map terms - use display name if specified (projectId facet terms only)
        const selectableTerms = terms
            .filter(term => !!term.term)
            .map((term) => {
                return {
                    termName: term.term,
                    termDisplayName: term.termDisplayName || term.term,
                    termCount: numberFormatter.format(term.count, 1)
                }
            });

        // Sort terms
        selectableTerms.sort((t0, t1) => {
            const sortValue0 = t0.termDisplayName.toLowerCase();
            const sortValue1 = t1.termDisplayName.toLowerCase();
            if ( sortValue0 > sortValue1 ) {
                return 1;
            }
            if ( sortValue0 < sortValue1 ) {
                return -1;
            }
            return 0;
        });

        // Return model for backing autosuggest
        return {
            facetName: facetName,
            facetDisplayName: stringFormatter.convertCamelCasetoTitleCase(facetDisplayName),
            terms: selectableTerms
        };
    };

    clearSelectedFacet = () => {

        this.setState({
            selectedFacet: '',
            selectedTerm: ''
        });
    };

    getExploreData = () => {

        let data = [];
        if ( this.isDataInitialized() ) {

            data.push({
                facetName: 'error',
                facetDisplayName: 'Oops! We don’t have an exact match, it may be called by a different name. Scroll through the list to see what data we currently have available.',
                terms: []
            });

            // Filter facets to allow list, map facet display name if necessary. 
            const termFacets = this.listSelectableTermFacets(this.props.termFacets)
                .map((facet) => {

                    return Object.assign({}, facet, {
                        facetDisplayName: FACET_DISPLAY_NAMES[facet.facetName] || facet.facetName
                    });
                });

            // Sort option categories
            termFacets.sort((facet0, facet1) => {
                return facet0.facetDisplayName > facet1.facetDisplayName ? 1 : -1;
            });

            // Create category/option model for backing autosuggest
            termFacets.forEach((termFacet) => {
                data.push(
                    this.buildExploreDataCategory(termFacet.facetName, termFacet.facetDisplayName, termFacet.terms));
            });
        }

        return data;
    };

    getPlaceholder = () => {

        const browser = typeof window !== 'undefined';
        let windowWidth = browser && window.innerWidth;

        if ( this.isDataInitialized() ) {

            if ( windowWidth < 1024 ) {
                return 'Filter projects by attribute';
            }
            return 'Filter projects by attribute e.g. organ, project title.';
        }

        return 'Loading data...'
    };

    getSearchButtonClass = () => {

        if ( this.isDataInitialized() ) {

            return classNames({
                [globalStyles.button]: true,
                [globalStyles.blue]: true,
                [globalStyles.light]: true
            });
        }

        return classNames({
            [globalStyles.button]: true,
            [globalStyles.blue]: true,
            [globalStyles.light]: true,
            [globalStyles.disabled]: true
        });
    };

    isDataInitialized = () => {

        return this.props.termFacets;
    };

    listSelectableTermFacets = (termFacets) => {

        return termFacets.filter(termFacet => ACCEPT_SEARCH_FACETS.indexOf(termFacet.facetName) >= 0);
    };

    onBlur = () => {

        this.clearSelectedFacet();
    };

    onEnter = () => {

        this.visitExploreLink();
    };

    onSelected = (term) => {

        if ( term ) {

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

        if ( this.state.selectedTerm ) {
            const facetFilter = JSON.stringify([
                {
                    "facetName": this.state.selectedFacet,
                    "terms": [this.state.selectedTerm]
                }
            ]);
            const params = new URLSearchParams();
            params.set("filter", facetFilter);
            window.location.href = `${process.env.GATSBY_EXPLORE_URL}projects?${params.toString()}`;
        }
    };

    render() {
        return (
            <section className={compStyles.searchBrowser}>
                <div
                    className={classNames(globalStyles.flex, mainStyles.sectionInner, mainStyles.m,
                        compStyles.sectionInner)}>
                    <h4 className={classNames(globalStyles.bgDark, fontStyles.introTitle)}>Find Projects</h4>
                    <HCAAutosuggest autosuggestData={this.getExploreData()}
                                    disabled={!this.isDataInitialized()}
                                    placeholder={this.getPlaceholder()}
                                    showCount={false}
                                    onBlur={this.onBlur.bind(this)}
                                    onEnter={this.onEnter.bind(this)}
                                    onSelected={this.onSelected.bind(this)}
                                    onSuggestionsFound={this.onSuggestionsFound.bind(this)}/>
                    <ClickHandler
                        className={this.getSearchButtonClass()}
                        clickAction={this.visitExploreLink}
                        tag={'div'}>Go</ClickHandler>
                </div>
            </section>
        );
    }
}

export default SearchBrowser;
