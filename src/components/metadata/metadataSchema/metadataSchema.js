/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import MetadataEntityDescription from "../metadataEntityDescription/metadataEntityDescription";
import MetadataSchemaNoRequiredProperties from "../metadataSchemaNoRequiredProperties/metadataSchemaNoRequiredProperties";
import MetadataSchemaProperties from "../metadataSchemaProperties/metadataSchemaProperties";
import MetadataToggleRequiredFields from "../metadataToggleRequiredFields/metadataToggleRequiredFields";

// Styles
import compStyles from "./metadataSchema.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchema(props) {

    const {entity, schema} = props,
        {description, properties, schemaName, title, urlGitHub, urlTo} = schema || {};
    const {highlightActive, highlightValue} = useContext(ContextMetadataDisplaying);
    const showHighlighter = highlightActive && highlightValue === urlTo;
    const showProperties = properties.length > 0;

    return (
        <>
        <MetadataEntityDescription entity={entity}/>
        <h2>
            <span className={classNames({[compStyles.reveal]: showHighlighter})}>{title}</span>
        </h2>
        <p className={compStyles.description}>
            <span className={classNames({[compStyles.reveal]: showHighlighter})}>{description}</span>
        </p>
        <div className={compStyles.source}>
            <span className={fontStyles.xs}>View schema source: </span>
            <a className={fontStyles.s} href={urlGitHub} rel="noopener noreferrer" target="_blank">{schemaName}</a>
            <MetadataToggleRequiredFields background/>
        </div>
        {showProperties ?
            <MetadataSchemaProperties properties={properties} schema={schema}/> :
            <MetadataSchemaNoRequiredProperties/>}
        </>
    );
}

export default MetadataSchema;
