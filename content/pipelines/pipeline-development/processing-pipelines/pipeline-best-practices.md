---
path: "/pipelines/pipeline-development/processing-pipelines/pipeline-best-practices"
date: "2018-05-03"
title: "Best Practices for Building Data Processing Pipelines"
description: "Overview of best practices for building data processing pipelines in the HCA DCP."
---

# Best Practices for Building Data Processing Pipelines

## Goals
The following broad goals motivate our best practices. Here we describe them and give insight as to why these goals are important. We then explore best practices and examples to give you a sense of how to apply these goals.

- The best pipelines should be automated.
- The best pipelines should be easily testable.
- The best pipelines should be portable.
- The best pipelines should scale to their data.
- The best pipelines should be easy to maintain.
  
## Automation
### What is Automation?
  Automation refers to the ability of a pipeline to run, end-to-end, without human intervention.
  
### Why do we care about automation?
Pipelines cannot scale to large amounts of data, or many runs, if manual steps must be performed within the pipeline. They also cannot be part of an automated system if they in fact are not automated. Manual steps will bottleneck your entire system and can require unmanageable operations. Moreover, manual steps performed by humans will vary, and will promote the production of data that can not be appropriately harmonized.

- *Do*: Reduce parameterization to minimal inputs that do not vary for each input data.
- *Do*: Remove the need for parameters, replacing them with data-driven settings.
- *Do*: Offer defaults that are generally applicable for inputs that cannot be defined in a data-driven manner.
- *Do*: Offer the ability to check the status of pipeline runs.
- *Don’t*: Assume any file produced at any step of the pipeline is ok. Always check the status of underlying tools (Eg. check return codes).
- *Don’t*: Keep output files produced by steps of the pipeline that errored; people will accidently use them if they exist. (Do keep logs for debugging.)
- *Don’t*: Delete outputs from steps that passed when the full pipeline fails, keeping them enables you to pick up where you left off.
- *Don’t*: Use tools that are “buggy” or fragile, find alternatives or improve the tools.
  
## Testability
### What is a testable pipeline?
A testable pipeline is one in which isolated sections or the full pipeline can checked for specified characteristics without modifying the pipeline’s code. Testability requires the existence of appropriate data with which to run the test and a testing checklist that reflects a clear understanding of how the data will be used to evaluate the pipeline.
  
### Why do we care about testabilty?
The availability of test data enables validation that the pipeline can produce the desired outcome. Formulation of a testing checklist allows the developer to clearly define the capabilities of the pipeline and the parameters of its use.

