---
path: "/guides/userguides/matrices"
date: "2020-11-13"
title: "Matrices"
description: "An overview of the available matrices"
---

# HCA DCP Data Matrix Overview

The DCP provides cell by gene count matrices for each project processed with standardized pipelines. Additionally, any researcher who contributes HCA data may optionally provide a ["Contributor Generated" matrix](#contributor-generated-matrices) for their project. When available, both matrix types can be downloaded from the Data Browser or the individual Project page. This overview describes the matrix types, how to download them, and how to link them back to the metadata.

## DCP Generated Matrices
After data is processed with standardized DCP pipelines, two types of cell by gene matrices are available for download depending on the library construction method:

| Matrix Type | Description |
| --- | --- |
| project-level matrices | matrices for a project that have been separated by species (human or mouse), organ, and sequencing method (10x or SS2) |
| library-level matrices (**10x data only**) | matrices for a project that are split by library preparation; all samples in this matrix will have the same metadata for the field `sequencing_process.provenance.document_id` |

Project-level matrices are available for all projects processed with DCP pipelines. Library-level matrices are only available for 10x Data (see details below).

#### What's in the DCP Matrix? 

All DCP cell by gene count matrices are in Loom file format (see [Loom documentation](http://linnarssonlab.org/loompy/index.html#) for format details) and contain standard [metrics](/pipelines/hca-pipelines/data-processing-pipelines/qc-metrics) and counts that are specific to the data processing pipeline used to generate the file. 

For the most up-to-date information on counts and metrics, see the **[Smart-seq2 Loom schema ](https://broadinstitute.github.io/warp/documentation/Pipelines/Smart-seq2_Multi_Sample_Pipeline/Loom_schema.html)** and the **[Optimus Loom schema](https://broadinstitute.github.io/warp/documentation/Pipelines/Optimus_Pipeline/Loom_schema.html) (10x data)**.

DCP matrices have three types of attributes containing metadata and metrics:
- **global**: information that applies to all data in the Loom (i.e. pipeline version, etc.)

- **row**: gene-specific information and metrics (one row = one gene)

- **column**: cell-specific information and metrics (one column = one cell)


#### DCP Project-level Matrices
All datasets processed with standardized pipelines have project-level matrices (in Loom file format) that are divided by **species**, **organ**, and **sequencing method**. 

**For 10x datasets, the project-level matrices have been minimally filtered based the number of UMIs (only cells with 100 molecules or more are retained).**

DCP project-level matrices contain all the processing pipeline's standard metrics and counts, but additionally have HCA metadata included in both global and column attributes which may be useful when exploring the data and linking it back to the additional Project metadata in the Data Manifest. 

HCA metadata is detailed in the count matrix global attributes (see description in table below):
| Matrix Attribute Name | Metadata Description | 
| --- | --- |
| `donor_organism.genus_species` | species information; human or mouse |
| `library_preparation_protocol.library_construction_method` | technology used for library preprataion, i.e 10x or SS2 |
| `specimen_from_organism.organ` | organ |	
| `project.project_core.project_name` | project name |
| `project.provenance.document_id` | project id |
| `input_id` | metadata values for  `sequencing_process.provenance.document_id` |
| `input_name` | metadata values for `sequencing_input.biomaterial_core.biomaterial_id` |



#### DCP Library-level Matrices (10x Data Only)
Library-level matrices (Loom files) are only applicable to 10x datasets. They contain the same gene (row) metrics, cell (column) metrics and counts as the project-level matrices, but are separated by the library preparation metadata (the field `sequencing_process.provenance.document_id`).

Because these matrices are created using library preparation, they do not contain all the species, organ, and library HCA metadata that is included in the project-level matrices. Instead, they contain the following HCA metadata in the global attributes:
- `input_id`: metadata value for  `sequencing_process.provenance.document_id`  

- `input_name`: metadata value for `sequencing_input.biomaterial_core.biomaterial_id`


## Contributor Generated Matrices
Contributor generated matrices are optionally provided by the data contributors. When available, you can download them from the individual Project page. The matrices will vary in file format and content. For questions about the Contributor Generated Matrix, reach out to the contributors listed in the Project page Contact section.

## Downloading Matrices
Project-level matrices (both DCP generated and contributor generated) may be downloaded from the "Matrix" column of the DCP Data Browser (see below).


Alternatively, you can download project-level matrices from the individual Project page. 


## Linking Matrices to the Data Manifest (Metadata)
Project-level matrices only contain some of the available project metadata (species, organs, library methods, etc.). However, there are several metadata facets that you might want to link back to the matrix such as disease state or donor information. 

To link back to the metadata matrix, use the matrix `input_id` field which includes all the values for the metadata  `sequencing_process.provenance.document_id`. 



