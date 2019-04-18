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
		const {elementRef, isFirst, elementRefRequired} = this.props,
			{properties} = elementRef,
			{description, items, type, user_friendly} = properties,
			elementType = type ? type : items && items._ref ? items.type : null;
		return (
			<div className={compStyles.metadataGroup}>
				{isFirst ? <div className={compStyles.groupDetails}>
					<span
						className={classNames(fontStyles.m, compStyles.title)}>{user_friendly}<span
						className={fontStyles.xs}>{elementRefRequired ? '*' : null}</span></span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>{elementType}</span>
					<span className={classNames(fontStyles.xs, compStyles.description)}>{description}</span>
				</div> : null}
			</div>
		);
	}
}

export default MetadataReference;
