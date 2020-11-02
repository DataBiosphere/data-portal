/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema properties component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaProperty from "../metadataSchemaProperty/metadataSchemaProperty";
import MetadataSchemaUsedBys from "../metadataSchemaUsedBys/metadataSchemaUsedBys";

class MetadataSchemaProperties extends React.Component {

    render() {
        const {properties, schema} = this.props;
        return (
            <>
            {properties.map((property, p) => <MetadataSchemaProperty key={p} property={property}/>)}
            <MetadataSchemaUsedBys schema={schema}/>
            </>
        );
    }
}

export default MetadataSchemaProperties;
