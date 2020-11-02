/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata overline component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./metadataOverline.module.css";

function MetadataOverline(props) {

    const {children} = props;

    return (
        <div className={compStyles.overline}>{children}</div>
    )
}

export default MetadataOverline;
