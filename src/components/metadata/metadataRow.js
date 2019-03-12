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

	render() {
		return (
			<div className={classNames(compStyles.metadataRow, {[compStyles.nested]: this.props.nested})}>
				<div className={compStyles.metadataName}>
							<span
								className={classNames({[fontStyles.xs]: !this.props.nested}, {[fontStyles.xxs]: this.props.nested})}>{this.props.element.userFriendly ? this.props.element.userFriendly : this.props.element.name}<span
								className={classNames({[fontStyles.xs]: !this.props.nested}, {[fontStyles.xxs]: this.props.nested})}>{this.props.element.required ? '*' : null}</span>
							</span>
					<span
						className={classNames(fontStyles.xxs, compStyles.type)}>
							{this.props.element.type === 'object' ? `${this.props.element.objectName} ` : this.props.element.type === 'array' ? this.props.element.arrayName ? `${this.props.element.arrayName} ` : `${this.props.element.arrayType} ` : null}{this.props.element.type}</span>
				</div>
				<Linkify
					className={classNames({[fontStyles.xs]: !this.props.nested}, {[fontStyles.xxs]: this.props.nested})}>{this.props.element.description}</Linkify>
			</div>
		);
	}
}

export default MetadataRow;
