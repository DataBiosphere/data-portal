/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field ref intro component.
 * Introduces a property field referencing another schema.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./metadataSchemaPropertyFieldRefIntro.module.css";

function MetadataSchemaPropertyFieldRefIntro(props) {

    const {property} = props,
        {label, _ref, schema} = property || {},
        {title} = schema || {};
    const showReference = !!_ref;

    return (
        showReference ?
            <h4 className={compStyles.intro}>{title} / {label}</h4> : null
    );
}

export default MetadataSchemaPropertyFieldRefIntro;
