---
date: "2020-12-07"
title: DCP Updates
description: "Latest updates for the HCA Data Coordination Platform (DCP)."
---

# DCP Platform Updates

## New managed access and Seed Network projects 

#### July 23, 2021

The DCP has added its first managed access project* (see project #1 below) with its accompanying contributor-generated matrix. While the raw data may be downloaded with the appropriate permissions, the cell-by-gene count matrices are available to the whole HCA community.

Additionally, DCP now has the first project data from the [HCA Seed Networks](https://chanzuckerberg.com/science/programs-resources/single-cell-biology/seednetworks/)\*\*, which are further developing the Human Cell Atlas by combining the expertise of experimental scientists, software engineers, and physicians.

#### Projects with new raw data and/or contributor-generated matrices:
1. Nuclei multiplexing with barcoded antibodies for single-nucleus genomics*
1. Single cell transcriptional and chromatin accessibility profiling redefine cellular heterogeneity in the adult human kidney**
1. Stress-induced RNA–chromatin interactions promote endothelial dysfunction**
1. A single-cell atlas of the healthy breast tissues reveals clinically relevant clusters of breast epithelial cells**
1. Integrated scRNA-Seq Identifies Human Postnatal Thymus Seeding Progenitors and Regulatory Dynamics of Differentiating Immature Thymocytes
1. Single-cell transcriptomic atlas of the human endometrium during the menstrual cycle.
1. Single-cell reconstruction of follicular remodeling in the human adult ovary
1. Single Cell RNA-Seq profiling human embryonic kidney cortex cells
1. Dissecting the Global Dynamic Molecular Profiles of Human Fetal Kidney
1. Development by Single-Cell RNA Sequencing
1. Establishing Cerebral Organoids as Models of Human-Specific Brain Evolution
1. Single-cell transcriptomics of the human retinal pigment epithelium and choroid in health and macular degeneration
1. A single cell atlas of human teeth
1. Single cell RNA-Seq of E18.5 developing mouse kidney and human kidney organoids
1. Single-cell RNA sequencing of normal human kidney
1. Single-cell transcriptomics reveals the landscape of intra-tumoral heterogeneity and transcriptional activities of ECs in CC
1. Single-cell transcriptomics reveals unique features of human pancreatic islet cell subtypes
1. Re-evaluation of human BDCA-2+ DC during acute sterile skin inflammation
1. Molecular and functional heterogeneity of IL-10-producing CD4+ T cells
1. Single-cell transcriptomes of the aging human skin reveal loss of fibroblast priming

\* Managed access project, \*\* Seed Networks project

#### Projects with new uniformly processed data:
1. Single-cell analysis reveals congruence between kidney organoids and human fetal kidney
1. A Cellular Anatomy of the Normal Adult Human Prostate and Prostatic Urethra
1. The emergent landscape of the mouse gut endoderm at single-cell resolution
1. Microglia Require CD4 T Cells to Complete the Fetal-to-Adult Transition
1. High throughput error corrected Nanopore single cell transcriptome sequencing
1. Colonic single epithelial cell census reveals goblet cell drivers of barrier breakdown in inflammatory bowel disease.


## Data Portal now contains data for 13.5 million cells 

#### June 16, 2021

* Raw data and contributor-generated matrices are available for 15 new projects. These single-cell data are derived from:
   * Single-cell and single-nucleus
   * 10x 3’ v2 and v3 3’ and 10x 5’ chemistry, Fluidigm C1, Smart-seq2, and sci-CAR ATAC sequencing technologies
   * Adipose tissue, blood, bone marrow, CSF, heart, kidney, lung, oral cavity, ovary, pancreas, prostate, skeletal muscle, testis, and umbilical vein
   * Disease states including COVID-19 infection, intracranial hypertension, multiple sclerosis, and renal cell carcinoma
   * Developmental stages including fetal, child, adolescent, and adult

* Standardized data, including aligned BAMs and cell-by-gene count matrices (Loom format), are available for 8 additional projects with data derived from:
   * 10x v2 and v3 3’ sequencing technologies
   * Brain (superior parietal cortex, middle temporal gyrus, and temporal cortex), epididymis, immune tissue, cortex of the kidney organoid, lymph nodes, placenta (chorionic villus and decidua), spine, testis, and thymus
   * Disease states including Alzheimer disease and cognitive impairment with or without cerebellar ataxia


* New Jupyter Notebook tutorials for analyzing standardized DCP matrix files are available in an [Intro-to-HCA-data-on-Terra](https://app.terra.bio/#workspaces/featured-workspaces-hca/Intro-to-HCA-data-on-Terra) workspace on the cloud-based platform Terra. 
   * After registering, you can try the step-by-step instructions for importing HCA data and analyzing in common community tools such as Bioconductor, Cumulus, Pegasus, Scanpy, and Seurat. 

## Raw sequencing data and contributor-generated matrices for 23 new projects available for download
#### May 10, 2021

* Data Portal now has data for 12.2 million cells, including new standardized analyses for 13 projects as well as raw sequencing data and contributor-generated matrices for 23 new projects.


* The standardized data, including aligned BAMs and cell-by-gene count matrices (Loom format), are derived from:
  * Human and mouse 
  * Single-cell and single-nucleus 
  * 10x V2 and V3 3’ chemistry
  * Blood, brain (including substantia nigra, developing hippocampus, cortex, retina), liver, lung, mouth, skeletal muscle, skin, spleen, and developing thymus
  * Disease states including HIV, drug hypersensitivity syndrome, multiple sclerosis, and thoracic aortic aneurysm


* The 23 new projects and contributor-generated matrices include data derived from:
  * Human and mouse
  * Smart-seq2, 10x V2 and V3 3’ chemistry, Drop-seq, and Fluidigm C1 sequencing methods
  * Blood, bone marrow, brain, cord blood, epididymis, fetal gonads, immune organ, kidney organoid, lymph nodes, pancreas,  skin, and trachea
  * Disease states including Alzheimer’s Disease, multiple sclerosis, autoimmune encephalitis, and type 2 diabetes


* The Matrix Overview guide has been updated to include additional information on matrix [batch correction and normalization](/guides/consumer-vignettes/matrices#matrix-normalization-and-batch-correction). 

## Raw data for 16 new projects now available 
#### April 12, 2021

Raw sequencing data for 16 new projects are now available in the DCP [Data Browser](https://data.humancellatlas.org/explore/projects). These projects include single-cell data derived from:
- Human and mouse
- 10x 3’, 10x 5’, Smart-seq2 technologies
- Small intestine, aorta, brain, skeletal muscle, blood, pancreas, tonsil, lung, skin, immune system, kidney, and eye
- Airway basal stem cells exposed to SARS-CoV-2
- Disease states, including Crohn’s Disease, aneurysm, Multiple Sclerosis, HIV, Type 2 Diabetes, and glioblastoma


## Processed data now available for 26 HCA 10x datasets
#### April 02, 2021

The [DCP 2.0 Preview](https://data.humancellatlas.org/explore/projects) now has standardized BAMs and count matrices (Loom file format) available for 26 HCA projects, including 15 new projects. These projects contain both human and mouse single-cell and single-nucleus data generated with 3’ 10x V2 and V3 sequencing technology. This data was processed using the latest version of the Optimus pipeline (see the [Optimus Overview](https://data.humancellatlas.org/pipelines/optimus-workflow)). 

In addition to individual sample count matrices, each newly processed project also has standardized, project-level DCP-generated matrices that are stratified by organ, species, and library construction method. These matrices are minimally filtered to include only cells with more than 100 UMIs. You can download the project-level DCP-generated Matrices from the Data Browser (see image below) or from the individual Project page (see the [Exploring Projects](https://data.humancellatlas.org/guides) guide)

![](../../guides/_images/explore_dcp_2_matrices.png)

### New raw data and Contributor-Generated Matrices

Raw sequence files and contributor-generated matrices (CGMs) for an additional 11 new projects are available for download from the [DCP 2.0 Preview](https://data.humancellatlas.org/explore/projects). These projects include human adult, embryonic, and fetal data derived from 10 organs - brain, blood, bone marrow, colon, thymus, pancreas, placenta, mouth, liver, and spleen. Most projects employed 10x sequencing technology, but some additionally used cite-seq and drop-seq. 

With the addition of these new data, the DCP now has 55 total projects with over 7 million cells derived from 40 organs and 580 donors. We are grateful for the contributions and continued support of the 179 global labs who made this data available.   

### Download new data using updated guides

All files (raw data, CGMs, and DCP-generated BAMs and matrices) can be downloaded following the instructions in the [Accessing HCA Data and Metadata](/guides/quick-start-guide) guide. 
Additionally, you can access matrix files programmatically using the new [Programmatic Download](https://colab.research.google.com/drive/1h14mbunsepfogcnG9VEF4FIGpuyGLA-P#scrollTo=jxk27LZk4373) guide.


## DCP 2.0 launches; new projects, contributor generated matrices and DCP 2.0 infrastructure
#### December 11, 2020

In the spirit of bringing HCA data to the community as quickly as possible, we are releasing the new DCP 2.0 data and infrastructure incrementally. 

This initial launch -- the first of several planned to roll out new functionality, pipelines, and data -- includes: 
* Raw data and standardized metadata for 5.8 million cells 
* Contributor-generated matrices, embeddings, and annotations for existing and **16 new DCP projects**
* New DCP 2.0 infrastructure (details below)

### What’s included in the new projects?

The new projects include a mix of human and mouse data from a variety of organs including adipose tissue, heart, hindlimb, spleen skin, yolk sac, diaphragm, tongue, trachea and more. These data encompass:
* 143 donors
* 248 specimens
* estimated 1.3M additional cells

> View the new projects using the **[DCP 2.0 Data Preview](/what-is-the-dcp-20-data-preview)**

### What’s included in the DCP 2.0 infrastructure updates?

Along with the new data view, we have updated DCP infrastructure by **retiring and replacing** the following features:

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


## Coming Soon - DCP 2.0
#### October 9, 2020

We are excited to announce the launch of the DCP 2.0 this fall. This has been a collaborative effort over the past 6 months to take on board the HCA community feedback and understand the unmet needs in order to align the goals of the DCP with the wider HCA community goals.

We have made significant changes, including GA4GH-compliance, more data—50% more than previously—and, where available, contributor-generated count matrices, embeddings, and cell type annotations.

## Changes Coming to Key Components


To accomplish this, we will be making the following changes and migrations:
 
* The current Data Storage Service (DSS) will be retired and we will migrate to the Terra Data Repo, which supports managed access, for storage and metadata management. Both Ingest and the Data Browser will access the Terra Data Repo via self-service APIs, making for minimal disruption to the HCA scientific community.


* The matrix service API will be retired.  The per-project matrices that are most commonly used will be available in static form directly from the data browser.

* As a higher-level replacement for the DSS API, the Data Browser API is being prepared for use by the wider developer community and will be officially documented and supported by the HCA DCP team.
 
* The HCA-CLI will be retired and the Data Browser will provide a bulk download capability via curl (or similar) commands.  Because the internal organization of the data store is subject to change with upcoming work on the metadata, direct calls against it are discouraged in favor of the new Data Browser API.


## Transition Path to DCP 2.0

More information about the transition to DCP 2.0 will be announced in the coming weeks and we will endeavor to make this transition as seamless as possible to the HCA research and developer communities.

> To enable a smooth transition, the DCP 1 data browser, APIs and data will remain available until January 1, 2021. 

We will continue to integrate third-party portals and applications into the HCA ecosystem by linking from and integrating directly into the HCA Data Browser.  
 
Regards,

The HCA DCP Team



