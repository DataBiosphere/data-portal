/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata group component.
 */

// Core dependencies
import React from 'react';

// Styles
import compStyles from './metadataGroupReference.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class MetadataGroupReference extends React.Component {

	render() {
		const {children, element, elementChild, required} = this.props,
			{properties} = element,
			{name} = elementChild,
			{description, items, _ref, type, user_friendly} = properties,
			regex = /_/g,
			elementType = type ? type : items && items._ref ? items.type : null,
			isRef = _ref || (items && items._ref),
			elementRef = _ref ? _ref : (items && items._ref) ? items._ref : '',
			isInternal = elementRef.includes('#');
		return (
			<div className={compStyles.metadataGroup}>
				<div className={compStyles.metadataGroupReference}>
					<span
						className={classNames(fontStyles.m, compStyles.title)}>{user_friendly}<span
						className={fontStyles.xs}>{required ? '*' : null}</span></span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>{isRef && !isInternal ? `${name.replace(regex, ' ')}` : null} {!isInternal && elementType === 'array' ? elementChild.type : null} {elementType}</span>
					<span className={classNames(fontStyles.xs, compStyles.description)}>{description}</span>
				</div>
				{children}
			</div>
		);
	}
}

export default MetadataGroupReference;
