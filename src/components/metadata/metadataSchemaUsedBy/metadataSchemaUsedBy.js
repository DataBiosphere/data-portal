/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema used by component.
 */

// Core dependencies
import Link from "gatsby-link";
//import {navigate} from "@reach/router";
import React, {useContext} from "react";

// App dependencies
//import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

// Styles
import compStyles from "./metadataSchemaUsedBy.module.css";
//import fontStyles from "../../../styles/fontsize.module.css";

//const classNames = require("classnames");

function MetadataSchemaUsedBy(props) {

    const {property} = props,
        {propertyPath, urlTo} = property || {};
    // const {showAllMetadata, onHandleSearchHit, onHandleToggleRequiredFields} = useContext(ContextMetadataDisplaying);

    // const navigateTo = () => {
    //
    //     /* Toggle required fields, if "Show required fields only" is true. */
    //     if ( !showAllMetadata ) {
    //
    //         onHandleToggleRequiredFields();
    //     }
    //
    //     /* Handle the display of highlight on search hit result page. */
    //     onHandleSearchHit(urlTo);
    //     navigate(urlTo);
    // };

    return (
        <div className={compStyles.usedBy}>
            <span>
                {/*<span className={classNames(fontStyles.link, fontStyles.s)} onClick={() => navigateTo()} role={"presentation"}>*/}
                <Link to={urlTo}>
                    <MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={propertyPath} wrap/>
                </Link>
                {/*</span>*/}
            </span>
            <span>
                <MetadataSchemaPropertyFieldFriendlies property={property}/>
                <MetadataSchemaPropertyFieldDescription font={"xs"} property={property}/>
            </span>
        </div>
    )
}

export default MetadataSchemaUsedBy;
