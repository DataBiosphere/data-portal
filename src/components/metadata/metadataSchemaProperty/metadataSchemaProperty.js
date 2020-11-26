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
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyFieldGraphRestriction from "../metadataSchemaPropertyFieldGraphRestriction/metadataSchemaPropertyFieldGraphRestriction";
import MetadataSchemaPropertyFieldLabel from "../metadataSchemaPropertyFieldLabel/metadataSchemaPropertyFieldLabel";
import MetadataSchemaPropertyFieldPath from "../metadataSchemaPropertyFieldPath/metadataSchemaPropertyFieldPath";

// Styles
import compStyles from "./metadataSchemaProperty.module.css";

const classNames = require("classnames");

function MetadataSchemaProperty(props) {

    const {property} = props,
        {anchor, propertyFriendlies, _ref, urlTo} = property || {};
    const {highlightValue} = useContext(ContextMetadataDisplaying);
    const [active, setActive] = useState(false);
    const showHighlighter = highlightValue === urlTo;
    const showReference = !!_ref && propertyFriendlies;
    const tertiary = showReference ? propertyFriendlies.length > 2 : false;
    const classNamesSchemaProperty = classNames(
        {[compStyles.reveal]: showHighlighter},
        compStyles.schemaProperty,
        {[compStyles.reference]: showReference},
        {[compStyles.tertiary]: tertiary});

    const onMouseEnter = () => {

        setActive(true);
    };

    const onMouseLeave = () => {

        setActive(false);
    };

    return (
        <>
        <div id={anchor} className={classNamesSchemaProperty}>
            <span>
                {showReference ?
                    <MetadataSchemaPropertyFieldFriendlies property={property}>
                        <InternalLink anchor={anchor} relative/>
                    </MetadataSchemaPropertyFieldFriendlies> :
                    <MetadataSchemaPropertyFieldLabel property={property}>
                        <InternalLink anchor={anchor} relative/>
                    </MetadataSchemaPropertyFieldLabel>}
                    <MetadataRequired property={property}/>
            </span>
            <span onMouseEnter={() => onMouseEnter()}
                  onMouseLeave={() => onMouseLeave()}
                  role="presentation">
                {showReference ? null : <MetadataSchemaPropertyFieldPath active={active} property={property} wrap/>}
                <span>
                    <MetadataSchemaPropertyFieldDataType property={property}/>
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
