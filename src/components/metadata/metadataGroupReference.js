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
		const {children, friendly} = this.props;

		return (
			<div className={compStyles.metadataGroup}>
				<div className={classNames(fontStyles.xs, compStyles.metadataGroupReference)}>
					<span>{friendly}</span>
				</div>
				{children}
			</div>
		);
	}
}

export default MetadataGroupReference;
