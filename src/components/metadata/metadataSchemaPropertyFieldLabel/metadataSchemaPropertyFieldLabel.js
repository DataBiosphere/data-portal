/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field label component.
 */

// Core dependencies
import React from "react";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldLabel(props) {

    const {font, property} = props,
        {label} = property,
        {style, weight} = font || {};

    return (
        <span className={classNames({[fontStyles[style]]: !!style}, {[fontStyles[weight]]: !!weight})}>{label}</span>
    );
}

export default MetadataSchemaPropertyFieldLabel;
