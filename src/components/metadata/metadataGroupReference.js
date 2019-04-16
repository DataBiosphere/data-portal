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
		const {children, element} = this.props,
			{description, name, title, type} = element,
			regex = /_/g;
		return (
			<div className={compStyles.metadataGroup}>
				<div className={compStyles.metadataGroupReference}>
					<span className={classNames(fontStyles.xs, fontStyles.regular, compStyles.title)}>{title}</span>
					<span className={classNames(fontStyles.xxs, compStyles.type)}>{name.replace(regex, ' ')} {type}</span>
					<span className={classNames(fontStyles.xxs, compStyles.description)}>{description}</span>
				</div>
				{children}
			</div>
		);
	}
}

export default MetadataGroupReference;
