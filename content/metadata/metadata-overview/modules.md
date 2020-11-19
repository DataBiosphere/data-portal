---
description: "An overview of the reusable schema modules defined in the HCA metadata schema."
path: "/metadata/metadata-overview/modules"
title: "Metadata Overview - Reusable Schema Modules"
---

# Reusable Schema Modules 

To enable reuse of common schema structures, Types in addition to having their own unique properties, are composed of three kinds of modules:  [Core modules][7], [Entity modules][8] and [System modules][9].

Each Type contains:
- A single [Core module][7] from which the type inherits properties common to its core type (e.g. Biomaterial, Process, Protocol, File or Project),
- At least one [System module][9] e.g. ([Provenance][10]) to specify system properties such as creation time or a unique document Id,
- Zero or more [Entity modules][8] for example to include a reference to an ontoloogy.

An overview of the different kinds of modules is given below. Please see the [metadata structure][metadata-structure] or [metadata deign](/metadata/design) documentation for additional detail.

## Core Modules
Core modules are those that apply to 100% of all Type entities and are highly stable. For example, Core fields include those for IDs and accessions. Each Type entity includes a single Core entity thereby inheriting the Core entity's fields.

## Entity Modules
Entity modules contribute groups of fields with a specific theme to one or more type or other modules. For example Entity modules model properties common to the various biomaterials or common to the various processes. Entity modules are also used to represent the ontologies used in the HCA metadata schema.

## System Modules
System modules are created and populated by the Data Coordination Platform during data ingest and processing.

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
[metadata-structure]: /metadata/structure