We have developed a benchmarking platform, called [Unity](https://unity.broadinstitute.org/), to facilitate efforts to develop and test pipelines and pipeline modules.

- *Do*: Provide toy test data with your pipeline/tool.
- *Do*: Provide the results of an execution of your pipeline/tool on the test data.
- *Do*: Refer to at least one real data set appropriate for your tool/pipeline with example output from an execution of your pipeline or tool.
- *Do*: Provide a checker tool.
- *Do*: Include an automated testing suite for pipeline tasks.
- *Do*: Include automated tests for the pipeline as an integrated unit (pipeline benchmarking).
- *Don’t*: Use tools that do not have automated testing suites.
- *Don’t*: Write tests that assume a specific instance of data.

## Portability

### What is pipeline portability?
Pipeline portability refers to the ability of a pipeline to execute successfully on multiple technical architectures.

### Why do we care about portability?
_Science._ Science is not science if results are not reproducible; the scientific method cannot occur without a repeatable experiment that can be modified. Data processing pipelines are an essential part of some scientific inquiry and where they are leveraged they should be repeatable to validate and extend scientific discovery.

_Impact._ Pipelines will have greatest impact when they can be leveraged in multiple environments. The more technical requirements for installing and running of a pipeline, the longer it will take for a researcher to have a usable running pipeline.
  
_Maintainability._ Over the long term, it is easier to maintain pipelines that can be run in multiple environments. Portability avoids being tied to specific infrastructure and enables ease of deployment to development environments.

Within the scope of the HCA, to ensure that others will be able to use your pipeline, avoid building in assumptions about environments and infrastructures in which it will run. We provide a portability service to test whether your pipeline can run in a variety of execution environments, including those used by the HCA and others. Portability is discussed in more detail in the *Guides* section; [contact us](mailto:data-help@humancellatlas.org) to use the service.

### Configurability for running on different technical infrastructures.
Code should not change to enable a pipeline to run on a different technical architecture; this change in execution environment should be configurable outside of the pipeline code.

- *DO*: Use a workflow language that allows a separation between the code that executes the data processing logic and the logic to run the pipeline on an infrastructure. [WDL](https://software.broadinstitute.org/wdl/documentation) and [CWL](https://www.commonwl.org/user_guide/rec-practices) languages have this feature.
- *Don’t*: Put logic to run the pipeline in the same code that executes the logic to process the data.

### Separation between the environment, the execution of the pipeline, and the pipeline itself.
- *Do*: Use a containerization technology, such as [Docker](https://www.docker.com/), to execute software.
- *Do*: Incorporate into your testing the execution of the pipeline in multiple execution environments; see, for example: [HCA DCP portability service](/pipelines/pipeline-portability).
- *Don’t*: Put environmental paths in software tools or the workflow language. When they must exist they belong in the configuration or (if they refer to the execution environment) in the container’s build instructions (Eg. Dockerfile).

## Scaling Characteristics

### What do we mean by scaling characteristics?
Scaling characteristics describe the performance of the pipeline given a certain amount of data. This is often described with Big O notation when describing algorithms. This answers the question: As the size of the data for the pipeline increases, how many additional computes are needed to process that data? One would want to avoid algorithms or tools that scale poorly, or improve this relationship to be linear (or better).

### Why care about scalability?
If you have poor scaling characteristics, it may take an exponential amount of time to process more data. This will eventually require unreasonable amounts of time (and money if running in the cloud) and generally reduce the applicability of the pipeline.

- *Do*: Measure the relationship between the size of your input (or something equivalent) and resources needed to successfully complete the pipeline.
- *Don’t*: Incorporate tools that have poor scaling characteristics unless they offer significant improvement to the pipeline.

## Maintainability

### What is a maintainable pipeline?
A pipeline that can be easily operated and updated is maintainable.

### Why do we care about maintainability?
The majority of the life of code involves maintenance and updates. Design and initial implementation require vastly shorter amounts of time compared to the typical time period over which the code is operated and updated. This is generally true in many areas of software engineering. Thus it is important to engineer software so that the maintenance phase is manageable and does not burden new software development or operations.

### Readability
Software is a living document that should be easily read and understood, regardless of who is the reader or author of the code.
- *Do*: Work in a space where the code is easy to access and navigate (Eg. [GitHub](https://github.com/))
- *Do*: Use common software package structure and idioms to aid the navigation of the software.
- *Do*: Use automated documentation for all technical documents as much as possible.
- *Don’t*: Write a large amount of documentation that does not live beside or within the code itself (it will become out of date).

### Modularity
Modularity enables small units of code to be independently benchmarked, validated, and exchanged. Modularity is very useful because, as science or technology changes, sections of a tool can be updated, benchmarked, and exchanged as small units, enabling more rapid updates and better adaptation to innovation. See [this doc](https://docs.google.com/document/d/1DlKdI6znEzdcuBBUnaJnS20GUb20zw4MgSgF12jfADU/edit?ts=5b6dffd9) for more about modularity and its implementation in the Optimus 10X v2 pipeline, currently in development.

- *Do*: Save progress by creating intermediate output between modules as they successfully complete.
- *Don’t*: Make monolithic tasks that perform many functionalities for the sake of speed.
- *Don’t*: Break every functionality of a pipeline into a separate module. (This contrasts with not making monolithic tasks; there is an optimum between monolithic tasks and highly resolved modularity that is the goal. One can use benchmarking, the tendency for functionality to be updated, and how dependent functionalities are to get a sense of what should be separate and what can be combined.)

### Leveraging Standards
We recommend using standard file formats and interfaces. In computational biology, [GA4GH](https://www.ga4gh.org/ga4ghtoolkit/genomicdatatoolkit/) is a great source of these standards. In cases where new formats are needed, we recommend working with a standards group like [GA4GH](https://www.ga4gh.org/) if possible.

- *Do*: When using containerization technologies, follow best practices to assure associated images do not update without explicit updates.
- *Do*: Make both the images and the build files (Dockerfile) available to document the environment. [More on Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).


## Licensing

### What is licensing?
According to Wikipedia "A software license is a legal instrument (usually by way of contract law, with or without printed material) governing the use or redistribution of software.” (see [this Wikipedia article](https://en.wikipedia.org/wiki/Software_license) for details).

### Why do we care about licensing?
Note: this section is opinion and is NOT legal advice. 

Licenses sometimes legally bind you as to how you use tools, and sometimes the terms of the license transfer to the software and data that is produced. This can restrict the potential for leveraging the pipeline and may require additional work.

- *Do*: Select tools that are openly licensed to run in your pipelines to avoid the possibility that legal requirements will  restrict execution where technical requirements do not.
- *Don’t*: Create software tools or libraries without licenses, clear guidance on your intent for use is important.

