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

	render() {
		const {element, unFriendly} = this.props,
			{arrayName, arrayType, description, name, objectName, required, type, userFriendly} = element;

		return (
			<div className={compStyles.metadataRow}>
				<div className={compStyles.metadataDetails}>
					<span
						className={classNames(fontStyles.xs, fontStyles.semiBold)}>{userFriendly ? userFriendly : name}<span
						className={fontStyles.xs}>{required ? '*' : null}</span>
					</span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>
							{type === 'object' ? `${objectName} ` : type === 'array' ? arrayName ? `${arrayName} ` : `${arrayType} ` : null}{type}</span>
					<Linkify className={classNames(fontStyles.xs, compStyles.description)}>{description}</Linkify>
					<span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}
						  dangerouslySetInnerHTML={{__html: this.wrapByPeriod(`${unFriendly}.${element.name}`)}}/>
				</div>
			</div>
		);
	}
}

export default MetadataRow;
