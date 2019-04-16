/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import MetadataGroupReference from './metadataGroupReference';
import MetadataInternalRow from './metadataInternalRow';
import MetadataRow from './metadataRow';

class Metadata extends React.Component {

	getInternalRef = (property) => {
		let myRef = this.getPropertyRef(property)[1].split('/');
		return myRef[myRef.length - 1];
	};

	getInternalRequired = (property) => {
		return this.getPropertyRefProperties(property).definitions[this.getInternalRef(property)].required;
	};

	getPropertyRef = (property) => {

		// Return a value if property has _ref or items._ref value
		// Return an empty string if both values are null
		let propertyReference = property.properties._ref ? property.properties._ref.split('.json') : property.properties.items && property.properties.items._ref ? property.properties.items._ref.split('.json') : '';

		return propertyReference;
	};

	getPropertyRefProperties = (property) => {

		let propertyRef = this.getPropertyRef(property);

		// Return empty if there are no array/object references
		if (propertyRef === '') {
			return '';
		}

		// Return the properties of the referenced module object/array
		return this.props.reference.filter(reference => reference.relativeFilePath.includes(propertyRef[0]))[0];
	};

	render() {
		const {entity, unFriendly} = this.props,
			{properties, required} = entity;
		return (
			<div>
				{properties.map((e1, i) =>
					this.getPropertyRef(e1) !== '' ?
						<MetadataGroupReference key={i} element={e1} elementChild={this.getPropertyRefProperties(e1)}
												required={required.includes(e1.name)}>
							{this.getPropertyRef(e1)[1].includes('#') ?
								this.getPropertyRefProperties(e1).definitions[this.getInternalRef(e1)].properties.map((i2, l) =>
									<MetadataInternalRow key={l} element={i2} required={this.getInternalRequired(e1)}
														 unFriendly={`${unFriendly}.${e1.name}.${i2.name}`}/>) :
								this.getPropertyRefProperties(e1).properties.map((e2, j) =>
									this.getPropertyRef(e2) !== '' ? this.getPropertyRefProperties(e2).properties.map((e3, k) =>
											<MetadataRow key={k} element={e3}
														 required={this.getPropertyRefProperties(e2).required}
														 unFriendly={`${unFriendly}.${e1.name}.${e2.name}.${e3.name}`}/>) :
										<MetadataRow key={j} element={e2}
													 required={this.getPropertyRefProperties(e1).required}
													 unFriendly={`${unFriendly}.${e1.name}.${e2.name}`}/>)}
						</MetadataGroupReference> :
						<MetadataRow key={i} element={e1} required={required}
									 unFriendly={`${unFriendly}.${e1.name}`}/>)}
			</div>
		);
	}
}

export default Metadata;
