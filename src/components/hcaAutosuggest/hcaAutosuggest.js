/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal HCA autosuggest component.
 */

// Core dependencies
import Autosuggest from '../reactAutosuggest/Autosuggest';
import React from 'react';

// App dependencies
import autosuggestTheme from './autosuggestTheme.module.css';
import compStyles from './hcaAutosuggest.module.css';

// Styles
const classNames = require('classnames');

const getHomePageClassName = (homepage, suggestionsFound) => {
	return classNames({
		[compStyles.homepage]: homepage,
		[compStyles.error]: !suggestionsFound
	});
};

class HCAAutosuggest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			highlightedSuggestion: '',
			suggestions: [],
			suggestionsFound: false,
			touched: false,
			value: ''
		};
	}

	escapeRegexCharacters = (str) => {

		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	};

	getSectionSuggestions = (section) => {

		return section.terms;
	};

	findMatchingSuggestions = value => {

		const escapedValue = this.escapeRegexCharacters(value.trim());
		const regex = new RegExp(escapedValue, 'i');

		return this.props.autosuggestData
			.map((section, i) => {
				return {
					facetName: section.facetName,
					facetDisplayName: section.facetDisplayName,
					terms: section.terms.filter(term => regex.test(term.termName))
				};
			})
			.filter(section => section.terms.length > 0);
	};

	getSuggestionValue = suggestion => suggestion.termName;

	onChange = (event, {newValue, method}) => {

		this.props.onSelected();
		this.setState({value: newValue});

		if (method === 'enter') {

			this.props.onSelected(this.state.highlightedSuggestion.termName);
			this.props.onEnter();
		}
	};

	onSuggestionsClearRequested = () => {

		this.setState({
			suggestions: []
		});
	};

	onSuggestionsFetchRequested = ({value}) => {

		// Determine if user has entered input - we know this if component state was previous touched, or was previously
		// not touched and we now have a value
		const touched = this.state.touched || (!this.state.touched && !!value);

		let suggestions = this.findMatchingSuggestions(value);
		const suggestionsFound = !!suggestions.length;
		this.setState({
			suggestionsFound: suggestionsFound,
			suggestions: suggestions.length ? suggestions : this.props.autosuggestData,
			touched: true
		});

		if (touched) {
			this.props.onSuggestionsFound(suggestionsFound);
		}
	};

	/* Always returns valid value - i.e. first value on list highlighted */
	/* Removes need to select from the list */
	onSuggestionHighlighted = ({suggestion}) => {

		this.setState({highlightedSuggestion: suggestion});

		if (suggestion) {

			this.props.onSelected(suggestion.termName);
		}
	};

	onSuggestionSelected = (event, value) => {

		this.props.onSelected(value.suggestionValue);
		this.props.onEnter();
	};

	renderSectionTitle = (section) => section.facetDisplayName;

	renderSuggestion = suggestion => {

		const {showCounts} = this.props;
		return (
			<div className={compStyles.hcaOption}>
				<span>{suggestion.termName}</span>{showCounts ? <span>{suggestion.termCount}</span> : null}
			</div>
		);
	};

	shouldRenderSuggestions = () => {

		return true;
	};

	render() {
		const {value, suggestions, suggestionsFound} = this.state;
		const inputProps = {
			disabled: this.props.disabled,
			onBlur: this.props.onBlur,
			onChange: this.onChange,
			placeholder: this.props.placeholder,
			value
		};

		return (
			<div className={getHomePageClassName(this.props.homepage, suggestionsFound)}>
				<Autosuggest
					alwaysRenderSuggestions={true}
					getSectionSuggestions={this.getSectionSuggestions}
					getSuggestionValue={this.getSuggestionValue}
					highlightFirstSuggestion={true}
					inputProps={inputProps}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					onSuggestionHighlighted={this.onSuggestionHighlighted}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionSelected={this.onSuggestionSelected}
					multiSection={true}
					renderSuggestion={this.renderSuggestion}
					renderSectionTitle={this.renderSectionTitle}
					shouldRenderSuggestions={this.shouldRenderSuggestions}
					suggestions={suggestions}
					suggestionsFound={suggestionsFound}
					theme={autosuggestTheme}/>
			</div>
		);
	}
}

export default HCAAutosuggest;
