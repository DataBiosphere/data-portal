/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata properties component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataProperty from "../metadataProperty/metadataProperty";

class MetadataProperties extends React.Component {

    render() {
        const {properties, showAllMetadata} = this.props;
        return (
            properties.map((property, p) => <MetadataProperty key={p}
                                                              property={property}
                                                              showAllMetadata={showAllMetadata}/>)
        );
    }
}

export default MetadataProperties;
