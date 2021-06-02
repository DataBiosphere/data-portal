---
path: "/pipelines/hca-pipelines/data-processing-pipelines/optimus-workflow"
date: "2018-05-03"
title: "Optimus"
description: "Overview of the HCA DCP Optimus analysis workflow."
---

# Introduction to the Optimus Workflow

The long-term goal of the Optimus workflow is to support any 3 prime single-cell or single- nucleus transcriptomics assay selected by the HCA project. Using the correct modularity, we hope to grow a generic pipeline that has specific modules to address differences in assays, while leveraging common code where steps of the assays are the same. We offer this as a community resource for community development and improvement. 

The workflow supports the [10x v2 and v3 gene expression assay](https://www.10xgenomics.com/solutions/single-cell/) and has been validated for analyzing single-cell and [single-nucleus](https://docs.google.com/document/d/1rv2M7vfpOzIOsMnMfNyKB4HV18lQ9dnOGHK2tPikiH0/edit) from both [human](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/optimus/benchmarking/v1_Apr2019/optimus_report.rst) and [mouse](https://docs.google.com/document/d/1_3oO0ZQSrwEoe6D3GgKdSmAQ9qkzH_7wrE7x6_deL10/edit) data sets. 

> View the open-source workflow code in the [WARP repository](https://github.com/broadinstitute/warp/tree/master/pipelines/skylab/optimus) on GitHub or read WARP's [Optimus Overview](https://broadinstitute.github.io/warp/documentation/Pipelines/Optimus_Pipeline/) for the latest pipeline details.

## Commonalities Among Sequencing Assays

The introduction of droplet-based technologies such as inDrop ([Klein, et al., 2015](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4441768/)) and Drop-seq ([Macosko, et al., 2015](https://www.sciencedirect.com/science/article/pii/S0092867415005498)) moved the throughput of a single-cell RNA sequencing experiment from hundreds to thousands of cells. Technology developed by [10x Genomics](https://www.10xgenomics.com) further increased throughput to hundreds of thousands of cells and has opened up the possibility of creating datasets for millions of cells. Common among many of the single-cell transcriptomics high-throughput technologies is the use of:

* microfluidics, which captures individual cells in oil droplets containing barcoded beads and enzymes
* short read 3’ single-strand DNA sequencing 
* a unique molecular identifier (UMI) as well as a cell barcode to tag each transcript as a unique molecule from a particular cell 

The bead-specific barcodes and UMIs are encoded on sequencing primers that also contain polyT tracts to enable binding of the primers to polyA+ mRNA transcripts. After lysing cells, mRNA transcripts bind to the polyT tracts in the primer and transcripts are reverse transcribed to generate barcoded cDNA. Note that all cDNA molecules from a single cell have the same barcode, but they have different UMIs. Thus every transcript that is captured from an individual cell can be mapped to its cognate cell and also counted as a single transcript, correcting for PCR bias. cDNAs are pooled for amplification and construction of libraries to facilitate 3’ DNA sequencing.

## Quick Start Table

| Pipeline Features | Description | Source |
|-------------------|---------------------------------------------------------------|-----------------------|
| Assay Type | 10x Single Cell/Nucleus Expression (v2 and v3) |[10x Genomics](https://www.10xgenomics.com)
| Overall Workflow  |Quality control module and transcriptome quantification module | Code available from [Github](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/optimus/Optimus.wdl) |
| Workflow Language | WDL | [openWDL](https://github.com/openwdl/wdl) |
| Genomic Reference Sequence| GRCh38 human genome primary sequence and M21 (GRCm38.p6) mouse genome primary sequence | GENCODE [Human](https://www.gencodegenes.org/human/release_27.html) and [Mouse](https://www.gencodegenes.org/mouse/release_M21.html) |
| Transcriptomic Reference Annotation | V27 GenCode human transcriptome and M21 mouse transcriptome | GENCODE [Human](ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_27/gencode.v27.annotation.gtf.gz) and [Mouse](ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_mouse/release_M21/gencode.vM21.annotation.gff3.gz) |
| Aligner           | STAR       | [Dobin, et al.,2013](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3530905/) |
| Transcript Quantification |Utilities for processing large-scale single cell datasets |[sctools](https://github.com/HumanCellAtlas/sctools) |                      
|Data Input File Format |File format in which sequencing data is provided |[FASTQ](https://academic.oup.com/nar/article/38/6/1767/3112533) |                       
| Data Output File Format | File formats in which Optimus output is provided | [BAM](http://samtools.github.io/hts-specs/), [Loom version 3](http://loompy.org/) |

## Optimus Summary

Here we describe the modules of Optimus; [the code](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/optimus/Optimus.wdl) and [library of tasks](https://github.com/broadinstitute/warp/tree/master/tasks/skylab) are available through GitHub.

The workflow runs in two modes: single-cell (`sc_rna`) or single-nucleus (`sn_rna`). When appropriate, differences between the modes are noted.

Overall, the workflow:
1. corrects cell barcodes and Unique Molecular Identifiers (UMIs)
2. aligns reads to the genome
3. generates an expression count matrix in a UMI-aware fashion
4. detects empty droplets (single-cell mode only)
5. calculates summary statistics
6. returns output in BAM and Loom file formats

Special care is taken to avoid the removal of reads that are not aligned or that do not contain recognizable barcodes. This design (which differs from many pipelines currently available) allows the use of the entire dataset by those who may want to use alternative filtering or leverage the data for methodological development associated with the data processing.

A general overview of the pipeline is shown below, followed by more detailed descriptions of the steps.

![Optimus Pipeline](./_images/optimus-pipeline-diagram.png)

## Input Data Preparation 

Each 10x v2 and v3 3’ sequencing experiment generates triplets of FASTQ files:

1. forward reads (R1), containing the unique molecular identifier and cell barcode sequences
2. reverse reads (R2), which is the alignable genomic information from the mRNA transcript 
3. an index FASTQ file that contains the sample barcodes, when provided by the sequencing facility

Because the pipeline processing steps require a BAM file format, the first step of Optimus is to [convert](https://github.com/broadinstitute/warp/blob/develop/tasks/skylab/FastqProcessing.wdl) the R2 FAST files, containing the alignable genomic information, to  BAM files. Next, the [FastqProcessing](https://github.com/broadinstitute/warp/blob/develop/tasks/skylab/FastqProcessing.wdl) step appends the UMI and Cell Barcode sequences from R1 to the corresponding R2 sequence as tags, in order to properly label the genomic information for alignment.

### Cell Barcode Correction

Although the function of the cell barcodes is to identify unique cells, barcode errors can arise during sequencing (such as the incorporation of the barcode into contaminating DNA or sequencing and PCR errors), making it difficult to distinguish unique cells from artifactual appearances of the barcode. Barcode errors are evaluated in the [FastqProcessing](https://github.com/broadinstitute/warp/blob/develop/tasks/skylab/FastqProcessing.wdl) step mentioned above, which compares the sequences against a whitelist of known barcode sequences.

The output BAM files contain the reads with correct barcodes, including barcodes that came within one edit distance ([Levenshtein distance](http://www.levenshtein.net/)) of matching the whitelist of barcode sequences and were corrected by this tool. Correct barcodes are assigned a “CB” tag. Uncorrected barcodes (with more than one error) are preserved and given a “CR” (Cell barcode Raw) tag. Cell barcode quality scores are also preserved in the file under the “CY” tag.


## Alignment

The [STAR alignment](https://github.com/broadinstitute/warp/blob/master/tasks/skylab/StarAlignBamSingleEnd.wdl) software ([Dobin, et al., 2013](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3530905/)) is used to map barcoded reads in the BAM files to the human genome primary assembly reference. STAR (Spliced Transcripts Alignment to a Reference) is widely used for RNA-seq alignment and identifies the best matching location(s) on the reference for each sequencing read.

## Gene Annotation

The [TagGeneExon](https://github.com/broadinstitute/warp/tree/master/tasks/skylab/TagGeneExon.wdl) task then annotates each read with the type of sequence to which it aligns. These annotations differ between single-cell and single-nuclei modes.

#### Single-cell mode

Annotations include INTERGENIC, INTRONIC, UTR and CODING (EXONIC), and are stored using the 'XF' BAM tag. In cases where the gene corresponds to an **exon or UTR**, the name of the gene that overlaps the alignment is associated with the read and stored using the GE BAM tag.

#### Single-nucleus mode
Annotations include INTERGENIC, INTRONIC, UTR and CODING (EXONIC), and are stored using the 'XF' BAM tag. In cases where the gene corresponds to an **exon, UTR, or intron**, the name of the gene that overlaps the alignment is associated with the read and stored using the GE BAM tag.

## UMI Correction

UMIs are designed to distinguish unique transcripts present in the cell at lysis from those arising from PCR amplification of these same transcripts. But, like cell barcodes, UMIs can also be incorrectly sequenced or amplified. Optimus uses the [UMI-tools software package](https://github.com/CGATOxford/UMI-tools), which applies a network-based method to account for such errors ([Smith, et al., 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5340976/)). Optimus uses the “directional” method.

## Metrics

A number of [quality control tools](https://github.com/HumanCellAtlas/sctools) are used to assess the quality of the data output each time this pipeline is run. For a list of the tools and information about each one please see our [QC Metrics](/pipelines/qc-metrics) page.

## Identification of Empty Droplets

For the single-cell mode, the pipeline runs the EmptyDrops function from the [dropletUtils](http://bioconductor.org/packages/release/bioc/html/DropletUtils.html) R package to identify cell barcodes that correspond to empty droplets. Empty droplets are those that did not encapsulate a cell but instead acquired cell-free RNA from the solution in which the cells resided -- such as secreted RNA or RNA released when some cells lysed in solution ([Lun, et al., 2018](https://www.ncbi.nlm.nih.gov/pubmed/?term=30902100)). This ambient RNA can serve as a substrate for reverse transcription, leading to a small number of background reads. Cell barcodes that are not believed to represent cells are identified in the metrics and raw information from dropletUtils is provided to the user.

## Count Matrix Construction

The pipeline outputs a count matrix that contains, for each cell barcode and for each gene, the number of molecules that were observed. The script that generates this matrix evaluates every read. It discards any read that maps to more than one gene, and counts any remaining reads provided the triplet of cell barcode, molecule barcode, and gene name is unique, indicating the read originates from a single transcript present at the time of lysis of the cell represented by that respective barcode.

## Pipeline Output Files

Outputs of the pipeline include:
1. Raw count matrix
2. Unfiltered, sorted BAM file (BamTags are used to tag reads that could be filtered downstream)
3. Cell metadata, including cell metrics
4. Gene metadata, including gene metrics

## Try Optimus in Terra

The Optimus pipeline is currently available on the cloud-based platform [Terra](https://app.terra.bio). If you have a Terra account, you can access the Featured Workspace using this address: https://app.terra.bio/#workspaces/featured-workspaces-hca/HCA_Optimus_Pipeline. The workspace is preloaded with instructions and sample data. 

Additionally, you can use the public [Intro-to-HCA-data-on-Terra workspace](https://app.terra.bio/#workspaces/featured-workspaces-hca/Intro-to-HCA-data-on-Terra) to analyze an example Optimus cell-by-gene count matrix (Loom file) with multiple downstream community tools, such as [Seurat](https://satijalab.org/seurat/index.html), [Scanpy](https://scanpy-tutorials.readthedocs.io/en/latest/index.html), [Cumulus](https://cumulus.readthedocs.io/en/latest/index.html), and [Pegasus](https://pegasus.readthedocs.io/en/stable/#). 

For more information on using the Terra platform, please view the [Support Center](https://support.terra.bio/hc/en-us).

## Versioning
All Optimus workflow versions are detailed in the [Optimus Changelog](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/optimus/Optimus.changelog.md) in GitHub. 

> This documentation applies to Optimus v4.1.7 and later. If you are working with data processed with a previous version, please check the [Optimus changelog](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/optimus/Optimus.changelog.md) for any data processing changes that may be applicable to your data. 


## Learn More About Optimus
For more detailed information about the Optimus pipeline, please see the [Optimus Overview](https://broadinstitute.github.io/warp/documentation/Pipelines/Optimus_Pipeline/) in the WARP repository documentation.



