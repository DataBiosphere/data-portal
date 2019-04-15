/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata row component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Linkify from 'react-linkify';

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

	splitRef = (ref) => {
		let regex = /_/g;
		let splitRef = ref.split('/');

		return splitRef[splitRef.length - 1].split('.')[0].replace(regex, ' ');
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
		const {element, required, unFriendly} = this.props;
		const {name, properties} = element,
			{description, example, items, _ref, type, user_friendly} = properties,
			itemRefOrType = items ? items._ref ? this.splitRef(items._ref) : items.type : '',
			objectName = _ref ? this.splitRef(_ref) : '',
			propertyEnum = properties.enum,
			exampleOrEnum = properties.enum ? `${this.listByEnum(propertyEnum)}.` : example ? `${this.listByExample(example)}.` : null;

		return (
			<div className={compStyles.metadataRow}>
				<div className={compStyles.metadataDetails}>
					<span
						className={classNames(fontStyles.xs, fontStyles.semiBold)}>{user_friendly ? user_friendly : name}<span
						className={fontStyles.xs}>{required && required.includes(name) ? '*' : null}</span>
					</span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>
							{type === 'object' ? `${objectName} ` : type === 'array' ? `${itemRefOrType} ` : null}{type}</span>
					<Linkify className={classNames(fontStyles.xs, compStyles.description)}>{description}</Linkify>
					<span className={classNames(fontStyles.xxs, compStyles.example)}>{exampleOrEnum}</span>
					<span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}
						  dangerouslySetInnerHTML={{__html: this.wrapByPeriod(unFriendly)}}/>
				</div>
			</div>
		);
	}
}

export default MetadataRow;
