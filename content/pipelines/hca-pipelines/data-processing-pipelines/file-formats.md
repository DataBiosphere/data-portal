---
path: "/pipelines/hca-pipelines/data-processing-pipelines/file-formats"
date: "2018-05-03"
title: "Data Processing Pipelines File Formats"
description: "Overview of the file formats used by the data processing pipelines of the HCA DCP."
---

# File Formats of the Data Processing Pipelines Service

## Matrix Download File Formats

Matrices are best downloaded through the HCA *Data Portal*. You can use the portal's Data Browser to make a multifaceted search to dynamically generate matrices. This functionality is powered by our Expression Matrix Service (which will allow programmatic access in the future). Using the Data Browser, users can specify a desired file type for expression matrices during download. The following formats are currently supported: Zarr, CSV, and .loom formats.

We are creating vignettes to demonstrate working with HCA expression matrices in several common data science environments. Please note that these notebook vignettes are intended to show how to initiate data analysis with data from the HCA DCP and that these data are usable in common environments. The vignettes are not intended to teach analysis.

* [Jupyter Notebook](https://github.com/HumanCellAtlas/data-consumer-vignettes/tree/master/Download%20Expression%20Matrix%20for%20Scanpy) showing analysis of Smart-seq2 data in python using HCA matrices.

## Matrix Data Storage File Format

Internally, the Data Processing Pipelines Service uses the [Zarr version 2](https://zarr.readthedocs.io/en/stable/spec/v2.html) format for storage of expression matrices and their associated metadata. Working with Zarr formatted files is only necessary when directly accessing the Data Store using the HCA CLI. For most users, the Data Portal and Expression Matrix Service are better sources of matrices and provide additional file formats (besides Zarr files). 

The Zarr format stores information in groups and arrays, where groups can contain other groups and arrays are stored chunked and compressed. The group and chunk structure is conveyed in the file names and directory structure. For information about creating and using the Zarr format see this [Zarr tutorial](https://zarr.readthedocs.io/en/stable/tutorial.html#). For information about the file structure and content of the files we generate, see [this doc](https://github.com/HumanCellAtlas/skylab/blob/6aa3a97800aab23c18cd746800b9e4073e53e810/docs/matrix_format_spec.md).


