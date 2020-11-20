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
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaUsedBy(props) {

    const {property} = props,
        {propertyPath} = property || {};
    const {onHandleNavigationHit} = useContext(ContextMetadataDisplaying);

    return (
        <div className={compStyles.usedBy}>
            <span>
                <ClickHandler className={classNames(fontStyles.link, fontStyles.s)}
                              clickAction={() => onHandleNavigationHit(property)}
                              tag={"span"}>
                    <MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={propertyPath} wrap/>
                </ClickHandler>
            </span>
            <span>
                <MetadataSchemaPropertyFieldFriendlies property={property}/>
                <MetadataSchemaPropertyFieldDescription font={"xs"} property={property}/>
            </span>
        </div>
    )
}

export default MetadataSchemaUsedBy;
