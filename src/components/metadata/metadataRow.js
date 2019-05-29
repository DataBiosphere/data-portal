/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata row component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import MetadataDetail from './metadataDetail';

// Styles
import compStyles from './metadataRow.module.css';

const classNames = require('classnames');

class MetadataRow extends React.Component {

	listByEnum = (propertyEnum) => {

		let noOfEnums = propertyEnum.length - 1;
		return propertyEnum.map((e, i) => {
			return i === 0 ? `Should be one of: "${e}"` : i !== noOfEnums ? `, "${e}"` : ` or "${e}"`;
		}).join('');
	};

	listByExample = (example) => {

		let regex = /"/g;
		let examples = example.replace(regex, "").split('; ');
		let noOfExamples = examples.length - 1;
		return examples.map((e, i) => {
			return i === 0 ? `e.g. "${e}"` : i !== noOfExamples ? `, "${e}"` : ` or "${e}"`;
		}).join('');
	};

	render() {
		const {children, element, elementParent, groupRef, isLast, requiredList, unFriendly, unGrouped} = this.props;
		const {name, properties} = element,
			required = requiredList || (elementParent && elementParent.required),
			isRequired = required && required.includes(name),
			{description, example, items, _ref, type, user_friendly} = properties,
			propertyEnum = properties.enum,
			exampleOrEnum = properties.enum ? `${this.listByEnum(propertyEnum)}.` : example ? `${this.listByExample(example)}.` : null,
			regex = /_/g,
			whiteSpace = /\s/g,
			anchor = unFriendly.replace(whiteSpace, '').replace(/\./g, '-'),
			isRef = _ref || (items && items._ref),
			elementTypeName = type ? type : items && items._ref ? items.type : '',
			enumTypeName = propertyEnum ? 'enum' : '',
			detailTypeName = element === elementParent ? '' : isRef ? name.replace(regex, ' ') : '',
			elementType = detailTypeName.concat(' ', elementTypeName).concat(' ', enumTypeName).trim();
		return (
			<div>
				<div id={anchor}
					 className={classNames({[compStyles.unGrouped]: unGrouped}, compStyles.metadataRow, {[compStyles.groupEnd]: isLast})}>
					<MetadataDetail anchor={anchor}
									exampleOrEnum={exampleOrEnum}
									description={description}
									groupRef={groupRef}
									isRequired={isRequired}
									label={user_friendly ? user_friendly : name}
									type={elementType}
									unFriendly={unFriendly}/>
				</div>
				{children}
			</div>
		);
	}
}

export default MetadataRow;
