---
path: "/guides/userguides/exploring-projects"
date: "2018-05-30"
title: "Exploring Projects"
draft: false
description: "Overview of exploring projects in the HCA Data Browser."
---

# Exploring Projects

Projects are a basic unit of data organization in the HCA Data Coordination Platform (HCA DCP). Project contributors contribute raw sequencing and associated [files](/metadata/dictionary/file/sequence_file) along with rich metadata describing:

  1. the  [origin and type of the cells](/metadata/dictionary/biomaterial/cell_line) used in the project
  1. the [processes](/metadata/dictionary/process/analysis/analysis_process) and [protocols](/metadata/dictionary/protocol/biomaterial_collection/aggregate_generation_protocol) used to collect and process the cells prior to sequencing
  1. the  [sequencing](/metadata/dictionary/protocol/sequencing/sequencing_protocol) methods used
  1. details about the [project](/metadata/dictionary/project/project) contributors and their institutions
 
This [Metadata](/metadata/dictionary/process/analysis/analysis_process) is included in the project's Metadata Manifest (TSV file). When the HCA DCP [processes](/pipelines) the contributor's raw data with standardized pipelines, this processing information is also added to the Metadata Manifest. 

## Finding a Project of Interest

The HCA Data Explorer lists all projects on its home page along with key project metadata. The project list is filterable by metadata values. 

![Browsing Projects in the Data Explorer](../_images/exploring-projects-project-list.png "Exploring Projects")


## Viewing Project Details

Selecting a project title on the project list takes you to the project's detail page. 

![Viewing Project Details](../_images/exploring-projects-project-detail.png "Project Detail")


The project detail page contains:

1. the project title and description

1. contributor information, collaborating organizations, and project contacts

1. any publications or accessions associated with the project 

1. project details such as species, organ and library construction method 

1. counts of input, analysis and matrix files

1. a project metadata download

1. a project DCP-generated count matrix download (if available)

1. a project contributor-generated matrix (if available)

## Downloading Project Metadata

For each project, the HCA DCP maintains a project specific TSV file containing the full project metadata. The TSV contains a row for each file in the project and columns for each metadata property. Meanings of the metadata properties are listed in the [HCA Metadata Dictionary](/metadata).

The metadata TSV file gives a representation of the project's metadata graph that can be sorted and filtered using standard spreadsheet or data manipulation tools.

The **"Project Metadata"** tab left of the Project page contains a link to download the project's metadata file.

![Project Metadata](../_images/exploring-projects-project-downloads.png "Project Downloads")

Metadata file sizes vary across projects but will generally be between 1 and 100 megabytes.

The TSV file is named after the project and includes the date and time the file was created. For example:

``` 
CD4+ cytotoxic T lymphocytes 2019-07-19 19.09.tsv
```

A partial example of a TSV file is listed below:

![Partial Metadata tsv](../_images/exploring-projects-tsv.png "TSV File")


## Downloading Project DCP Generated Matrices

Each project processed with DCP pipelines has DCP-generated count matrices.

To download Project matrices, navigate to the Project page and select the **"Project Matrices"** tab to the left. Scroll to identify the relevant matrix and then select the download icon. 
 
Count matrices are available in MTX, CSV, Loom formats (see the [Loom documentation](http://loompy.org/) for details on loading and viewing Loom files). 

> **DCP 1.0 Matrix Deprecation Notice:** The DCP is reprocessing DCP 1.0 data and will deprecate all DCP 1.0 matrices (MTX, CSV, and Loom files) once reprocessing is complete. All reprocessed and newly processed datasets in the DCP 2.0 will have matrices in Loom format only. 

The type of count (raw or TPM) available in the matrix depends on the pipeline used for data processing. DCP 1.0 matrices generated with Optimus (10x data) include raw counts whereas matrices generated with Smart-seq2 include TPMs. 
 

## Downloading Project Contributor Generated Matrices
Contributor Generated Matrices are optionally provided by the project contributors. These matrices  vary in file format and content. For questions about a specific contributor-generated matrix, reach out to the Project Contacts listed on the Project Information page. 

To download the Contributor Generated Matrix, select the **"Project Matrices"** tab to the left of the Project page. 

Scroll to the **Contributor Generated Matrices** section and select the download icon. 


