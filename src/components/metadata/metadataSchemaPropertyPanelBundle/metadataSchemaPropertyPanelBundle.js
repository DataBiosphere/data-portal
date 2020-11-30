/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property panel bundle component.
 * Facilitates a flexbox arrangement for property panel items bundled together.
 */

// Core dependencies
import React from "react";

function MetadataSchemaPropertyPanelBundle(props) {

    const {children, onHandleMouseEnter, onHandleMouseLeave} = props;
    const mouseEvents = onHandleMouseEnter || onHandleMouseLeave;
    const attributes = {...(mouseEvents && { role: "presentation" })};
    const events = {
        ...(onHandleMouseEnter && {onMouseEnter: onHandleMouseEnter}),
        ...(onHandleMouseLeave && {onMouseLeave: onHandleMouseLeave})};

    return (
        <span {...attributes} {...events}>{children}</span>
    );
}

export default MetadataSchemaPropertyPanelBundle;
