/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import MetadataRow from './metadataRow';

// Styles
import compStyles from './metadata.module.css';

class Metadata extends React.Component {

	getObjectRef = (arrayRef, objectRef) => {

		// Get the array/object reference
		const ref = arrayRef !== '' ? arrayRef : objectRef;

		// Return empty if there are no array/object references
		if (ref === '') {
			return '';
		}

		// Return the corresponding module that the array/object references (using relativeFilePath to find the reference)
		return this.props.reference.filter(module => module.relativeFilePath.includes(ref));
	};

	getObjectRefProperties = (arrayRef, objectRef) => {

		// Return the properties of the referenced module object/array
		return this.getObjectRef(arrayRef, objectRef)[0].properties.filter((nestedElement) => {
			return nestedElement.name !== 'describedBy' && nestedElement.name !== 'schema_version' && nestedElement.name !== 'schema_type' && nestedElement.name !== 'provenance';
		});
	};

	render() {
		const {entity, unFriendly} = this.props,
			{properties} = entity;
		return (
			<div className={compStyles.metadata}>
				{properties.filter((e) => {
					return e.name !== 'describedBy' && e.name !== 'schema_version' && e.name !== 'schema_type' && e.name !== 'provenance';
				}).map((e1, i) =>
				this.getObjectRef(e1.arrayModuleRef, e1.objectModuleRef).length ?
					this.getObjectRefProperties(e1.arrayModuleRef, e1.objectModuleRef).map((e2, j) =>
								this.getObjectRef(e2.arrayModuleRef, e2.objectModuleRef).length ?
									this.getObjectRefProperties(e2.arrayModuleRef, e2.objectModuleRef).map((e3, k) =>
										<MetadataRow key={k} element={e3}
													 unFriendly={`${unFriendly}.${e2.name}.${e1.name}`}/>) :
									<MetadataRow key={j} element={e2} unFriendly={`${unFriendly}.${e1.name}`}/>) :
					<MetadataRow key={i} element={e1} unFriendly={unFriendly}/>)}
			</div>
		);
	}
}

export default Metadata;
