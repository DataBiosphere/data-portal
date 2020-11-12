/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property component.
 */

// Core dependencies
import React, {useContext, useState} from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import MetadataRequired from "../metadataRequired/metadataRequired";
import MetadataSchemaPropertyFieldPath from "../metadataSchemaPropertyFieldPath/metadataSchemaPropertyFieldPath";
import MetadataSchemaPropertyFieldReference from "../metadataSchemaPropertyFieldReference/metadataSchemaPropertyFieldReference";
import MetadataSchemaPropertyFields from "../metadataSchemaPropertyFields/metadataSchemaPropertyFields";

// Styles
import compStyles from "./metadataSchemaProperty.module.css";

const classNames = require("classnames");

function MetadataSchemaProperty(props) {

    const {property} = props,
        {anchor, urlTo} = property || {};
    const {highlightValue} = useContext(ContextMetadataDisplaying);
    const [active, setActive] = useState(false);
    const showHighlighter = highlightValue === urlTo;

    const onMouseEnter = () => {

        setActive(true);
    };

    const onMouseLeave = () => {

        setActive(false);
    };

    return (
        <>
        <div id={anchor} className={classNames({[compStyles.reveal]: showHighlighter}, compStyles.schemaProperty)}>
            <MetadataSchemaPropertyFieldReference property={property}/>
            <span onMouseEnter={() => onMouseEnter()}
                  onMouseLeave={() => onMouseLeave()}
                  role="presentation">
                <MetadataSchemaPropertyFieldPath active={active} property={property} wrap/>
                <MetadataRequired property={property}/>
            </span>
            <span>
                <MetadataSchemaPropertyFields property={property}/>
            </span>
        </div>
        </>
    );
}

export default MetadataSchemaProperty;
