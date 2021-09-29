---
date: "2018-05-03"
description: "Overview of Smart-seq2 scRNA sequencing in the HCA DCP."
path: "/pipelines/hca-pipelines/data-processing-pipelines/smart-seq2-workflow"
title: "Smart-seq2"
---

# Description of Smart-seq2 scRNA Sequencing

## Background

Currently the most technically and economically feasible methodology for single-cell RNA sequencing involves generating (by reverse transcription), amplifying, and then sequencing cDNA copies of the RNA transcripts. One main challenge of this strategy is to overcome the problem of 3’-end bias that limits synthesis of full-length cDNAs. The Smart-seq2 technology has been an important advancement in addressing this challenge, greatly improving recovery of full-length transcripts (Picelli et al., [2013](https://www.nature.com/articles/nmeth.2639), [2014](https://www.nature.com/articles/nprot.2014.006)).

## What is SMART?

The SMART acronym, which stands for Switching Mechanism At the end of the 5’-end of the RNA Transcript, describes a key property of the reverse transcriptase enzyme from Maloney Murine Leukemia Virus (MMLV). During reverse transcription this enzyme adds a few nucleotides, generally 2-5 cytosines, when it reaches the 5’ end of the RNA template. These extra nucleotides on the newly-synthesized cDNA act as a docking site for a complementary oligonucleotide (termed a TSO or Template Switching Oligonucleotide) that carries 3 riboguanosines at its 3’ end. The reverse transcriptase is then able to switch templates and synthesize the complementary cDNA strand using the TSO as a primer. Overall, optimization of this technique has improved both the yield and the length of transcripts from single-cell cDNA libraries. These features, coupled with reasonable cost, have made Smart-seq2 a widely used method for single-cell RNA sequencing.

## Overview of the Pipeline

The Smart-seq2 pipeline processes data generated from plate- or fluidigm-based Smart-seq2 scRNA sequencing protocols. The pipeline is comprised of two modules: a quality control module, which generates post-alignment quality control metrics, and a transcriptome quantification module, which aligns reads to the transcriptome and estimates transcript expression levels. 

> View the open source workflow code in the [WARP repository](https://github.com/broadinstitute/warp/tree/master/pipelines/skylab/smartseq2_multisample) on GitHub or read WARP's [Smart-seq2 Overview](https://broadinstitute.github.io/warp/docs/Pipelines/Smart-seq2_Multi_Sample_Pipeline/README) for the latest pipeline details.

## Quick Start Table

| Pipeline Features | Description | Source |
| --- | --- | --- |
| Assay Type | Paired- or single-end, plate- or fluidigm-based Smart-seq2 | Validation reports for human and [mouse](https://docs.google.com/document/d/12zGTFROrcXEByt9z0h06qjSqb9vWutn28Tx6YiND1Ds/edit) [single-end](https://docs.google.com/document/d/1MonsTG8UnROHZ_XpulrSZNTxO988KEH6T6h45plFYQg/edit#heading=h.ixoqmhbabdvh) and [fluidigm](https://docs.google.com/document/d/1FEg86Tlu657j9Kjw_v3keFQRXcBIs8gOqCwLbPSP-C0/edit#heading=h.sun21prlcwz3) datasets |
| Overall workflow | Quality control module and transcriptome quantification module | [Code available from GitHub](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/smartseq2_single_sample/SmartSeq2SingleSample.wdl) |
| Workflow language | WDL | [openWDL](https://github.com/openwdl/wdl) |
| Genomic reference sequence | GRCh38 human genome primary sequence | [GENCODE](https://www.gencodegenes.org/human/release_27.html) |
| Gene Model | GENCODE v27 PRI GTF and FASTA files | [GENCODE](https://www.gencodegenes.org/human/release_27.html) |
| Aligner | HISAT2 | [Kim, et al.,2015](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4655817/); [HISAT2 tool](https://ccb.jhu.edu/software/hisat2/manual.shtml) |
| QC | Metrics determined using Picard command line tools | [Picard Tools](https://broadinstitute.github.io/picard/) |
| Estimation of gene expression | RSEM ([rsem-calculate-expression](http://deweylab.biostat.wisc.edu/rsem/rsem-calculate-expression.html)) is used to estimate the gene expression profile. The input of RSEM is a BAM file aligned by HISAT2. | [Li and Dewey, 2011](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-12-323) |
| Data Input File Format | File format in which sequencing data is provided | [FASTQ](https://academic.oup.com/nar/article/38/6/1767/3112533) |
| Data Output File Format | File formats in which Smart-seq2 pipeline output is provided | [BAM](http://samtools.github.io/hts-specs/), [Loom version 3](http://loompy.org/) |

## Pipeline Details

Choice of appropriate reference sequences and annotations are critical for optimizing the interpretation of reads as transcriptomic features. Currently this pipeline uses the genomic reference sequence GRCh38 and the transcriptomic reference GenCode Comprehensive Gene Annotation v27. Alignment is performed using HISAT2, a fast-paced, cost-efficient tool; gene expression is quantified using the RSEM algorithm. The overall schematic is shown below.

![Smart seq2](_images/smart-seq2-diagram.png)

### Quality Control Module

To assess the quality of the input data, this module uses a pre-constructed index of species reference information: GRCh38, GENCODE Annotation v27, and dbSNP150 ([see code for more details](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/smartseq2_single_sample/SmartSeq2SingleSample.wdl)). HISAT2 is used to perform a graph-based alignment of sample data to the reference genome to determine the presence of non-transcript sequences and true transcript sequences, taking into account the presence of single-nucleotide polymorphisms (based on dbSNP150). The output is a BAM file. Quality control measurements are then calculated using [Picard tools](http://broadinstitute.github.io/picard/), command line tools used for working with high-throughput sequencing data. This pipeline uses a number of these tools, but the main modules are listed below. Follow the link for a detailed explanation of each tool; a more detailed table of our QC metrics is in the [QC Metrics](/pipelines/qc-metrics) guide.

* [CollectAlignmentSummaryMetrics](http://broadinstitute.github.io/picard/command-line-overview.html#CollectAlignmentSummaryMetrics) - The quality of the read alignments and the proportion of reads that passed signal-to-noise threshold filters.
* [CollectRnaSeqMetrics](http://broadinstitute.github.io/picard/command-line-overview.html#CollectRnaSeqMetrics) - Distribution of bases within the transcripts, as well as the median depth, ratio of 5 prime/3 prime biases, and the numbers of reads with correct or incorrect strand designation.
* [MarkDuplicates](http://broadinstitute.github.io/picard/command-line-overview.html#MarkDuplicatesWithMateCigar) - Duplicate reads that originate from the same fragment of DNA are identified and tagged.
* [InsertSizeMetrics](https://broadinstitute.github.io/picard/picard-metric-definitions.html#InsertSizeMetrics) - Metrics about the insert size distribution of a paired-end library.

### Transcriptome Quantification Module

This second module uses RSEM (RNA-Seq by Expectation Maximization) to quantify the transcript abundance. RSEM uses a statistical model that accounts for the uncertainties of read mapping, as RNA-Seq reads do not always map uniquely to a single gene. Using a pre-constructed transcriptome index created from GRCh38 and GENCODE Annotation v27, HISAT2 aligns the test data with the reference transcriptome and a BAM file of aligned data is generated. The RSEM program rsem-calculate-expression is then used to estimate gene/isoform expression levels, resulting in an output file including expected_counts, TPM (Transcripts Per Million), or FPKM (Fragments Per Kilobase of transcript per Million mapped reads).

## Try the Smart-seq2 Pipeline in Terra

The Smart-seq2 pipeline is currently available on the cloud-based platform [Terra](https://app.terra.bio). If you have a Terra account, you can access the Featured Workspace using this address: https://app.terra.bio/#workspaces/featured-workspaces-hca/HCA_Optimus_Pipeline. The workspace is preloaded with instructions and sample data. For more information on using the Terra platform, please view the [Support Center](https://support.terra.bio/hc/en-uso).

## Versioning

All Smart-seq2 Multi Sample workflow versions are detailed in the [Smart-seq2 Multi Sample Changelog](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/smartseq2_multisample/MultiSampleSmartSeq2.changelog.md) in GitHub. 

> This documentation applies to Smart-seq2 Multi Sample v2.1.4 and later. If you are working with data processed with a previous version, please check the [Smart-seq2 Multi Sample Changelog](https://github.com/broadinstitute/warp/blob/master/pipelines/skylab/smartseq2_multisample/MultiSampleSmartSeq2.changelog.md) for any data processing changes that may be applicable to your data.

## Learn More About the Smart-seq2 Pipeline

More detailed information about this pipeline can be found in the [Smart-seq2 Overview](https://broadinstitute.github.io/warp/docs/Pipelines/Smart-seq2_Single_Sample_Pipeline/README) in the WARP repository documentation.
