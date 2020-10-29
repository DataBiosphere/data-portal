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
    const linkToCellSuspension = "/metadata/dictionary/biomaterial/cell_suspension";
    const linkToCoreEntities = "/metadata/dictionary/biomaterial/biomaterial_core";
    const linkToMetadataStructure = "/metadata/structure";
    const linkToModuleEntities = "/metadata/dictionary/biomaterial/cell_morphology";
    const linkToProcess = "/metadata/dictionary/process/process";
    const linkToProject = "/metadata/dictionary/project/project";
    const linkToProvenance = "/metadata/dictionary/system/provenance";
    const linkToSequenceFile = "/metadata/dictionary/file/sequence_file";
    const linkToSequencingProtocol = "/metadata/dictionary/protocol/sequencing_protocol";
    const linkToSpecimenFromOrganism = "/metadata/dictionary/biomaterial/specimen_from_organism";
    const linkToSystemEntities = "/metadata/dictionary/system/links";

    return (
        <>
        {entityName === "core" ?
            <div>
                <p>
                    <span>Core entities are those that apply to 100% of all Type entities and are highly stable. </span>
                    <span>For example, Core fields include those for IDs and accessions. </span>
                    <span>Each Type entity includes a single Core entity thereby inheriting the Core entity's fields.</span>
                </p>
            </div> : null}
        {entityName === "module" ?
            <div>
                <p>
                    <span>Module entities contribute groups of fields with a specific theme to one or more type entities.</span>
                </p>
            </div> : null}
        {entityName === "system" ?
            <div>
                <p>
                    <span>System entities are created and populated by the Data Coordination Platform during data ingest and processing.</span>
                </p>
            </div> : null}
        {entityName === "type" ?
            <div>
                <p>
                    <span>Type entities represent different parts of an experiment. </span>
                    <span>For example, a <strong>biomaterial</strong> (e.g. a <Link to={linkToSpecimenFromOrganism}>tissue sample</Link>) can undergo a <strong>process</strong> (e.g. <Link to={linkToProcess}>dissociation</Link>) to produce another biomaterial (e.g. a <Link to={linkToCellSuspension}>sample of dissociated cells</Link>) or a set of data <strong>files</strong> (e.g. <Link to={linkToSequenceFile}>10X fastq files</Link>).</span>
                </p>
                <p>
                    <span>The process that was actually executed follows a specific <strong>protocol</strong> (e.g. a <Link to={linkToSequencingProtocol}>10X protocol</Link>). </span>
                    <span>All of these parts make up the overall <Link to={linkToProject}>project</Link> (e.g. Understanding cell types in the human heart).</span>
                </p>
                <p>
                    <span>To enable reuse of common schema structures, Type entities are composed of <Link to={linkToCoreEntities}>Core entities</Link>, <Link to={linkToModuleEntities}>Module entities</Link> and <Link to={linkToSystemEntities}>System entities</Link>.</span>
                </p>
                <p>
                    <span>Every Type entity includes a single <Link to={linkToCoreEntities}>Core entity</Link> from which it inherits properties common to its core type (e.g. Biomaterial, Process, Protocol, File or Project). </span>
                    <span>Type entities also include at least one <Link to={linkToSystemEntities}>System entity</Link> (<Link to={linkToProvenance}>Provenance</Link>) and zero or more <Link to={linkToModuleEntities}>Module entities</Link>. </span>
                    <span>See the <Link to={linkToMetadataStructure}>metadata structure</Link> documentation for additional detail.</span>
                </p>
            </div> : null}
        </>
    );
}

export default MetadataEntityDescription;
