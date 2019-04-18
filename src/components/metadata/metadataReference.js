/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata reference component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import MetadataDetail from './metadataDetail';

// Styles
import compStyles from './metadataReference.module.css';
import * as StringFormat from '../../utils/string-format.service';

class MetadataReference extends React.Component {

	render() {
		const {elementRef, isFirst, elementRefRequired} = this.props,
			{name, properties} = elementRef,
			{description, items, type, user_friendly} = properties,
			elementType = type ? type : items && items._ref ? items.type : null,
			regex = /_/g;
		return (
			<div className={compStyles.metadataGroup}>
				{isFirst ? <MetadataDetail
					description={description}
					groupRef={true}
					isRequired={elementRefRequired}
					label={user_friendly ? user_friendly : StringFormat.convertSentenceCasetoTitleCase(name.replace(regex, ' '))}
					type={elementType}/> : null}
			</div>
		);
	}
}

export default MetadataReference;
