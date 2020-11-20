---
description: "An overview of the HCA metadata schema types and structure."
path: "/metadata/metadata-overview/types"
title: "Metadata Overview - Types"
---

# Metadata Types

In the HCA metadata schema, **types** represent the different parts of an experiment. The schema currently defines five core types (Biomaterial, Process, Protocol, Project, File). These core types are extended and refined by one or more subtypes.
 
 For example, a **biomaterial** (e.g. a [tissue sample][1]) can undergo a **process** (e.g. [dissociation][2]) to produce another biomaterial (e.g. a [sample of dissociated cells][3]) or a set of data **files** (e.g. [10X fastq files][4]). The process that was actually executed follows a specific **protocol** (e.g. a [10X protocol][5]). All of these parts together make up the overall [project][6] (e.g. Understanding cell types in the human heart).

An overview of each of current HCA metadata schema types is given below. Please see the [metadata structure](/metadata/structure) or [metadata design](/metadata/design) documentation for additional details and examples of how the schema is structured.

## Biomaterials

Biomaterial types represent information about any biological material that was generated/used in the project including everything from a whole organism to subcellular components.

<metadata-type-entity-schemas category="biomaterial"/></metadata-type-entity-schemas>

## Processes

Process types represent information relevant to how a biomaterial or file was converted into another biomaterial or file.

<metadata-type-entity-schemas category="process"/></metadata-type-entity-schemas>


## Protocols

Protocol types represent information about an intended protocol that was followed in a process.

<metadata-type-entity-schemas category="protocol"/></metadata-type-entity-schemas>

## Files

File types represent information about files produced from any process.

<metadata-type-entity-schemas category="file"/></metadata-type-entity-schemas>

## Projects
The project type specifies information about a project that contributes to the HCA DCP.

<metadata-type-entity-schemas category="project"></metadata-type-entity-schemas>

[1]: /metadata/dictionary/biomaterial/specimen_from_organism
[2]: /metadata/dictionary/process/process
[3]: /metadata/dictionary/biomaterial/cell_suspension
[4]: /metadata/dictionary/file/sequence_file
[5]: /metadata/dictionary/protocol/sequencing_protocol
[6]: /metadata/dictionary/project/project
[7]: /metadata/dictionary/biomaterial/biomaterial_core
[8]: /metadata/dictionary/biomaterial/cell_morphology
[9]: /metadata/dictionary/system/file_descriptor
[10]: /metadata/dictionary/system/provenance
[11]: /metadata/structure
