/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema used by component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

// App dependencies
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

// Styles
import compStyles from "./metadataSchemaUsedBy.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaUsedBy(props) {

    const {property} = props,
        {propertyPath, urlTo} = property || {};

    return (
        <div className={compStyles.usedBy}>
            <span>
                <Link className={fontStyles.s} to={urlTo}>
                    <MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={propertyPath} wrap/>
                </Link>
            </span>
            <span>
                <MetadataSchemaPropertyFieldFriendlies property={property}/>
                <MetadataSchemaPropertyFieldDescription font={"xs"} property={property}/>
            </span>
        </div>
    )
}

export default MetadataSchemaUsedBy;
