/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata required component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Chip from "../../chip/chip";

// Styles
import compStyles from "./metadataRequired.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataRequired(props) {

    const {property} = props,
        {required} = property;

    return (
        required ?
            <Chip>
                <span className={classNames(compStyles.required, fontStyles.xxs)}>Required</span>
            </Chip> : null
    )
}

export default MetadataRequired;
