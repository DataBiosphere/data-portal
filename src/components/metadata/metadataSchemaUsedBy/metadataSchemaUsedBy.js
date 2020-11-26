/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema used by component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ClickHandler from "../../clickHandler/clickHandler";
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

// Styles
import compStyles from "./metadataSchemaUsedBy.module.css";

function MetadataSchemaUsedBy(props) {

    const {property} = props,
        {propertyPath} = property || {};
    const {onHandleNavigationHit} = useContext(ContextMetadataDisplaying);

    return (
        <ClickHandler className={compStyles.usedBy}
                      clickAction={() => onHandleNavigationHit(property)}
                      tag={"div"}>
            <span>
                <MetadataSchemaPropertyFieldFriendlies property={property}/>
            </span>
            <span>
                <MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={propertyPath} wrap/>
                <MetadataSchemaPropertyFieldDescription font={"xs"} property={property}/>
            </span>
        </ClickHandler>
    )
}

export default MetadataSchemaUsedBy;
