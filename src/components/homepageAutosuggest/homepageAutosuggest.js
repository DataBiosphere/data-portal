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

// Styles
import compStyles from './homepageAutosuggest.module.css';

class HomepageAutosuggest extends React.Component {

    constructor() {
        super();
        this.state = {selectedFacet: "", selectedTerm: ""};
        this.onSelected = this.onSelected.bind(this);
    }

    buildExploreDataCategory = (facetName, facetDisplayName, categorySummary) => {

        return {
            facetName: facetName,
            facetDisplayName: facetDisplayName,
            terms: categorySummary.map((summary) => {
                return {
                    termName: summary.label,
                    termCount: numberFormatter.format(summary.count, 1)
                }
            })
        };
    };

    getExploreData = () => {
        
        let data = [];
        if ( this.isDataInitialized() ) {
            
            data.push({
                facetName: "error",
                facetDisplayName: "Oops! We don’t have an exact match, it may be called by a different name. Scroll through the list to see what data we currently have available.",
                terms: []
            });

            data.push(this.buildExploreDataCategory("organ", "Organ", this.props.organSummary));
            data.push(this.buildExploreDataCategory("fileFormat", "File Format", this.props.fileFormatSummary));
        }

        return data;
    };

    getPlaceholder = () => {

        const browser = typeof window !== "undefined";
        let windowWidth = browser && window.innerWidth;

        if (windowWidth < 1024) {
            return "Search for data by organs";
        }
        return "Search for data now by organs, projects, etc";
    };

    isDataInitialized = () => {

        return this.props.organSummary && this.props.fileFormatSummary;
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
    };

    render() {
        return (
            <div className={compStyles.hompageAutosuggest}>
                <HCAAutosuggest autosuggestData={this.getExploreData()} placeholder={this.getPlaceholder()} homepage={true}
                                onSelected={this.onSelected.bind(this)}/>
                <a onClick={this.visitExploreLink} className={compStyles.homepage}>Search</a>
            </div>
        );
    }
}

export default HomepageAutosuggest;
