/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema used by(s) component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaUsedBy from "../metadataSchemaUsedBy/metadataSchemaUsedBy";

// Styles
import compStyles from "./metadataSchemaUsedBys.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaUsedBys(props) {

    const {schema} = props,
        {entity, usedByProperties} = schema || {};
    const showUsedBy = !(/type/.test(entity));
    const showUsedByProperties = usedByProperties.length > 0;

    return (
        showUsedBy ?
            <>
            <h3>Used by</h3>
            {showUsedByProperties ?
                <>
                <span className={compStyles.usedBys}>
                    <p className={fontStyles.s}>This module is used by the following properties:</p>
                </span>
                {usedByProperties.map((usedByProperty, u) => <MetadataSchemaUsedBy key={u} property={usedByProperty}/>)}</> :
                <p>This module is unused.</p>}
            </> : null
    );
}

export default MetadataSchemaUsedBys;
