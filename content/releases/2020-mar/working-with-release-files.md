---
path: "/releases/documentation/2020-mar/working-with-release-files"
date: "2018-05-03"
title: "Working with Release Files"
draft: true
---

## Working with Release Files

There are multiple tools available to view and manipulate the March 2020 Release files. This guide focuses on importing release files into Python and R-supported software such as Pegasus, Seurat, and Scanpy, in addition to visualizing and annotating files in Single Cell Portal. We will use the [2020-Mar-Landscape-Adult-Liver-10x](INSERT LINK TO RELEASE PAGE) dataset as an example, but the following techniques will work for all Release datasets. The software we use is only a subset of single-cell analysis tools; we encourage the community to explore these files using other portals and tools as they become available!

If you would like to know more about how these release files were generated, please see [March 2020 Release Methods] or take an [analysis tutorial](INSERT LINK) using an HCA Release dataset. 

## Importing annotated release files into R and Python visualization resources

You can view the annotated Cumulus output loom and h5ad files using external resources such as [Pegasus](https://pegasus.readthedocs.io/en/latest/), [Seurat](https://satijalab.org/seurat/), and [SCANPY](https://github.com/theislab/scanpy). Below, we import the are examples of how to import files into these resources, using the processes described in the [Cumulus documentation](https://cumulus.readthedocs.io/en/latest/cumulus.html#load-cumulus-results-into-pegasus). 10x matrix files (.mtx9) can be visualized using any [10x-compatible software](https://support.10xgenomics.com/single-cell-gene-expression/software/pipelines/latest/output/matrices). 

Add in r and python versions

### Pegasus 
[Pegasus](https://pegasus.readthedocs.io/en/latest/) is a Python package used by Cumulus for analyzing very large single-cell transcriptomes. 

To import the annotated Cumulus h5ad output files for the 2020-Mar-Landscape-Adult-Liver-10x, use the command:

> import pegasus as pg
adata = pg.read_input("output_name.h5ad")

To import Cumulus output loom files, use the command:
> import pegasus as pg
data = pg.read_input("output_name.loom", genome = "GRCh38")

#### Seurat 
 [Seurat](https://satijalab.org/seurat/) is an R package used for single-cell data quality control, analysis, and exploration. 

To import Cumulus h5ad files, use the command:
> ad <- import("anndata", convert = FALSE)
> test_ad <- ad$read_h5ad("output_name.seurat.h5ad")
> result <- convert_h5ad_to_seurat(test_ad)

To import Cumulus loom files:
First, install the loomR package. 
> install.package("devtools")
> devtools::install_github("mojaveazure/loomR", ref = "develop")

Next, load the loom file.
