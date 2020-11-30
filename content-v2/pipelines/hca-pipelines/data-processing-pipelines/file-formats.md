---
path: "/pipelines/hca-pipelines/data-processing-pipelines/file-formats"
date: "2018-05-03"
title: "Data Processing Pipelines File Formats"
description: "Overview of the file formats used by the data processing pipelines of the HCA DCP."
---

# File Formats of the Data Processing Pipelines Service

## DCP Matrix Download File Format

> **MTX and CSV Matrix Deprecation Notice:** 
DCP 1.0 matrices will be deprecated in the DCP 2.0. Loom files will be the default format.    

Cell by gene count matrices are provided in [Loom](http://loompy.org/) file format and be downloaded through the HCA Data Portal. From the Portal's Data Browser, you can make a multifaceted search to download matrices for multiple projects. Alternatively, you can explore the matrices available for download on the individual Project pages.

#### Working with Loom Files

Loom files can be explored using multiple Python- and R-supported downstream analysis tools, including [Loompy](http://loompy.org/), [SCANPY](https://github.com/theislab/scanpy), and [Pegasus](https://pegasus.readthedocs.io/en/latest/). You can also visualize Loom files using Bioconductor's [LoomExperiment](https://www.bioconductor.org/packages/release/bioc/html/LoomExperiment.html).


## Contributor-generated Matrix File Format
When available, contributor-generated count matrices will be provided on individual Project pages. These matrices will vary in file format and content. To learn more about a specific contributor-generated matrix file, reach out to the Contacts listed on the Project page. 
