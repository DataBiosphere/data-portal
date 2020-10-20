/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property component.
 */

// Core dependencies
import React, {useState} from "react";

// App dependencies
import HeadingTag from "../../anchor/anchor";
import MetadataRequired from "../metadataRequired/metadataRequired";
import MetadataSchemaPropertyFieldPath from "../metadataSchemaPropertyFieldPath/metadataSchemaPropertyFieldPath";
import MetadataSchemaPropertyFieldRefIntro from "../metadataSchemaPropertyFieldRefIntro/metadataSchemaPropertyFieldRefIntro";
import MetadataSchemaPropertyFields from "../metadataSchemaPropertyFields/metadataSchemaPropertyFields";

// Styles
import compStyles from "./metadataSchemaProperty.module.css";

function MetadataSchemaProperty(props) {

    const {property} = props,
        {anchor} = property || {};
    const [active, setActive] = useState(false);

    const onMouseEnter = () => {

        setActive(true);
    };

    const onMouseLeave = () => {

        setActive(false);
    };

    return (
        <>
        <div id={anchor} className={compStyles.schemaProperty}>
            <MetadataSchemaPropertyFieldRefIntro property={property}/>
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
