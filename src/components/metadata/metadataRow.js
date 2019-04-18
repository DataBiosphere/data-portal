/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata row component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import HeadingTag from '../anchor/anchor';
import Linkify from 'react-linkify';
import MetadataReference from './metadataReference';

// Styles
import compStyles from './metadataRow.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class MetadataRow extends React.Component {

	/**
	 * Returns the unFriendly list separated by <span> for each unFriendly.
	 * Allows wrapping of the list if required.
	 * @param unFriendlyList
	 * @returns {string}
	 */
	wrapByPeriod = (unFriendlyList) => {
		return unFriendlyList.split('.').map((u, i) => {

			if (i === 0) {
				return `<span>${u}</span>`;
			}
			return `<span>.${u}</span>`;
		}).join('');
	};

	listByEnum = (propertyEnum) => {

		let noOfEnums = propertyEnum.length - 1;
		return propertyEnum.map((e, i) => {
			return i === 0 ? `Should be one of: "${e}"` : i !== noOfEnums ? `, "${e}"` : ` or "${e}"`;
		}).join('');
	};

	listByExample = (example) => {

		let regex = /"/g;
		let examples = example.replace(regex, "").split('; ');
		let noOfExamples = examples.length - 1;
		return examples.map((e, i) => {
			return i === 0 ? `e.g. "${e}"` : i !== noOfExamples ? `, "${e}"` : ` or "${e}"`;
		}).join('');
	};

	render() {
		const {element, elementParent, elementRef, elementRefChild, elementRefRequired, isFirst, isLast, unFriendly} = this.props;
		const {name, properties} = element,
			required = elementParent && elementParent.required,
			isRequired = required && required.includes(name),
			{description, example, items, _ref, type, user_friendly} = properties,
			propertyEnum = properties.enum,
			exampleOrEnum = properties.enum ? `${this.listByEnum(propertyEnum)}.` : example ? `${this.listByExample(example)}.` : null,
			regex = /_/g,
			whiteSpace = /\s/g,
			elementType = type ? type : items && items._ref ? items.type : null,
			isRef = _ref || (items && items._ref),
			anchor = unFriendly.replace(whiteSpace,'').replace(/\./g, '-');
		return (
			<div id={anchor} className={classNames(compStyles.metadataRow, {[compStyles.groupEnd]: isLast}, {[compStyles.groupBegin]: isFirst})}>
				<div className={compStyles.metadataDetails}>
					<span className={fontStyles.m}>{user_friendly ? user_friendly : name}<span
						className={fontStyles.xs}>{isRequired ? '*' : null}</span><HeadingTag anchor={anchor}/></span>
					<span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}
						  dangerouslySetInnerHTML={{__html: this.wrapByPeriod(unFriendly)}}/>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>{isRef ? name.replace(regex, ' ') : null} {elementType} {propertyEnum ? ' enum' : null}</span>
					<Linkify className={compStyles.description}>{description}</Linkify>
					<span className={classNames(fontStyles.xs, compStyles.example)}>{exampleOrEnum}</span>
				</div>
				{elementRef ? <MetadataReference elementRef={elementRef} elementRefChild={elementRefChild} elementRefRequired={elementRefRequired} isFirst={isFirst}/> : null}
			</div>
		);
	}
}

export default MetadataRow;
