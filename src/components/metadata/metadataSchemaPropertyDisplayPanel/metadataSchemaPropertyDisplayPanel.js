/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property display panel component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./metadataSchemaPropertyDisplayPanel.module.css";

class MetadataSchemaPropertyDisplayPanel extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <span className={compStyles.panel}>{children}</span>
        );
    }
}

export default MetadataSchemaPropertyDisplayPanel;
