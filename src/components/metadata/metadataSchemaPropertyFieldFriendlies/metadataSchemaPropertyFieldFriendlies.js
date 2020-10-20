/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field friendlies component.
 * Displays combined friendly schema name and friendly property name.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaPropertyFieldLabel from "../metadataSchemaPropertyFieldLabel/metadataSchemaPropertyFieldLabel";

// Styles
import compStyles from "./metadataSchemaPropertyFieldFriendlies.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldFriendlies(props) {

    const {property} = props,
        {schema} = property || {},
        {title} = schema || {};

    return (
        <span className={classNames(compStyles.friendly, fontStyles.s, fontStyles.regular)}>
            <span>{title} / </span>
            <MetadataSchemaPropertyFieldLabel  property={property}/>
        </span>
    );
}

export default MetadataSchemaPropertyFieldFriendlies;
