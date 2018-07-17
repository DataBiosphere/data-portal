/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal HCA autosuggest component.
 */

// Core dependencies
import Autosuggest from 'react-autosuggest';
import React from 'react';

// App dependencies
const classNames = require('classnames');

// Styles
import compStyles from './hcaAutosuggest.module.css';
import autosuggestTheme from './autosuggestTheme.module.css';

const getHomePageClassName = (homepage, noSuggestions) => {

    return classNames({
        [compStyles.homepage]: homepage,
        [compStyles.error]: noSuggestions
    });
};

class HCAAutosuggest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            noSuggestions: false
        };
    }

    escapeRegexCharacters = (str) => {

        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    getSectionSuggestions = (section) => {

        return section.terms;
    };

    getSuggestions = value => {

        const escapedValue = this.escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');

        const suggestion = this.props.autosuggestData.map((section, i) => {
            return {
                facetName: section.facetName,
                facetDisplayName: section.facetDisplayName,
                terms: section.terms.filter(term => regex.test(term.termName))
            };
        }).filter(section => section.terms.length > 0);

        if (suggestion.length) {
            this.setState({noSuggestions: false});
            return suggestion;
        }
        else {
            this.setState({noSuggestions: true});
            return this.props.autosuggestData;
        }
    };

    getSuggestionValue = suggestion => suggestion.termName;

    onChange = (event, {newValue}) => {

        this.props.onSelected();
        this.setState({
            value: newValue
        });
    };

    onSuggestionsClearRequested = () => {

        this.setState({
            suggestions: []
        });
    };

    onSuggestionsFetchRequested = ({value}) => {

        const suggestions = this.getSuggestions(value);
        const isInputBlank = value.trim() === '';

        this.setState({
            suggestions: suggestions
        });
    };

    onSuggestionSelected = (event, value) => {

        this.props.onSelected(value.suggestionValue);
    };

    renderSectionTitle = (section) => section.facetDisplayName;

    renderSuggestion = suggestion => {

        return (
            <div className={compStyles.hcaOption}>
                <span>{suggestion.termName}</span><span>{suggestion.termCount}</span>
            </div>
        );
    };

    shouldRenderSuggestions = () => {

        return true;
    };

    render() {
        const {value, suggestions, noSuggestions} = this.state;
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange
        };

        return (
            <div className={getHomePageClassName(this.props.homepage, noSuggestions)}>
                <Autosuggest
                    getSectionSuggestions={this.getSectionSuggestions}
                    getSuggestionValue={this.getSuggestionValue}
                    inputProps={inputProps}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    multiSection={true}
                    renderSuggestion={this.renderSuggestion}
                    renderSectionTitle={this.renderSectionTitle}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    suggestions={suggestions}
                    theme={autosuggestTheme}/>
            </div>

        );
    }
}

export default HCAAutosuggest;
