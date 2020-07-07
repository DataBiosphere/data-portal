---
path: "/pipelines/hca-pipelines/data-processing-pipelines/pipeline-portability"
date: "2018-07-12"
title: "Data Processing Pipeline Portability"
description: "Overview of the data processing pipeline portability in the HCA DCP."
---

# Data Processing Pipeline Portability

## What is Portability?

When developing a pipeline, it can be easy to build in assumptions about the environment and infrastructure in which it will run; these assumptions make it difficult for others to use or modify the pipeline. One goal of the Human Cell Atlas (HCA) is to create data processing pipelines that can be run by many investigators, not just within the Data Coordination Platform (DCP); we refer to this goal as data processing pipeline portability.

## Introduction

The HCA aims to break down barriers in data use, offering immediate and open access to data. But we also want everyone to be able to use the data. To truly break the walls that silo many data repositories we have to go beyond data access and enable data interoperability between repositories. If pipelines are portable, data within and outside the HCA project can be processed using the same methodology and used together to make scientific observations. This data interoperability enhances the impact on scientific discovery.  Given the importance of portability, we have developed a service that does the following:

1. measures whether HCA workflows can run in a variety of environments outside of the DCP (local, grid-based, and cloud-based environments). 
2. enables others to extend the service so pipelines can be regularly tested for portability in additional execution environments beyond what we specify. 

We use this Portability Service as part of our testing during pipeline development to ensure that pipelines developed for the HCA can be executed successfully in many environments.

The HCA is a driver project of the [Global Alliance for Genomics and Health (GA4GH)](https://www.ga4gh.org/), and the Portability Service helps demonstrate GA4GH APIs for executing workflows in different infrastructures. In conjunction with the GA4GH and their other driver projects we are working to develop policies, standards, and tools for genomic and health-related data sharing. We welcome community involvement and feedback; contact [GA4GH](https://www.ga4gh.org/) or the [HCA DCP](mailto:data-help@humancellatlas.org) for more information.

## Uses of the Portability Service

The Portability Service enables you to:
1. Submit pipelines to the service to check if they can run in different environments. This step can be incorporated into your continuous integration plan.
2. Attach your environment to the Portability Service to receive submitted pipelines and confirm they run in your environment.

## Portability Service Execution Environments
* [dxWDL](https://github.com/dnanexus/dxWDL) on [DNAnexus](https://www.dnanexus.com/)
* [Cromwell](https://github.com/broadinstitute/cromwell) with a local, Linux backend
* More coming!
* For information on adding an execution environment, visit [this page](/pipelines/portability-service-environments).

## Submitting a Pipeline

HCA pipelines are automatically submitted to this service as a part of our development process. If you are interested in submitting a pipeline to the Portability Service, please contact us at data-help@humancellatlas.org.
