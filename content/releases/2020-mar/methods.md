---
path: "/releases/documentation/2020-mar/methods"
date: "2020-03-31"
title: "Methods"
draft: true
---

## Methods
# HCA Release March 2020 Methods
## Overview
This document details the Human Cell Atlas (HCA) Data Coordination Platform’s (DCP) methods for cell clustering, differential expression analyses, and data visualization used in the HCA March 2020 Data Release. Overall, individual DCP project loom files (available for download from the [DCP Data Portal]() were analyzed using Cumulus (v0.13.0), a single-cell analysis workflow ( [Li et al. 2019](https://www.biorxiv.org/content/10.1101/823682v1). 
Further details about the HCA March 2020 Data Release can be found on the [DCP Portal’s  Data Release Page](INSERTLINK). A step-by-step guide for the entire release methods, including using the Cumulus workflow, is provided at [](INSERT LINK). Additionally, you can find techniques for manipulating and interacting with release files in [this tutorial](INSERT LINK).

## Project stratification and loom file preparation
Each DCP Release project was stratified into individual datasets by organ and when applicable, by developmental stage (adult or fetal) or by sample processing technology (Smart-seq2 or Optimus).  Loom files for the stratified DCP Release datasets were obtained by filtering projects on the [DCP Data Portal]() using the stratification criteria above. The metadata in these loom files was modified to include new ontology labels and corrections to existing ontology labels. Additionally, due to a processing error, all EmptyDrops data was removed from loom files produced with the Optimus pipeline. All updated loom files used for the March 2020 Release are available for download on the [DCP Portal’s Data Release page](INSERT LINK). 

## Terra workspace preparation
Each DCP Release dataset was analyzed in individual workspaces in the cloud-based platform [Terra](app.bio.terra). The Cumulus workflow ([Snapshot 14](https://portal.firecloud.org/#methods/cumulus/cumulus/14/wdl)) was imported from the Broad Methods Repository into each Terra workspace. Each workspace links to a workspace-specific google bucket (WORKSPACE_BUCKET) to which dataset loom files were uploaded. Throughout the Cumulus workflow, the cloud path to the google bucket was used to specify the name of each dataset’s input and output files (see example in the [Global Inputs section](#-global-inputs). 

## Cumulus workflow
The Cumulus workflow was used to perform cell clustering, differential expression analyses, and plotting using a single count matrix (the DCP loom files) as input. More information about Cumulus can be found in the [main documentation](https://cumulus.readthedocs.io/en/0.13.0/cumulus.html). Additionally, you can view the Cumulus workflow used for these analyses in the [Broad Methods Repository](https://portal.firecloud.org/#methods/cumulus/cumulus/14/wdl) or on [GitHub](https://github.com/klarman-cell-observatory/cumulus/blob/c937a832718aacbe75a0fdbca9cde682c48e2407/workflows/cumulus/cumulus.wdl). 

The following sections describe the specific Cumulus parameters used for the HCA March 2020 Release. Global inputs are described first, followed by parameters for each Cumulus task: clustering, differential expression, and visualization. Additionally, this section lists the parameters for generating Single Cell Portal-compatible outputs. All the parameters are detailed in the [Cumulus documentation](https://cumulus.readthedocs.io/en/latest/cumulus.html#run-cumulus-analysis).. Any unspecified Cumulus parameters (not listed in tables below) were set to the default attributes listed in the Cumulus documentation. To run the Cumulus workflow in Terra, these parameters were specified using a JSON file which was uploaded directly to each workspace (see an example JSON file used for the [March 2020 Release](insert link)).


### Global inputs
The table below details the file input names, output names, and the CPUs used for the Cumulus analyses in Terra.

| Input name | Description |  Attribute | 
| --- | --- | --- |
| Input_file | String location of the google cloud bucket hosting the DCP dataset loom file | “gs://WORKSPACE_BUCKET” |
| Num_cpu | Number of CPUs recommended for the analysis | 8 |
| Output_name | String describing cloud path to an outpath folder | "gs://WORKSPACE_BUCKET/output/ [Dataset ID]” |


### Clustering
The Cumulus workflow clustered cells using the Louvain method, a modularity-based community detection algorithm ([Li et al. 2019]( https://www.biorxiv.org/content/10.1101/823682v1.full)). The following table lists all the Cumulus workflow parameters used for cell clustering.  

| Input name | Description |  Attribute | 
| --- | --- | --- |
| channel | Specifies the sample ID in the input dataset | “cell_suspension.provenance.document_id” |
| considered_refs | will read all groups from reference genome | GRCh38 |
| output_filtration_results | Output the filtration results | true |
| output_loom | Output the loom file | true |
| output_seurat_compatible | Generate Seurat-compatible h5ad file. Caution: File size might be large, do not turn this option on for large data sets. | true |
| plot_filtration_results | Plot the filtration results | true
| run_diffmap | Run a diffusion map for visualization | true  |
| run_fitsne | Run a FFT-accelerated Interpolation-based t-SNE (FItSNE) for visualization | true |
| run_fle | Run force-directed layout embedding (FLE) for visualization | true |
| run_louvain | Run Louvain clustering algorithm | true |
| run_umap | Run umap for visualization | true |
| max_genes | Only keep cells with less than <max_genes> of genes. This is set higher than the default parameter to avoid filtering cells | 15,000 | 
| percent_mito | Only keep cells with mitochondrial ratio less than <percent_mito>% of total counts. This is set lower than default parameters to avoid filtering cells.	| 5.0 | 

### Differential expression
Differential expression analyses were carried out using the statistical tests specified in the table below. False Discovery Rates were calculated using the Benjamini-Hochberg procedure with a default alpha set to 0.05. For each test, gene expression within a specified louvain cluster was compared to the average of all other clusters. 

| Input name | Description |  Attribute | 
| --- | --- | --- |
| auc | Calculates area under the curve | true |
| Fisher | Calculate fisher exact test | true |
| mwu | Calculate Mann-Whitney U | true |
| perform_de_analysis | Perform differential expression analyses | true |
| t_test | Calculate Welch’s t-test | true |

### Visualization (plotting)
To visualize cell similarity, multiple low-dimension embeddings were generated using the Cumulus parameters below. These parameters depended on sequencing technology (10x vs. SS2)

| Input name | Description | 10x Attributes | Smart-seq2 Attributes |
| --- | --- | --- | --- |
| plot_fitsne | Create a FFT-accelerated Interpolation-based t-SNE (FItSNE)-like plot according to “attribute, “attribute...”  | “louvain_labels,Channel” | “louvain_labels” |
| plot_fle | Create a Force-directed Layout Embedding (FLE)-like plot according to “attribute, “attribute...”  | “louvain_labels,Channel” | “louvain_labels” |
| plot_umap | Create a uniform manifold approximation and projection (UMAP)-like plot | "louvain_labels,Channel” | "louvain_labels” |


### Generating Single-Cell Portal compatible outputs: 
Single Cell Portal compatible outputs were generated with the following parameters. The resulting files were used to create interactive [Single Cell Portal Studies](https://singlecell.broadinstitute.org/single_cell?scpbr=human-cell-atlas-march-2020-release).

| Input name | Description |  Attribute | 
| --- | --- | --- |
| generate_scp_outputs |  Generate outputs compatible with Single-Cell Portal | true |
| output_dense | Boolean describing if outputs should be in dense format | false |

## Cell Annotations

Cell annotations were obtained from the publications listed on each dataset’s project page or from the project contributors. The nomenclature for annotations was harmonized across all DCP Release projects using the [Ontology Lookup Service](https://www.ebi.ac.uk/ols/index) and the mapping tool Zooma (https://www.ebi.ac.uk/spot/zooma/). The resulting harmonized annotations were mapped to Cumulus output loom and h5ad matrix files (listed in the [Release Files table](#release-files) using cell barcodes (for 10x technology) or IDs (for Smart-seq2 technology).

## Release files
The following table describes the final Cumulus output files that are available in the DCP Release page and in interactive portals. Files with a “.scp” demarcation are Single Cell Portal-specific files and are only available on the Single Cell Portal study page (see the [Single Cell Portal March 2020 Release Page](https://singlecell.broadinstitute.org/single_cell?scpbr=human-cell-atlas-march-2020-release). All other files, including the output loom, h5ad, and differential expression xlsx and CSV files are available for download on the dataset-specific pages listed on the [DCP Release page] (INSERT link). All output file names start with the Dataset ID, the unique ID given to each release dataset and is listed on the [DCP Release page](INSERT LINK).

| File name | Description |  Format | 
| --- | --- | --- |
|  Dataset_ID.loom | Loom file generated by the HCA Matrix service and used as input to the Cumulus pipeline. | Loom |			
| Dataset_ID.de.xlsx | Cumulus output file containing differential expression with correction | XLSX |		| Dataset_ID.filt.xlsx | Filtering information | XLSX |		
| Dataset_ID_annoated_v1.loom | Cumulus output loom containing clustering information, cell annotations, and log-transformed gene expression | Loom |	
| Dataset_ID.seurat_annotated_v1.h5ad | Seurat compatible Cumulus output containing clustering Information, cell annotations, and log-transformed gene expression| h5ad |
| Dataset_ID.scp.X_diffmap_pca.coords.txt | Diffusion map coordinates for Single Cell Portal | TXT |		
| Dataset_ID.scp.X_fitsne.coords.txt | FIt-SNE coordinates for Single Cell Portal | TXT |	
| Dataset_ID.scp.X_fle.coords.txt | fle cluster coordinates for Single Cell Portal |  TXT |
| Dataset_ID.scp.X_umap.coords.txt | UMAP cluster coordinates for Single Cel Portal| TXT |	
| Dataset_ID.scp.barcodes.tsv | 10X compatible barcodes file for Single Cell Portal | TSV |	
| Dataset_ID.scp.features.tsv | 10X compatible features (genes) file for Single Cell Portal | TSV |	
| Dataset_ID.scp.matrix.mtx | 10X compatible mtx expression file for Single Cell Portal | mtx |
| Dataset_ID.scp.metadata.txt | Metadata matrix for Single Cell Portal | TXT | 
| CSV Files | --- | --- |	


| Note about CSV files | 
| :-- |
| The CSV files contain differential expression data. These were generated from the Dataset_ID.de.xlsx to enable easier viewing with R or Python. Detailed steps for using these files are listed in the [Release Tutorial](INSERT LINK). |

For more information regarding how cell clustering information is stored in the h5ad and loom output files, please read the [Cumulus Documentation](https://cumulus.readthedocs.io/en/0.13.0/cumulus.html#cluster-outputs). You can also read more about the available differential expression outputs in the [Cumulus DE Outputs documentation](https://cumulus.readthedocs.io/en/0.13.0/cumulus.html#de-analysis-outputs). Techniques for uploading loom and h5ad files into common analysis software are described in the this [Release Tutorial] (INSERT LINK). 

## Want to learn more?

You can get hands-on experience with these methods by following our step-by-step guide (INSERT LINK). You can also find more details about each individual dataset by visiting INSERT RELEASE PAGE.

