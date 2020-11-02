/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field example component.
 */

// Core dependencies
import React from "react";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldExample(props) {

    const {font, property} = props,
        {example} = property;

    return (
        <span className={classNames({[fontStyles[font]]: !!font})}>{example}</span>
    );
}

export default MetadataSchemaPropertyFieldExample;
