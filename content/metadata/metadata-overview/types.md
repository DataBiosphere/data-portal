---
date: "2020-11-18"
description: "A list of the current set of metadata fields used to describe datasets in the Human Cell Atlas."
path: "/metadata/metadata-overview/types"
title: "Metadata Overview - Types"
---

# Types Overview

In the HCA metadata schema, *Type* entities represent different parts of an experiment. For example, a **biomaterial** (e.g. a [tissue sample][1]) can undergo a **process** (e.g. [dissociation][2]) to produce another biomaterial (e.g. a [sample of dissociated cells][3]) or a set of data **files** (e.g. [10X fastq files][4]). The process that was actually executed follows a specific **protocol** (e.g. a [10X protocol][5]). All of these parts make up the overall [project][6] (e.g. Understanding cell types in the human heart).
To enable reuse of common schema structures, Type entities are composed of [Core entities][7], [Module entities][8] and [System entities][9].
Every Type entity includes a single [Core entity][7] from which it inherits properties common to its core type (e.g. Biomaterial, Process, Protocol, File or Project). Type entities also include at least one [System entity][9] ([Provenance][10]) and zero or more [Module entities][8]. See the [metadata structure][11] documentation for additional detail.

Core entities are those that apply to 100% of all Type entities and are highly stable. For example, Core fields include those for IDs and accessions. Each Type entity includes a single Core entity thereby inheriting the Core entity's fields.

Module entities contribute groups of fields with a specific theme to one or more type entities.

System entities are created and populated by the Data Coordination Platform during data ingest and processing.

##Entities

### Project

<metadata-type-entity-schemas category="project"></metadata-type-entity-schemas>

### Biomaterial

<metadata-type-entity-schemas category="biomaterial"/></metadata-type-entity-schemas>

### Process

<metadata-type-entity-schemas category="process"/></metadata-type-entity-schemas>

### Protocol

<metadata-type-entity-schemas category="protocol"/></metadata-type-entity-schemas>

### File

<metadata-type-entity-schemas category="file"/></metadata-type-entity-schemas>

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
