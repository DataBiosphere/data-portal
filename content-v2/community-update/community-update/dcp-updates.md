---
date: "2020-12-07"
title: DCP Updates
description: "Latest updates for the HCA Data Coordinaton Platform (DCP)."
---

# DCP Platform Updates

#### April 02, 2021
### Processed data now available for 26 HCA 10x datasets

The [DCP 2.0 Preview](https://data.humancellatlas.org/explore/projects?filter=%5B%7B%22facetName%22:%22genusSpecies%22,%22terms%22:%5B%22Homo%20sapiens%22%5D%7D%5D) now has standardized BAMs and count matrices (Loom file format) available for 26 HCA projects, including 15 new projects. These projects contain both human and mouse single-cell and single-nucleus data generated with 3’ 10x V2 and V3 sequencing technology. This data was processed using the latest version of the Optimus pipeline (see the [Optimus Overview](https://data.humancellatlas.org/pipelines/optimus-workflow)). 

In addition to individual sample count matrices, each newly processed project also has standardized, project-level DCP Generated Matrices that are stratified by organ, species, and library construction method. These matrices are minimally filtered to include only cells with more than 100 UMIs. You can download the project-level DCP Generated Matrices from the Data Browser (see image below) or from the individual Project page (see the [Exploring Projects](https://data.humancellatlas.org/guides) guide)

![](../../guides/_images/explore_dcp_2_matrices.png)

**New raw data and Contributor Generated Matrices**

Raw sequence files and Contributor Generated Matrices (CGMs) for an additional 11 new projects are available for download from the [DCP 2.0 Preview](https://data.humancellatlas.org/explore/projects?filter=%5B%7B%22facetName%22:%22genusSpecies%22,%22terms%22:%5B%22Homo%20sapiens%22%5D%7D%5D). These projects include human adult, embryonic, and fetal data derived from 10 organs - brain, blood, bone marrow, colon, thymus, pancreas, placenta, mouth, liver, and spleen. Most projects employed 10x sequencing technology, but some additionally used cite-seq and drop-seq. 

With the addition of these new data, the DCP now has 55 total projects with over 7 million cells derived from 40 organs and 580 donors. We are grateful for the contributions and continued support of the 179 global labs who made this data available.   

**Download new data using updated guides**

All files (raw data, CGMs, and DCP Generated BAMs and matrices) can be downloaded following the instructions in the [Accessing HCA Data and Metadata](https://data.humancellatlas.org/guides/quick-start-guide) guide. 
Additionally, you can access matrix files programmatically using the new [Programmatic Download](https://colab.research.google.com/drive/1h14mbunsepfogcnG9VEF4FIGpuyGLA-P#scrollTo=jxk27LZk4373) guide.

#### December 11, 2020

### DCP 2.0 launches; new projects, contributor generated matrices and DCP 2.0 infrastructure

In the spirit of bringing HCA data to the community as quickly as possible, we are releasing the new DCP 2.0 data and infrastructure incrementally. 

This initial launch -- the first of several planned to roll out new functionality, pipelines, and data -- includes: 
* Raw data and standardized metadata for 5.8 million cells 
* Contributor-generated matrices, embeddings, and annotations for existing and **16 new DCP projects**
* New DCP 2.0 infrastructure (details below)

**What’s included in the new projects?**

The new projects include a mix of human and mouse data from a variety of organs including adipose tissue, heart, hindlimb, spleen skin, yolk sac, diaphragm, tongue, trachea and more. These data encompass:
* 143 donors
* 248 specimens
* estimated 1.3M additional cells

> View the new projects using the **[DCP 2.0 Data Preview](/what-is-the-dcp-20-data-preview)**

**What’s included in the DCP 2.0 infrastructure updates?**

Along with the new data view we have updated DCP infrastructure by **retiring and replacing** the following features:

* HCA Command Line Interface (CLI); data are now downloaded using curl commands (see the [Accessing HCA Data and Metadata guide](/guides/quick-start-guide)) 


* HCA Matrix Service; DCP 1.0 project matrices remain available on the individual Project Matrices page (see the [Exploring Projects guide](/guides))


* HCA Data Storage Service (DSS) and API;  data is now stored in the Terra Data Repo (TDR), an alternative storage and metadata management service that supports managed access

### What’s Coming Next?

Between now and the end of February look for:
* Standardized analysis results (BAM and index files) made by the latest HCA 10x and SmartSeq-2 pipelines for all projects
* DCP-generated count matrices stratified by species, library construction method, and organ for each project

After these standardized analyses are complete, we will begin releasing new projects and analysis on a monthly basis. We are also working towards incorporating controlled-access projects. 

Once processing is complete, we will retire DCP 1.0 View. 

---

#### October 9, 2020
## Coming Soon - DCP 2.0

We are excited to announce the launch of the DCP 2.0 this fall. This has been a collaborative effort over the past 6 months to take on board the HCA community feedback and understand the unmet needs in order to align the goals of the DCP with the wider HCA community goals.

We have made significant changes, including GA4GH-compliance, more data—50% more than previously—and, where available, contributor-generated count matrices, embeddings, and cell type annotations.

## Changes Coming to Key Components


To accomplish this, we will be making the following changes and migrations:
 
* The current Data Storage Service (DSS) will be retired and we will migrate to the Terra Data Repo, which supports managed access, for storage and metadata management. Both Ingest and the Data Browser will access the Terra Data Repo via self-service APIs, making for minimal disruption to the HCA scientific community.


* The matrix service API will be retired.  The per-project matrices that are most commonly used will be available in static form directly from the data browser.

* As a higher-level replacement for the DSS API, the Data Browser API is being prepared for use by the wider developer community and will be officially documented and supported by the HCA DCP team.
 
* The HCA-CLI will be retired and the Data Browser will provide a bulk download capability via curl (or similar) commands.  Because the internal organization of the data store is subject to change with upcoming work on the metadata, direct calls against it are discouraged in favor of the new Data Browser API.


## Transition Path to DCP 2.0

More information about the transition to DCP 2.0 will be announced in the coming weeks and we will endeavour to make this transition as seamless as possible to the HCA research and developer communities.

> To enable a smooth transition, the DCP 1 data browser, APIs and data will remain available until January 1, 2021. 

We will continue to integrate third party portals and applications into the HCA ecosystem by linking from and integrating directly into the HCA Data Browser.  
 
Regards,

The HCA DCP Team


