/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property fields component.
 * Groups fields to give them the appearance of a single sentence.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaPropertyFieldDataType from "../metadataSchemaPropertyFieldDataType/metadataSchemaPropertyFieldDataType";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldExample from "../metadataSchemaPropertyFieldExample/metadataSchemaPropertyFieldExample";
import MetadataSchemaPropertyFieldGraphRestriction from "../metadataSchemaPropertyFieldGraphRestriction/metadataSchemaPropertyFieldGraphRestriction";
import MetadataSchemaPropertyFieldLabel from "../metadataSchemaPropertyFieldLabel/metadataSchemaPropertyFieldLabel";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFields(props) {

    const {property} = props;

    return (
        <>
        <p className={fontStyles.s}>
            <MetadataSchemaPropertyFieldLabel font={{weight: "regular"}} property={property}/>
            <span>:</span>
            <MetadataSchemaPropertyFieldDataType property={property}/>
            <MetadataSchemaPropertyFieldDescription property={property}/>
            <span> </span>
            <MetadataSchemaPropertyFieldExample property={property}/>
        </p>
        <MetadataSchemaPropertyFieldGraphRestriction property={property}/>
        </>
);
}

export default MetadataSchemaPropertyFields;
