/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field data type component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

// App dependencies
import MetadataSchemaPropertyFieldFromRef from "../metadataSchemaPropertyFieldFromRef/metadataSchemaPropertyFieldFromRef";

// Styles
import compStyles from "./metadataSchemaPropertyFieldDataType.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldDataType(props) {

    const {property} = props,
        {dataType, referenceFrom, referenceFromLink} = property || {};

    return (
        <span className={classNames(compStyles.dataType, fontStyles.s)}>
            <span> (</span>
            {referenceFromLink ? <Link to={referenceFromLink}>{referenceFrom} </Link> : null}
            <span>{dataType}</span>
            <MetadataSchemaPropertyFieldFromRef property={property}/>
            <span>) </span>
        </span>
    );
}

export default MetadataSchemaPropertyFieldDataType;
