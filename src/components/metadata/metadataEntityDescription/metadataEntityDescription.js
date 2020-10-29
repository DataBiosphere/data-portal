/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata entity description component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";



function MetadataEntityDescription(props) {

    const {entity} = props,
        {entityName} = entity || {};

    return (
        <>
        {entityName === "core" ?
            <div><p>Core entities are those that apply to 100% of all Type entities and are highly stable. For example, Core fields include those for IDs and accessions. Each Type entity includes a single Core entity thereby inheriting the Core entity's fields.</p></div> : null}
        {entityName === "module" ?
            <div><p>Module entities contribute groups of fields with a specific theme to one or more type entities.</p></div> : null}
        {entityName === "system" ?
            <div><p>System entities are created and populated by the Data Coordination Platform during data ingest and processing.</p></div> : null}
        {entityName === "type" ?
            <div><p>Type entities represent different parts of an experiment. For example, a <strong>biomaterial</strong> (e.g. a <Link to={"/metadata/dictionary/biomaterial/specimen_from_organism"}>tissue sample</Link>) can undergo a <strong>process</strong> (e.g. <Link to={"/metadata/dictionary/process/process"}>dissociation</Link>) to produce another biomaterial (e.g. a <Link to={"/metadata/dictionary/biomaterial/cell_suspension"}>sample of dissociated cells</Link>) or a set of data <strong>files</strong> (e.g. <Link to={"/metadata/dictionary/file/sequence_file"}>10X fastq files</Link>).</p> <p>The process that was actually executed follows a specific <strong>protocol</strong> (e.g. a <Link to={"/metadata/dictionary/protocol/sequencing_protocol"}>10X protocol</Link>). All of these parts make up the overall <Link to={"/metadata/dictionary/project/project"}>project</Link> (e.g. Understanding cell types in the human heart).</p> <p>To enable reuse of common schema structures, Type entities are composed of <Link to={"/metadata/dictionary/biomaterial/biomaterial_core"}>Core entities</Link>, <Link to={"/metadata/dictionary/biomaterial/cell_morphology"}>Module entities</Link> and <Link to={"/metadata/dictionary/system/links"}>System entities</Link>.</p> <p> Every Type entity includes a single <Link to={"/metadata/dictionary/biomaterial/biomaterial_core"}>Core entity</Link> from which it inherits properties common to its core type (e.g. Biomaterial, Process, Protocol, File or Project). Type entities also include at least one <Link to={"/metadata/dictionary/system/links"}>System entity</Link> (<Link to={"/metadata/dictionary/system/provenance"}>Provenance</Link>) and zero or more <Link to={"/metadata/dictionary/biomaterial/cell_morphology"}>Module entities</Link>. See the <Link to={"/metadata/structure"}>metadata structure</Link> documentation for additional detail.</p></div> : null}
        </>
    );
}

export default MetadataEntityDescription;
