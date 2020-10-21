/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field reference component.
 * Introduces a property field referencing another schema with the friendlies "path".
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";

// Styles
import compStyles from "./metadataSchemaPropertyFieldReference.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldReference(props) {

    const {property} = props,
        {propertyFriendlies, _ref} = property || {};
    const showReference = !!_ref && propertyFriendlies;
    const tertiary = showReference ? propertyFriendlies.length > 2 : false;

    return (
        showReference ?
            <h4 className={classNames(compStyles.reference, {[compStyles.tertiary]: tertiary})}>
                <MetadataSchemaPropertyFieldFriendlies property={property}/>
            </h4> : null
    );
}

export default MetadataSchemaPropertyFieldReference;
