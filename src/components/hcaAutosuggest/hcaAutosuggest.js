/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal HCA autosuggest component.
 */

// Core dependencies
import Autosuggest from 'react-autosuggest';
import React from 'react';

// Styles
import compStyles from './hcaAutosuggest.module.css';
import autosuggestTheme from './autosuggestTheme.module.css';

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

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.props.autosuggestData.map(section => {
            return {
                facetName: section.facetName,
                facetDisplayName: section.facetDisplayName,
                terms: section.terms.filter(term => regex.test(term.termName))
            };
        }).filter(section => section.terms.length > 0);
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
        const noSuggestions = !isInputBlank && suggestions.length === 0;

        this.setState({
            suggestions: suggestions,
            noSuggestions
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

    render() {
        const {value, suggestions, noSuggestions} = this.state;
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange
        };

        return (
            <div className={this.props.homepage ? compStyles.homepage : null}>
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
                    suggestions={suggestions}
                    theme={autosuggestTheme}/>
                {
                    noSuggestions &&
                    <div className="no-suggestions">
                        No suggestions
                    </div>
                }
            </div>

        );
    }
}

export default HCAAutosuggest;
