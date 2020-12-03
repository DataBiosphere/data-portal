---
date: "2020-12-07"
title: DCP Updates
description: "Latest updates for the HCA Data Coordinaton Platform (DCP)."
---

# DCP Platform Updates

#### December 7, 2020

### DCP 2.0 launches; new projects, contributor generated matrices and DCP 2.0 infrastructure

In the spirit of bringing HCA data to the community as quickly as possible, we are releasing the new DCP 2.0 data and infrastructure incrementally. 

This initial launch -- the first of several planned to roll out new functionality, pipelines, and data -- includes: 
* New DCP 2.0 infrastructure (details below)
* Optional contributor-generated matrices, embeddings, and annotations for all DCP projects
* Raw data and contributor matrices for **16 new projects**!  

**What’s included in the new projects?**
The new projects include a mix of human and mouse data from a variety of organs and encompass:
* 143 donors
* 248 specimens
* estimated 950,600 cells

> View the new projects using the [DCP 2.0 Data Preview](/what-is-the-dcp-20-data-preview)**

**What’s included in the DCP 2.0 infrastructure updates?**

Along with the new data view we have updated DCP infrastructure by **retiring and replacing** the following features:

* HCA Command Line Interface (CLI); data are now downloaded using curl commands (see the [Accessing HCA Data and Metadata guide](/guides/quick-start-guide)) 


* HCA Matrix Service; DCP 1.0 project matrices remain available on the individual Project Matrices page (see the [Exploring Projects guide](/guides))


* HCA Data Storage Service (DSS) and API;  data is now stored in the Terra Data Repo (TDR), an alternative storage and metadata management service that supports managed access

### What’s Coming Next?

We are (re)processing the original DCP 1.0 projects as well as the 16 new projects with the latest HCA 10X and SmartSeq-2 pipelines. When processing is complete, each project will have DCP Generated matrices that are stratified by species, organ, and library construction method (i.e. 10x or Smart-seq2).

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


