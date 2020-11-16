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
                <p>This entity is used by the following properties:</p>
                {usedByProperties.map((usedByProperty, u) => <MetadataSchemaUsedBy key={u} property={usedByProperty}/>)}
                </> : <p>This entity is unused.</p>}
            </> : null
    );
}

export default MetadataSchemaUsedBys;
