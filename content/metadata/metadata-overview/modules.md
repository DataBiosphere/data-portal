---
description: "An overview of the reusable schema modules defined in the HCA metadata schema."
path: "/metadata/metadata-overview/modules"
title: "Metadata Overview - Reusable Schema Modules"
---

# Schema Modules 

In the HCA metadata schema, [types][types] represent the various aspects of an experiment. The types themselves, however, are composed of smaller reusable schema elements called **modules**. 

Modules contribute sets of properties with a common theme wherever they are included. Modules can also be included in other modules. 

The use of modules helps to keep the HCA metadata schema both compact and self-consistent by allowing a schema structure representing a given concept to be defined once and then reused wherever it is needed.

An overview of the different kinds of modules is given below. Please see the [metadata structure][metadata-structure] or [metadata design](/metadata/design) documentation for additional detail.


## Core Modules
Every metadata type includes a single [core module][biomaterial-core] which defines the type’s super class. For example, all of the biomaterials (e.g. Cell Line, Cell Suspension, Donor Organism, etc. ) include the [Biomaterial Core][biomaterial-core] module. The Biomaterial Core module contributes Biomaterial ID, among other properties to each of these types.

Similarly, all file types include the File Core module, all process types include the Process Core module and so on.

## Entity Modules
[Entity modules][8] are the main, general class of module. Entity modules model concepts such as [Funder][funder], [Channel][channel], and [Probe][probe]. Entity modules are also used to represent the various ontologies used by the HCA metadata schema such as [Cell cycle ontology][cell-cycle-ontology] .

## System Modules
[System modules][9] are created and populated by the Data Coordination Platform during data ingest and processing. For example, the main System module is [Provenance][provenance] which models an entity's Document ID, Submission Date, and Submitter ID among other fields. 


[1]: /metadata/dictionary/biomaterial/specimen_from_organism
[2]: /metadata/dictionary/process/process
[3]: /metadata/dictionary/biomaterial/cell_suspension
[4]: /metadata/dictionary/file/sequence_file
[5]: /metadata/dictionary/protocol/sequencing_protocol
[6]: /metadata/dictionary/project/project
[biomaterial-core]: /metadata/dictionary/biomaterial/biomaterial_core
[8]: /metadata/dictionary/biomaterial/cell_morphology
[9]: /metadata/dictionary/system/file_descriptor
[10]: /metadata/dictionary/system/provenance
[metadata-structure]: /metadata/structure
[cell-cycle-ontology]: /metadata/dictionary/ontology/cell_cycle_ontology
[funder]: /metadata/dictionary/project/funder
[channel]: /metadata/dictionary/protocol/channel
[probe]: /metadata/dictionary/protocol/probe
[provenance]: /metadata/dictionary/system/provenance
[types]: /metadata

