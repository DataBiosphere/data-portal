/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field properties from component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

// App dependencies
import MetadataSchemaPropertyDisplayPanel from "../metadataSchemaPropertyDisplayPanel/metadataSchemaPropertyDisplayPanel";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFieldPropertiesFrom(props) {

    const {property} = props,
        {_ref, referenceFrom, referenceFromLink} = property || {};
    const showReference = !!_ref;

    return (
        showReference ?
            <MetadataSchemaPropertyDisplayPanel>
                <p className={fontStyles.s}>
                    <span>Properties from </span>
                    <Link to={referenceFromLink}>{referenceFrom}</Link>
                </p>
            </MetadataSchemaPropertyDisplayPanel> : null
    );
}

export default MetadataSchemaPropertyFieldPropertiesFrom;
