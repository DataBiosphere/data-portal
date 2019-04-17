/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata reference component.
 */

// Core dependencies
import React from 'react';

// Styles
import compStyles from './metadataReference.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class MetadataReference extends React.Component {

	render() {
		const {elementRef, elementRefChild, j, k, elementRefRequired} = this.props,
			{properties} = elementRef,
			{name} = elementRefChild,
			{description, items, _ref, type, user_friendly} = properties,
			showRef = j === 0 || (j === 0 && k === 0),
			regex = /_/g,
			elementType = type ? type : items && items._ref ? items.type : null,
			isRef = _ref || (items && items._ref),
			elementReference = _ref ? _ref : (items && items._ref) ? items._ref : '',
			isInternal = elementReference.includes('#');
		return (
			<div className={compStyles.metadataGroup}>
				{showRef ? <div className={compStyles.groupDetails}>
					<span
						className={classNames(fontStyles.m, compStyles.title)}>{user_friendly}<span
						className={fontStyles.xs}>{elementRefRequired ? '*' : null}</span></span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>{isRef && !isInternal ? `${name.replace(regex, ' ')}` : null} {!isInternal && elementType === 'array' ? elementRefChild.type : null} {elementType}</span>
					<span className={classNames(fontStyles.xs, compStyles.description)}>{description}</span>
				</div> : null}
			</div>
		);
	}
}

export default MetadataReference;
