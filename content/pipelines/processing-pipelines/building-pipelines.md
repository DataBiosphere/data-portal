---
path: "/pipelines/pipeline-development/processing-pipelines/building-pipelines"
date: "2018-05-03"
title: "Pipeline Development Guide"
subTitle: "Resources and best practices, including using our portability service to test your pipeline and execution environment"
---

# Quick Start Guide for Building Analysis Pipelines

The building blocks of a robust analytical pipeline include:
* a workflow language
* tools designed to manipulate the data type particular to the pipeline
* a containerization environment that enables the components of the pipeline to be executed easily
* a benchmarking or testing protocol that can evaluate the accuracy and flexibility of the pipeline
* test data that can be used in the benchmarking and testing protocols

Here we highlight resources we have successfully used for pipeline building. There are many more resources in the community and this list is not meant to be exhaustive; we simply offer it as a starting guide based on our experience.

Our pipelines for analysis of data from Smart-seq2 and 10x v2 scRNA-seq assays are in the Github [Skylab repository](https://github.com/HumanCellAtlas/skylab/tree/master/pipelines). They are also found in [Dockstore](https://dockstore.org/), an open platform that stores docker-based pipelines written in [WDL](https://dockstore.org/workflows/github.com/HumanCellAtlas/skylab/HCA_SmartSeq2:dockstore?tab=info) or [CWL](https://www.commonwl.org/). 

## Workflow Language Resources

Workflow Description Language, or [WDL](https://software.broadinstitute.org/wdl/), was designed by the Broad Institute as a human-readable and writable language for describing workflows and tasks. We use this language in our production sequencing pipelines. The WDL language has recently evoloved into a community-governed project called [OpenWDL](http://www.openwdl.org/) to allow the broader scientific community to guide development and adoption. 

One can also use Common Workflow Language, or [CWL](https://www.commonwl.org/), to develop analysis workflows and tools for data-intensive fields like genomics. See the [CWL User Guide](https://www.commonwl.org/user_guide/) for more information. CWL is also a successful community-based workflow language focused on human-readable pipeline descriptions.

## Utilities for Manipulating Data Types

[SCTools](https://github.com/HumanCellAtlas/sctools) is a package of utilities for manipulating sequence data for analysis of large biological datasets.

[Picard Tools](https://broadinstitute.github.io/picard/) is a collection of command line tools that enable manipulation of large-scale sequencing data and data file formats like [SAM](http://samtools.github.io/hts-specs/SAMv1.pdf)/BAM/CRAM and [VCF](http://samtools.github.io/hts-specs/VCFv4.3.pdf).

[Samtools](https://sourceforge.net/projects/samtools/) are tools for manipulating next-generation sequencing data in the SAM format.

[HISAT2](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4655817/) (Hierarchical Indexing for Spliced Alignment of Transcripts) is a tool that aligns RNA sequence reads to a reference sequence to calculate read support for transcripts in the data.

[RSEM](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3163565/) (RNA-Seq by Expectation Maximization) is a tool that quantifies the abundances of transcripts identified in an RNA sequencing experiment. RSEM was designed to address the multi-mapping problem in alignment and will calculate expression measurements like TPM (Transcripts Per Million). RSEM can also perform alignment if needed.

## Testing and Benchmarking

[Unity Benchmarking Service](https://unity.broadinstitute.org/), currently under construction and described [here](https://docs.google.com/document/d/1_gxct8eVb2dXjQe3YXAFh_0R5dtYMvpc9lfhRh0JgU4/edit), is designed to facilitate community development and contribution of pipelines and pipeline improvements.

[Portability Service](/pipelines/pipeline-portability) allows you to determine whether your pipeline works in the HCA, or in select non-HCA environments. Conversely, it also enables you to attach your execution environment to the portability system to check whether HCA pipelines work in that environment as part of our pipeline testing process.

## Containerization Resources

Containers are used to store the computational environment (all software dependencies) needed to run a program or set of programs; containers are described in more detail [here](https://software.broadinstitute.org/firecloud/documentation/article?id=11252).

[Docker](https://www.docker.com/) is the most widely used brand of container.


## Getting Involved in Pipeline Development

We welcome your feedback about our current pipelines and your ideas for development of new pipelines. Send your thoughts by contacting us directly at data-help@humancellatlas.org.

You are also welcome to attend meetings and participate in Slack discussions about data processing pipelines. Here are some details:

1. Analysis Community Biweekly meetings are held every other Tuesday at 11AM, Eastern Time; view the [Agenda](https://docs.google.com/document/d/1860cE2zk2baXYefu5-WzQM_p_uTGjph6dWnehiRaFDw/edit#heading=h.rt36ocexz2z5)
2. Join the HCA Slack channels: go to [Join Slack](https://join-hca-slack.data.humancellatlas.org/) to obtain an invitation, and join the #secondary analysis channel.
3. Attend DCP demos; contact us for the dates and times, and use [this link](https://meet.google.com/eoo-rdxp-kim) to join each meeting
