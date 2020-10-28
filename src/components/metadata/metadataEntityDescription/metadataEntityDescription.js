/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata entity description component.
 */

// Core dependencies
import React from "react";

function MetadataEntityDescription(props) {

    const {entity} = props,
        {entityName} = entity || {};

    return (
        <>
        {entityName === "core" ?
            <p>Core entities are those that apply to 100% of all entities and are highly stable. Example Core fields include those for IDs and accessions. Core fields are inherited by Type entities.</p> : null}
        {entityName === "module" ?
            <p>Module entities contribute groups of fields with a specific theme to one or more type entities.</p> : null}
        {entityName === "system" ?
            <p>System entities are created and populated by the Data Coordination Platform during data ingest and processing.</p> : null}
        {entityName === "type" ?
            <p>Type entities represent different parts of an experiment: A biomaterial (e.g. a tissue sample) can undergo a process (e.g. dissociation) to produce another biomaterial (e.g. a sample of dissociated cells) or a set of data files (e.g. 10X fastq files). The process that was actually executed follows a specific protocol (e.g. a 10X protocol). All of these parts make up the overall project (e.g. Understanding cell types in the human heart). Type entities are composed of simple properties, Core entities, Module entities and System entities.</p> : null}
        </>
    );
}

export default MetadataEntityDescription;
