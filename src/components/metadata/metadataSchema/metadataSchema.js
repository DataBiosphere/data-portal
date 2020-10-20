/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaNoRequiredProperties from "../metadataSchemaNoRequiredProperties/metadataSchemaNoRequiredProperties";
import MetadataSchemaProperties from "../metadataSchemaProperties/metadataSchemaProperties";
import MetadataToggleRequiredFields from "../metadataToggleRequiredFields/metadataToggleRequiredFields";

// Styles
import compStyles from "./metadataSchema.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

class MetadataSchema extends React.Component {

    render() {
        const {entity, schema} = this.props,
            {entityDescription} = entity || {},
            {description, properties, schemaName, title, urlGitHub} = schema || {};
        const showProperties = properties.length > 0;
        return (
            <>
            <p>{entityDescription}</p>
            <h2 className={compStyles.title}>
                <span>{schemaName}</span>
                <a className={fontStyles.xxs} href={urlGitHub} rel="noopener noreferrer" target="_blank">View Schema Source</a>
            </h2>
            <p className={fontStyles.xs}>{title}</p>
            <p className={compStyles.description}>{description}</p>
            <MetadataToggleRequiredFields/>
            {showProperties ?
                <MetadataSchemaProperties properties={properties} schema={schema}/> :
                <MetadataSchemaNoRequiredProperties/> }
            </>
        );
    }
}

export default MetadataSchema;
