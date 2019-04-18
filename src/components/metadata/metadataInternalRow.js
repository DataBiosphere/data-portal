/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata row component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import MetadataReference from './metadataReference';
import HeadingTag from '../anchor/anchor';
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
		const {element, elementRef, elementRefRequired, isFirst, isLast, required, unFriendly} = this.props,
			{name, description, type} = element,
			regex = /_/g,
			whiteSpace = /\s/g,
			anchor = unFriendly.replace(whiteSpace,'').replace(regex, '-').replace(/\./g, '-');
		return (
			<div id={anchor} className={classNames(compStyles.metadataRow, {[compStyles.groupEnd]: isLast}, {[compStyles.groupBegin]: isFirst})}>
				<div className={compStyles.metadataDetails}>
					<span className={classNames(fontStyles.xs, fontStyles.semiBold)}>{name.replace(regex, ' ')}<span
						className={fontStyles.xs}>{required && required.includes(name) ? '*' : null}</span><HeadingTag anchor={anchor}/>
					</span>
					<span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}
						  dangerouslySetInnerHTML={{__html: this.wrapByPeriod(unFriendly)}}/>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>{type}</span>
					<Linkify className={classNames(fontStyles.xs, compStyles.description)}>{description}</Linkify>
				</div>
				{elementRef ? <MetadataReference elementRef={elementRef} elementRefRequired={elementRefRequired} isFirst={isFirst}/> : null}
			</div>
		);
	}
}

export default MetadataInternalRow;
