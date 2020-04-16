/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import ToggleButton from "../toggleButton/toggleButton";
import MetadataInternalRow from './metadataInternalRow';
import MetadataRow from './metadataRow';

// Styles
import buttonStyles from '../toggleButton/toggleButton.module.css';
import compStyles from './metadata.module.css';

class Metadata extends React.Component {

	constructor(props) {
		super(props);

		this.toggleRequiredMetadata = this.toggleRequiredMetadata.bind(this);
	}

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
		return property.properties._ref ? property.properties._ref.split('.json') : property.properties.items && property.properties.items._ref ? property.properties.items._ref.split('.json') : '';
	};

	getPropertyRefProperties = (property) => {

		let propertyRef = this.getPropertyRef(property);

		// Return empty if there are no array/object references
		if (propertyRef === '') {
			return '';
		}

		// Return the properties of the referenced module object/array
		return this.props.references.filter(reference => reference.relativeFilePath.includes(propertyRef[0]))[0];
	};

	toggleRequiredMetadata = () => {

		const {showAllMetadata} = this.props;

		this.props.onShowMetadata(showAllMetadata);
	};

	render() {
		const {entity, showAllMetadata, unFriendly} = this.props,
			{properties, required} = entity,
			toggleMessage = showAllMetadata ? 'Show Required Fields Only' : 'Show All Fields';
		return (
			<div className={compStyles.metadata}>
				<ToggleButton className={buttonStyles.metadata} clickAction={this.toggleRequiredMetadata}>{toggleMessage}</ToggleButton>
				{properties.map((e1, i) =>
					this.getPropertyRef(e1) !== '' ?
						<MetadataRow
							key={i}
							element={e1}
							elementParent={e1}
							groupRef={true}
							requiredList={required}
							showAllMetadata={showAllMetadata}
							unFriendly={`${unFriendly}.${e1.name}`}>{
							this.getPropertyRef(e1)[1].includes('#') ?
								this.getPropertyRefProperties(e1).definitions[this.getInternalRef(e1)].properties.map((i2, l) =>
									<MetadataInternalRow key={l}
														 element={i2}
														 elementParent={this.getPropertyRefProperties(e1)}
														 required={this.getInternalRequired(e1)}
														 unFriendly={`${unFriendly}.${e1.name}.${i2.name}`}/>) :
								this.getPropertyRefProperties(e1).properties.map((e2, j) =>
									this.getPropertyRef(e2) !== '' ? this.getPropertyRefProperties(e2).properties.map((e3, k) =>
											<MetadataRow key={k}
														 element={e3}
														 elementParent={this.getPropertyRefProperties(e2)}
														 showAllMetadata={showAllMetadata}
														 typeRef={unFriendly}
														 unFriendly={`${unFriendly}.${e1.name}.${e2.name}.${e3.name}`}/>) :
										<MetadataRow key={j}
													 element={e2}
													 elementParent={this.getPropertyRefProperties(e1)}
													 showAllMetadata={showAllMetadata}
													 typeRef={unFriendly}
													 unFriendly={`${unFriendly}.${e1.name}.${e2.name}`}/>)}</MetadataRow> :
						<MetadataRow key={i}
									 element={e1}
									 unGrouped={true}
									 requiredList={required}
									 showAllMetadata={showAllMetadata}
									 typeRef={unFriendly}
									 unFriendly={`${unFriendly}.${e1.name}`}/>)}
			</div>
		);
	}
}

export default Metadata;
