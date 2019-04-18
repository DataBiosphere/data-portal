/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata detail component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import HeadingTag from '../anchor/anchor';
import Linkify from 'react-linkify';

// Styles
import compStyles from './metadataDetail.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class MetadataDetail extends React.Component {

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
		const {anchor, exampleOrEnum, description, groupRef, isRequired, label, type, unFriendly} = this.props;
		return (
			<div className={classNames(compStyles.metadataDetail, {[compStyles.byGroup]: groupRef})}>
					<span className={classNames(fontStyles.m, compStyles.title)}>{label}
						{isRequired ? <span className={fontStyles.xs}>*</span> : null}
						{anchor ? <HeadingTag anchor={anchor}/> : null}</span>
				{unFriendly ? <span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}
									dangerouslySetInnerHTML={{__html: this.wrapByPeriod(unFriendly)}}/> : null}
				{type ? <span
					className={classNames(fontStyles.xxs, compStyles.type)}>{type}</span> : null}
				{description ? <Linkify className={classNames({[fontStyles.xs]: groupRef}, compStyles.description)}>{description}</Linkify> : null}
				{exampleOrEnum ?
					<span className={classNames(fontStyles.xs, compStyles.example)}>{exampleOrEnum}</span> : null}
			</div>
		);
	}
}

export default MetadataDetail;
