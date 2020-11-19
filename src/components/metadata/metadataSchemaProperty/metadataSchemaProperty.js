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
import InternalLink from "../../internal-link/internalLink";
import MetadataRequired from "../metadataRequired/metadataRequired";
import MetadataSchemaPropertyFieldDataType from "../metadataSchemaPropertyFieldDataType/metadataSchemaPropertyFieldDataType";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldExample from "../metadataSchemaPropertyFieldExample/metadataSchemaPropertyFieldExample";
import MetadataSchemaPropertyFieldGraphRestriction from "../metadataSchemaPropertyFieldGraphRestriction/metadataSchemaPropertyFieldGraphRestriction";
import MetadataSchemaPropertyFieldLabel from "../metadataSchemaPropertyFieldLabel/metadataSchemaPropertyFieldLabel";
import MetadataSchemaPropertyFieldReference from "../metadataSchemaPropertyFieldReference/metadataSchemaPropertyFieldReference";
import MetadataSchemaPropertyFieldPath from "../metadataSchemaPropertyFieldPath/metadataSchemaPropertyFieldPath";

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
            <span>
                <MetadataSchemaPropertyFieldLabel property={property}>
                    <InternalLink anchor={anchor} relative/>
                </MetadataSchemaPropertyFieldLabel>
                <MetadataRequired property={property}/>
            </span>
            <span onMouseEnter={() => onMouseEnter()}
                  onMouseLeave={() => onMouseLeave()}
                  role="presentation">
                <MetadataSchemaPropertyFieldPath active={active} property={property} wrap/>
                <MetadataSchemaPropertyFieldDataType property={property}/>
                <span>
                    <MetadataSchemaPropertyFieldDescription font={"s"} property={property}/>
                    <span> </span>
                    <MetadataSchemaPropertyFieldExample font={"s"} property={property}/>
                </span>
                <MetadataSchemaPropertyFieldGraphRestriction property={property}/>
            </span>
        </div>
        </>
    );
}

export default MetadataSchemaProperty;
