---
date: "2020-03-31"
description: "This document details the Human Cell Atlas Data Portal methods for cell clustering, differential expression analyses, and data visualization used in the HCA March 2020 Data Release."
draft: true
path: "/releases/documentation/2020-mar/methods"
title: "Methods"
---

# March 2020 Release Methods

## Overview

This document details the Human Cell Atlas (HCA) Data Portal methods for cell clustering,
differential expression analyses, and data visualization used in the HCA March 2020 Data Release. Overall, 12 individual
HCA Data Portal projects were stratified into 23 datasets by organ, developmental stage and sample processing
technology. Gene
matrices for each dataset were uploaded into the cloud-based platform [Terra](https://app.terra.bio/) and analyzed using
Cumulus (v0.13.0), a single-cell analysis workflow ([Li et al. 2019](https://www.biorxiv.org/content/10.1101/823682v1)).
All Release files are available for download on the main <link-to-browser relativelink="/releases/2020-mar">March 2020
Release</link-to-browser> page.

## Project stratification and gene matrix preparation

The March 2020 Release includes all human HCA Data Portal projects that were processed with HCA Data Portal standardized
pipelines (Optimus or Smart-seq2). Each project was stratified into individual datasets by organ and when applicable, by
developmental stage (adult or fetal) or by sample processing technology (10x or Smart-seq2). For each Release dataset,
gene matrices in loom format were obtained by filtering projects on the HCA Data
Portal <link-to-browser relativelink="/#">Data Browser</link-to-browser> using the stratification criteria above.

| What is in the gene matrix?                                                                                                                                                                                                                                                                                                                            |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The content of the gene matrix depends on the sequencing technology of the dataset. The gene matrix for datasets processed with the 10x technology contain gene counts. The matrix for datasets processed with Smart-seq2 technology contain RSEM TPMs. All matrices also include important metadata, such as sample processing and organ information. |

#### Gene matrix corrections

The metadata in each gene matrix file was modified to include new ontology labels and corrections to existing ontology
labels. Additionally, due to a processing error, all EmptyDrops output was removed from files produced with the Optimus
pipeline. This has been corrected and EmptyDrops will be available in future releases. All updated gene matrix files (
loom format) used for the March 2020 Release are available for download under the Release Files column of the <
link-to-browser relativelink="/releases/2020-mar">March 2020 Release</link-to-browser> page.

**Please note that the March 2020 Release datasets were not corrected for batch effects.** Discrepancies may exist
between published datasets and the March 2020 Release datasets.

## Dataset IDs

Each dataset was given a unique ID with a “2020-Mar...” prefix. All Dataset IDs are listed on the <link-to-browser
relativelink="/releases/2020-mar">March 2020 Release</link-to-browser> page in the “Dataset” column. This Dataset ID was
used to name all input and output files relevant to each dataset.

## Terra workspace preparation

Each Release dataset was analyzed in individual workspaces in the cloud-based platform [Terra](https://app.terra.bio).
The Cumulus workflow ([Snapshot 14](https://portal.firecloud.org/#methods/cumulus/cumulus/14/wdl)) was imported from the
Broad Methods Repository into each Terra workspace. Each workspace links to a workspace-specific Google bucket (
WORKSPACE_BUCKET); each dataset’s gene matrix (loom format) was uploaded to the Google bucket. Throughout the Cumulus
workflow, the cloud path to the Google bucket was used to specify the name of each dataset’s input and output files (see
an example in the [Global Inputs section](#global-inputs)).

## Cumulus workflow

The Cumulus workflow was used to perform cell clustering, differential expression analyses, and plotting using each
dataset’s gene matrix (loom format) as input. More information about Cumulus can be found in
the [main documentation](https://cumulus.readthedocs.io/en/0.13.0/cumulus.html). Additionally, you can view the Cumulus
workflow used for these analyses in
the [Broad Methods Repository](https://portal.firecloud.org/#methods/cumulus/cumulus/14/wdl) or
on [GitHub](https://github.com/klarman-cell-observatory/cumulus/blob/c937a832718aacbe75a0fdbca9cde682c48e2407/workflows/cumulus/cumulus.wdl).

### Parameters

All parameters are detailed in
the [Cumulus documentation](https://cumulus.readthedocs.io/en/latest/cumulus.html#run-cumulus-analysis). Any unspecified
Cumulus parameters (not listed in the tables below) were set to default attributes listed in the documentation. To run
the Cumulus workflow in Terra, these parameters were specified using a workspace configuration file (JSON format) which
was uploaded directly to each workspace (see an [example JSON](_downloads/Example.JSON) file used for the March 2020
Release).

#### Global inputs

The table below details the attributes for Cumulus input files, output files, and the CPUs that were used for analyses
in Terra.

| Input name    | Description                                                                                              | Attribute                                   |
|---------------|----------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `Input_file`  | String location of the google cloud bucket hosting the HCA Data Portal dataset gene matrix (loom format) | `“gs://WORKSPACE_BUCKET”`                   |
| `Num_cpu`     | Number of CPUs recommended for the analysis                                                              | 8                                           |
| `Output_name` | String describing cloud path to an outpath folder                                                        | `"gs://WORKSPACE_BUCKET/output/Dataset ID”` |

#### Clustering

The Cumulus workflow was set to cluster cells using the Louvain method, a modularity-based community detection
algorithm ([Li et al. 2019]( https://www.biorxiv.org/content/10.1101/823682v1.full)). The following table lists all the
Cumulus workflow parameters used for cell clustering and dimensionality reduction.

| Input name                  | Description                                                                                                                                             | Attribute                                  | 
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `channel`                   | Specifies the sample ID in the input dataset                                                                                                            | `“cell_suspension.provenance.document_id”` |
| `considered_refs`           | Will read all groups from reference genome`                                                                                                             | GRCh38                                     |
| `output_filtration_results` | Output the filtration results                                                                                                                           | true                                       |
| `output_loom`               | Output the loom file                                                                                                                                    | true                                       |
| `output_seurat_compatible`  | Generate Seurat-compatible h5ad file. Caution: File size might be large, do not turn this option on for large data sets.                                | true                                       |
| `plot_filtration_results`   | Plot the filtration results                                                                                                                             | true                                       |
| `run_diffmap`               | Run a diffusion map for visualization                                                                                                                   | true                                       |
| `run_fitsne`                | Run a FFT-accelerated Interpolation-based t-SNE (FItSNE) for visualization                                                                              | true                                       |
| `run_fle`                   | Run force-directed layout embedding (FLE) for visualization                                                                                             | true                                       |
| `run_louvain`               | Run Louvain clustering algorithm                                                                                                                        | true                                       |
| `run_umap`                  | Run umap for visualization                                                                                                                              | true                                       |
| `max_genes`                 | Only keep cells with less than <max_genes> of genes. This is set higher than the default parameter to avoid filtering cells                             | 15,000                                     |
| `percent_mito`              | Only keep cells with mitochondrial ratio less than <percent_mito>% of total counts. This is set lower than default parameters to avoid filtering cells. | 5.0                                        |

#### Differential expression

Differential expression analyses were carried out using the statistical tests specified in the table below. False
Discovery Rates were calculated using the Benjamini-Hochberg procedure with a default alpha set to 0.05. For each test,
gene expression within a specified louvain cluster was compared to the average of all other clusters.

| Input name            | Description                              | Attribute | 
|-----------------------|------------------------------------------|-----------|
| `auc`                 | Calculates area under the curve          | true      |
| `Fisher`              | Calculate fisher exact test              | true      |
| `mwu`                 | Calculate Mann-Whitney U                 | true      |
| `perform_de_analysis` | Perform differential expression analyses | true      |
| `t_test`              | Calculate Welch’s t-test                 | true      |

#### Visualization (plotting)

To visualize cell clusters, multiple low-dimension embeddings were generated using the Cumulus parameters below. The
attributes for visualization depended on sequencing technology (10x vs. Smart-seq2), as described in the table.

| Input name    | Description                                                                                                   | 10x Attributes           | Smart-seq2 Attributes |
|---------------|---------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------|
| `plot_fitsne` | Create a FFT-accelerated Interpolation-based t-SNE (FItSNE)-like plot according to “attribute, “attribute...” | “louvain_labels,Channel” | “louvain_labels”      |
| `plot_fle`    | Create a Force-directed Layout Embedding (FLE)-like plot according to “attribute, “attribute...”              | “louvain_labels,Channel” | “louvain_labels”      |
| `plot_umap`   | Create a uniform manifold approximation and projection (UMAP)-like plot                                       | "louvain_labels,Channel” | "louvain_labels”      |

#### Generating Single Cell Portal compatible outputs:

Single Cell Portal compatible outputs were generated with the following parameters. The resulting files were used to
create
interactive [Single Cell Portal studies](https://singlecell.broadinstitute.org/single_cell?scpbr=human-cell-atlas-march-2020-release).

| Input name             | Description                                             | Attribute |
|------------------------|---------------------------------------------------------|-----------|
| `generate_scp_outputs` | Generate outputs compatible with Single-Cell Portal     | true      |
| `output_dense`         | Boolean describing if outputs should be in dense format | false     | 

## Cumulus output files

The following table describes all Cumulus output files, including unannotated, normalized expression matrices.

Files with a “.scp” demarcation are only needed to create Single Cell Portal studies and can be found on the Single Cell
Portal study page (see
the [Single Cell Portal HCA Release Page](https://singlecell.broadinstitute.org/single_cell?scpbr=human-cell-atlas-march-2020-release)).

All output file names start with the Dataset ID, the unique ID given to each release dataset that is listed on the <
link-to-browser relativelink="/releases/2020-mar">March 2020 Release</link-to-browser> page.

*Important Note*: These files include unannotated expression matrices and are not the final Release files. For
descriptions of the final Release files, please see the
section [Final March 2020 Release files](#final-march-2020-release-files).

| File name                                 | Description                                                                                              | Format |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------|--------|
| `Dataset_ID.de.xlsx`                      | Output file containing differential expression with correction                                           | XLSX   |
| `Dataset_ID.filt.xlsx`                    | Output file containing filtering information                                                             | XLSX   |
| `Output/Dataset_ID.loom`                  | Expression matrix; contains clustering information and log-transformed gene expression                   | Loom   |
| `Output/Dataset_ID.seurat.h5ad`           | Seurat-compatible expression matrix; contains clustering information and log-transformed gene expression | h5ad   |
| `Dataset_ID.scp.X_diffmap_pca.coords.txt` | Diffusion map coordinates for Single Cell Portal                                                         | TXT    |
| `Dataset_ID.scp.X_fitsne.coords.txt`      | FIt-SNE coordinates for Single Cell Portal                                                               | TXT    |
| `Dataset_ID.scp.X_fle.coords.txt`         | fle cluster coordinates for Single Cell Portal                                                           | TXT    |
| `Dataset_ID.scp.X_umap.coords.txt`        | UMAP cluster coordinates for Single Cel Portal                                                           | TXT    |
| `Dataset_ID.scp.barcodes.tsv`             | 10x compatible barcodes file for Single Cell Portal                                                      | TSV    |
| `Dataset_ID.scp.features.tsv`             | 10x compatible features (genes) file for Single Cell Portal                                              | TSV    |
| `Dataset_ID.scp.matrix.mtx`               | 10x compatible mtx expression file for Single Cell Portal                                                | mtx    |
| `Dataset_ID.scp.metadata.txt`             | Metadata matrix for Single Cell Portal                                                                   | TXT    |

For more information regarding how cell clustering information is stored in the normalized expression matrix (h5ad and
loom format files), please read
the [Cumulus Documentation](https://cumulus.readthedocs.io/en/0.13.0/cumulus.html#cluster-outputs). You can also read
more about the available differential expression outputs in
the [Cumulus DE Outputs documentation](https://cumulus.readthedocs.io/en/0.13.0/cumulus.html#de-analysis-outputs).

## Cell type annotations

Cell type annotations were obtained from the publications listed on each dataset’s project page or from the project
contributors. The nomenclature for annotations was harmonized across all HCA Data Portal Release projects using
the [Ontology Lookup Service](https://www.ebi.ac.uk/ols/index) and the mapping
tool [Zooma](https://www.ebi.ac.uk/spot/zooma/). The resulting harmonized annotations were mapped to the normalized
expression matrices (loom and h5ad file formats) generated by Cumulus using cell barcodes (for 10x technology) or IDs (
for Smart-seq2 technology).

#### Tools for adding annotations

Annotations were added to normalized expression matrices in loom and h5ad formats using [LoomPy](http://loompy.org/)
and [SCANPY](https://icb-scanpy.readthedocs-hosted.com/en/stable/), respectively.

#### Annotation metadata

Three column attributes were added to each Cumulus output expression matrix (loom and h5ad):

- `annotated_cell_identity.text`: the original cell type labels provided by the project contributor
- `annotated_cell_identity.ontology`: the ontology ID
- `annotated_cell_identity.ontology_label`: the harmonized cell type label obtained using the specified ontology

For visualization in Single Cell Portal, these columns were also added to the file
named `Dataset_ID_annotated_v1.scp.metadata.txt`.

## Final March 2020 Release files

The following table describes the final Release files available in the HCA Data Portal Release page and in interactive
portals.
Files with a “.scp” demarcation are only needed to create Single Cell Portal studies and can be found on the Single Cell
Portal study page (see
the [Single Cell Portal HCA Release Page](https://singlecell.broadinstitute.org/single_cell?scpbr=human-cell-atlas-march-2020-release)).

All output file names start with the Dataset ID, the unique ID given to each release dataset and is listed on the HCA
Data Portal
Release page.

| File name                                  | File location: HCA Data Portal and/or SCP | Description                                                                                                                                                                                | Format |
|--------------------------------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| `Dataset_ID.loom`                          | HCA Data Portal/SCP                       | Gene matrix file generated with HCA Data Portal standardized pipelines (Optimus and Smart-seq2) and used as Cumulus input.                                                                 | Loom   |
| `Dataset_ID.de.xlsx`                       | HCA Data Portal/SCP                       | Cumulus output file containing differential expression with correction                                                                                                                     | XLSX   |
| `Dataset_ID.de.CSV.zip`                    | HCA Data Portal/SCP                       | zip of CSV files containing differential expression analyses                                                                                                                               | CSV    |
| `Dataset_ID.filt.xlsx`                     | HCA Data Portal/SCP                       | Cumulus output file containing filtering information                                                                                                                                       | XLSX   |
| `Dataset_ID_annoated_v1.loom`              | HCA Data Portal/SCP                       | Expression matrix generated by Cumulus and annotated using harmonized cell types; contains clustering information, cell annotations, and log-transformed gene expression                   | Loom   |
| `Dataset_ID.seurat_annotated_v1.h5ad`      | HCA Data Portal/SCP                       | Seurat compatible expression matrix generated by Cumulus and annotated using harmonized cell types; contains clustering information, cell annotations, and log-transformed gene expression | h5ad   |
| `Dataset_ID.scp.X_diffmap_pca.coords.txt`  | SCP                                       | Diffusion map coordinates for Single Cell Portal                                                                                                                                           | TXT    |
| `Dataset_ID.scp.X_fitsne.coords.txt`       | SCP                                       | FIt-SNE coordinates for Single Cell Portal                                                                                                                                                 | TXT    |
| `Dataset_ID.scp.X_fle.coords.txt`          | SCP                                       | fle cluster coordinates for Single Cell Portal                                                                                                                                             | TXT    |
| `Dataset_ID.scp.X_umap.coords.txt`         | SCP                                       | UMAP cluster coordinates for Single Cel Portal                                                                                                                                             | TXT    |
| `Dataset_ID.scp.barcodes.tsv`              | SCP                                       | 10x compatible barcodes file for Single Cell Portal                                                                                                                                        | TSV    |
| `Dataset_ID.scp.features.tsv`              | SCP                                       | 10x compatible features (genes) file for Single Cell Portal                                                                                                                                | TSV    |
| `Dataset_ID.scp.matrix.mtx`                | SCP                                       | 10x compatible mtx expression file for Single Cell Portal                                                                                                                                  | mtx    |
| `Dataset_ID.scp.metadata.txt`              | SCP                                       | Metadata matrix for Single Cell Portal                                                                                                                                                     | TXT    |
| `Dataset_ID_annotated_v1.scp.metadata.txt` | SCP                                       | Annotated metadata matrix file for Single Cell Portal                                                                                                                                      | TXT    |

SCP = Single Cell Portal*

| Note about CSV files                                                                                                                                                                                                                                                        |
|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The CSV files contain differential expression data. These were generated from the `Dataset_ID.de.xlsx` to enable easier viewing with R or Python. Detailed steps for using these files are listed in the [Working with Release Files](working-with-release-files.md) guide. |

## Want to learn more?

Techniques for uploading loom and h5ad files into common analysis software are described in
the [Working with Release Files](working-with-release-files.md) guide. You can also get hands-on experience with these
methods by following the [Replicating the Release Analysis](replicating-the-release-analysis.md) tutorial. For
additional details about each individual dataset, visit the <link-to-browser relativelink="/releases/2020-mar">March
2020 Release</link-to-browser> page.
