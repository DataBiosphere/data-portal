---
date: "2020-12-07"
title: DCP Updates
description: "Latest updates for the HCA Data Coordinaton Platform (DCP)."
---

# DCP Platform Updates

## December 7, 2020

## DCP launches DCP 2.0 data preview and infrastructure

The Data Coordination Platform (DCP) 2.0 is an updated DCP platform that includes new projects, data processing, contributor-generated matrices, infrastructure and more! Read the full details of the changes in the [official announcement] (link). 

In the spirit of making data accessible to the community as soon as possible, we are incrementally releasing these DCP 2.0 updates. 

**Today, we are thrilled to announce the launch of optional contributor-generated matrices for all DCP projects, raw data and contributor matrices for 16 new projects, and an updated DCP 2.0 infrastructure.** 

Read on to learn more about exploring the new data with the [DCP 2.0 Data Preview](#what-is-the-dcp-20-data-preview) and what’s included in the [infrastructure](#infrastructure) updates. 

As we transition to DCP 2.0, we will continue to update this page with the latest information and you can read more below about [what’s coming next](#whats-coming-next)!

### What is the DCP 2.0 Data Preview?

The DCP 2.0 Data Preview is a separate data view enabling you to explore and access new and reprocessed DCP data as soon as they become available! 

For the DCP 2.0, we are reprocessing all DCP 1.0 data with the latest DCP pipelines, processing brand new datasets including single-nuclei data, and providing optional Contributor Generated Matrices for all projects. The DCP 2.0 Data Preview allows access to the newly processed data while still enabling use of the originally processed DCP 1.0 data.

#### How are the DCP 1.0 View and DCP 2.0 Data Preview different?

**DCP 1.0 View**:

The [DCP 1.0 View](link) lists all the original DCP (DCP 1.0) projects. 
From this view, you can:
- Access raw data for DCP 1.0 projects
- Access DCP 1.0 processed data generated with standardized pipelines (BAMs, etc.)
- Download DCP 1.0 project matrices (in CSV, MTX, and Loom formats)

**DCP 2.0 Data Preview**:

The [DCP 2.0 Data Preview](link) lists all DCP projects, including the 16 new DCP 2.0 projects.
From this view, you can:
- Access the raw data for all DCP projects; for DCP 1.0 projects, this raw data is the same as that in the DCP 1.0 view 
- Download the new optional contributor-generated matrices for each project
- When available, access data generated with updated DCP standardized pipelines
- When available, download the newly processed DCP-generated matrices (Loom format only)

As we continue to (re)process old and new DCP projects, we will incrementally add the newly processed data and DCP-generated matrices to the DCP 2.0 Data Preview. 

To start exploring DCP data, see the [Exploring Projects guide](link)!


### DCP 2.0 Infrastructure Updates

Along with the new data view we have also made updates to the DCP infrastructure itself. We have retired the following features:

- HCA CLI; data is now downloaded using curl commands (see the [Accessing HCA Data and Metadata guide](link)) 
- HCA Matrix Service; project matrices will be available on the individual Project Matrices page (see the [Exploring Projects guide](link))
- HCA DSS and its API; 

