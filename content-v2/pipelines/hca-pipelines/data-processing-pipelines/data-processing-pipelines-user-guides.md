---
path: "/pipelines/hca-pipelines/data-processing-pipelines/data-processing-pipelines-user-guides"
date: "2018-05-03"
title: "Overview of Data Processing Pipelines"
description: "Overview of the data processing pipelines in the HCA DCP."
---

# Overview of Data Processing Pipelines
## What is Data Processing?
In the HCA DCP, data processing refers to the use of a computational pipeline to analyze raw experimental data from a specific assay. Processing of HCA data produces collections of quality metrics and features that can be used for further analysis. For example, the processing of single-cell RNA-Seq data produces aligned, QC’d reads, a matrix of gene expression, and a matrix of quality control metrics describing the data.   

## What is the Data Processing Pipeline Service?
The Data Processing Pipeline Service consists of analysis pipelines and execution infrastructure that move raw data through analysis, producing measurements that are available for download by the community from the Data Portal. These include both the submitted raw data and data resulting from data processing. As new single-cell technologies and analysis methods are developed and accepted by the research community, we will implement new data processing pipelines and make both the pipelines and the data publically available.

Data processing pipelines are each bespoke to the characteristics of the data they process. These pipelines can attempt to address the quality of the measurements, detecting false positives or negatives, optimal processing (such as aligning, collapsing UMIs, or segmenting images into accurate features), and many other concerns. Please see the details about each of our pipelines and send us your feedback!

The following are pipelines in development or in production in this platform:

| Pipeline Name | Data Type                                   | Description                                                                                                                            | Analysis Output                                     |
|------------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Smart-seq2    | Full transcript single-cell transcriptomics, paired or single- end, plate- or fluidigm-based | This pipeline currently supports the Smart-seq2 protocol as described [here](https://www.nature.com/articles/nprot.2014.006). Read more about the pipeline [here](/pipelines/smart-seq2-workflow).                              | Aligned BAM with tagsCounts Matrix (genes); QC Matrix |
| Optimus | 3’ capture single-cell and single-nuclei transcriptomics      | This pipeline supports 3’ scRNA-Seq data from the 10x v2 and v3 assay | Aligned BAM with tagsCounts Matrix (genes); QC Matrix |


## Access to Pipeline Outputs
Matrices are publicly available and can be accessed through the HCA Data Browser.








