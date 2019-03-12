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
		return this.props.modules.filter(module => module.relativeFilePath.includes(ref));
	};

	getObjectRefProperties = (arrayRef, objectRef) => {

		// Return the properties of the referenced module object/array
		return this.getObjectRef(arrayRef, objectRef)[0].properties.filter((nestedElement) => {
			return nestedElement.name !== 'describedBy' && nestedElement.name !== 'schema_version' && nestedElement.name !== 'schema_type' && nestedElement.name !== 'provenance';
		});
	};

	render() {
		return (
			<div className={compStyles.metadata}>
				<h3>{this.props.entity.title}</h3>
				<div>
					{this.props.entity.properties.filter((element) => {
						return element.name !== 'describedBy' && element.name !== 'schema_version' && element.name !== 'schema_type' && element.name !== 'provenance';
					}).map((e, i) =>
						<div key={i} className={compStyles.metadataElement}>
							<MetadataRow element={e}/>
							{this.getObjectRef(e.arrayModuleRef, e.objectModuleRef).length ?
								<div className={compStyles.nested}>
									{this.getObjectRefProperties(e.arrayModuleRef, e.objectModuleRef).map((nestedElement, j) =>
										<MetadataRow key={j} element={nestedElement} nested={true}/>)}</div> : null}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Metadata;
