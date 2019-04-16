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

class MetadataInternalRow extends React.Component {

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

	render() {
		const {element, required, unFriendly} = this.props,
			{name, description, type} = element,
			regex = /_/g;
		return (
			<div className={compStyles.metadataRow}>
				<div className={compStyles.metadataDetails}>
					<span
						className={classNames(fontStyles.xs, fontStyles.semiBold)}>{name.replace(regex, ' ')}<span
						className={fontStyles.xs}>{required && required.includes(name) ? '*' : null}</span>
					</span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>{type}</span>
					<Linkify className={classNames(fontStyles.xs, compStyles.description)}>{description}</Linkify>
					<span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}
						  dangerouslySetInnerHTML={{__html: this.wrapByPeriod(unFriendly)}}/>
				</div>
			</div>
		);
	}
}

export default MetadataInternalRow;
