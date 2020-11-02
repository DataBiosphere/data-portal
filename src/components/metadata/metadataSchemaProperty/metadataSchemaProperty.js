/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property component.
 */

// Core dependencies
import React, {useContext, useState} from "react";

// App dependencies
import HeadingTag from "../../anchor/anchor";
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
    const {highlightActive, highlightValue} = useContext(ContextMetadataDisplaying);
    const [active, setActive] = useState(false);
    const showHighlighter = highlightActive && highlightValue === urlTo;

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
                <HeadingTag anchor={anchor} small/>
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
