---
date: "2018-05-30"
description: "Overview of exploring projects in the HCA Data Browser."
draft: false
path: "/guides/userguides/exploring-projects"
title: "Exploring Projects"
---

# Exploring Projects

Projects are a basic unit of data organization in the Data Coordination Platform (DCP). Project contributors contribute raw sequencing and associated [files](/metadata/dictionary/file/sequence_file) along with rich metadata describing:

1. the [origin and type of the cells](/metadata/dictionary/biomaterial/cell_line) used in the project
1. the [processes](/metadata/dictionary/process/analysis_process) and [protocols](/metadata/dictionary/protocol/aggregate_generation_protocol) used to collect and process the cells prior to sequencing
1. the [sequencing](/metadata/dictionary/protocol/sequencing_protocol) methods used
1. details about the [project](/metadata/dictionary/project/project) contributors and their institutions

This [Metadata](/metadata/dictionary/process/analysis_process) is included in the project's Metadata Manifest (TSV file). When the DCP [processes](/pipelines) the contributor's raw data with uniform pipelines, this processing information is also added to the Metadata Manifest.

## Finding a Project of Interest

The Data Portal Explore page lists all projects by title along with key project metadata. The project list is filterable by metadata values. 

![Browsing Projects in the Data Explorer](../_images/explore_dcp_2.png "Exploring Projects")


## Viewing Project Details

Selecting a project title on the project list takes you to the project's information page. 

![Viewing Project Information](../_images/Project_information.png "Project /Information")

The project information page contains:

1. the project title and description
1. contributor information, collaborating organizations, and project contacts
1. any publications or accessions associated with the project
1. project details such as species, organ, and library construction method
1. counts of input
1. a link to the project metadata download
1. a link to the project DCP-generated count matrix download (if available)
1. a link to the project contributor-generated matrix (if available)

## Downloading Project Metadata

For each project, the DCP maintains a project-specific TSV file containing the full project metadata. The TSV contains a row for each file in the project and columns for each metadata property. Meanings of the metadata properties are listed in the [Metadata Dictionary](/metadata).

The metadata TSV file gives a representation of the project's metadata graph that can be sorted and filtered using a standard spreadsheet or data manipulation tools.

The **"Project Metadata"** tab left of the Project Information page contains a link to download the project's metadata file.

![Project Metadata](../_images/project_metadata.png "Project Metadata")

Metadata file sizes vary across projects but will generally be between 1 and 100 megabytes.

The TSV file is named after the project and includes the date and time the file was created. For example:

``` 
CD4+ cytotoxic T lymphocytes 2019-07-19 19.09.tsv
```

A partial example of a TSV file is shown below:

![Partial Metadata tsv](../_images/metadata_tsv.png "TSV File")

## Downloading Project DCP-Generated Matrices

Each project processed with DCP pipelines has DCP-generated matrices. To download Project matrices, navigate to the Project Information page and select the **"Project Matrices"** tab to the left. 

Scroll to identify the relevant matrix and then select the download icon. 

![Project Matrices](../_images/dcp_generated_matrices.png "Project Matrices")


## Downloading Project Contributor-Generated Matrices

Contributor-generated matrices are optionally provided by the project contributors. These matrices vary in file format and content. For questions about a specific contributor-generated matrix, reach out to the Project Contacts listed on the Project Information page.

To download the contributor-generated matrix, select the **"Project Matrices"** tab to the left of the Project page. 

Scroll to the **Contributor-Generated Matrices** section and select the download icon.

![Contributor Matrices](../_images/contributor_matrices.png "Contributor Matrices")
