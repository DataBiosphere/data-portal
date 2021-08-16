---
path: "/contribute/data/analysis-tools-registry"
date: "2019-02-01"
title: "Contributing to the Analysis Tools Registry"
description: "The Analysis Tools Registry lists portals, methods packages, and visualization packages suitable for working with HCA DCP data."
---

# Contributing to the Analysis Tools Registry

The [Analysis Tools Registry](/analyze) lists portals, methods packages, and visualization packages.  Computational biologists submit packages for use by software engineers in portal development. [Analysis Tools Registry standards](/contribute/analysis-tools-registry/registry-standards) promote software best practices and help facilitate ease of package deployment by non-biologists (e.g. software engineers) and non-computational biologists.

## Submission Forms
Submissions are contributed via GitHub - use these links to access the submission forms:

[Portal submission](https://github.com/HumanCellAtlas/data-portal/issues/new/?template=submit-portal.md)\
[Methods package submission](https://github.com/HumanCellAtlas/data-portal/issues/new/?template=submit-method-package.md)\
[Visualization package submission](https://github.com/HumanCellAtlas/data-portal/issues/new/?template=submit-visualization-component-package.md)

>The approximate time frame from submission to publication of a new portal is 2-4 weeks.

Below, we provide details about the information requested in the methods and visualizations submission forms.

## Package Submission Field Details

The package details pages provide software engineers with information (basic command line usage, code repository location, etc.) and resources (Docker image URL, contact name and email etc.) to support rapid incorporation of these packages into web portals.

### Required Submission Fields for Methods and Visualizations
- Package title
    - Name of method or visualization
    - Each Methods Registry entry is associated with one container image. Methods Registry recommends authors provide one canonical package. However, some authors may wish to submit registry entries for different language implementations or minimal vs extended docker images; the package title should reflect the difference between such entries.
    - Example Package title: STREAM: Single-cell Trajectories Reconstruction, Exploration And Mapping of single-cell data
- Contact name
    - Individual acting as point of contact for questions about the package or for help requests
    - Example Contact name: Huidong Chen, Luca Pinello
- Contact email
    - Email address to use for point of contact
    - Example Contact email: huidong.chen@mgh.harvard.edu, lpinello@mgh.harvard.edu
- Who to attribute
    - Key individual(s) who contributed to the development of the package
    - Example Who to attribute: H Chen, L Albergante, JY Hsu, CA Lareau, GL Bosco, J Guan, S Zhou, AN Gorban, DE Bauer, MJ Aryee, DM Langenau, A Zinovyev, JD Buenrostro, GC Yuan, L Pinello
- Code repository URL (e.g. https://github.com/yourusername/yourpackagename)
    - Source code for packages listed in the Methods Registry must be freely licensed
    - Source code must be under source control in a public repository (we recommend [GitHub](https://guides.github.com/activities/hello-world/))
    - Affirm in submission that license is available in the code repository.
    - Example Code repository URL: https\://github.com/pinellolab/STREAM/
- Upstream registry URL
    - Packages must be submitted to or published in at least one upstream registry used by their respective implementation language; e.g. Bioconda for Python, Bioconductor for R, or npm for JavaScript.
    - For packages in review for publication in an upstream registry, please provide a placeholder of the form "Submitted to `<registry>` on `<date>`". Submissions with upstream registry URL placeholders will be reviewed quarterly.
    - Example Upstream registry URL: https\://bioconda.github.io/recipes/stream/README.html
- 2-3 sentence description of package
    - Content may be truncated, e.g. to 150 characters, on summary listing page; the full description will appear in details page.
    - Example 2-3 sentence description: STREAM is an interactive computational pipeline for reconstructing complex cellular developmental trajectories from sc-qPCR, scRNA-seq or scATAC-seq data.

### Optional Fields for Methods and Visualizations
- Build badge URL
    - Packages should execute automated tests upon every push to their default branch (e.g. master) on GitHub using a continuous integration service.  Such services include [Travis CI](https://docs.travis-ci.com/user/tutorial/) or [Circle CI](https://circleci.com/docs/2.0/first-steps/), which report whether the package build passes its own tests.
    - Example Build badge URL: https\://travis-ci.org/pinellolab/STREAM.svg
- Coverage badge URL
    - Packages should measure the code coverage of their automated tests using services like [Coveralls](https://docs.coveralls.io/) or [Codecov](https://docs.codecov.io/docs), which report the percentage of lines of code, conditional branches, and other metrics covered by tests.
    - Example Coverage badge URL: https\://coveralls.io/github/ebi-gene-expression-group/anatomogram?branch=master
- Logo: (Attach to the GitHub issue / submission form.)
    - We will store the logo local to Analysis Tools Registry to ensure availability
    - Attach image file or provide URL to image file
    - Example Logo (URL): https\://github.com/pinellolab/STREAM/blob/stream\_python2/STREAM/static/stream\_logo.png
- Screenshot: (Attach to the GitHub issue / submission form.)
    - We will store the screenshot local to Analysis Tools Registry to ensure availability
    - Attach screenshot file or URL to screenshot
    - Example Screenshot (URL): https\://github.com/pinellolab/STREAM/blob/stream_python2/STREAM/static/images/Figure1.png
- Implementation of this package in active portals: URL(s)
    - URL(s) of web portals that incorporate the method
    - Specific URLs directly showcasing the method in use would be ideal but not required.
    - Example URL: http\://stream.pinellolab.org

### Method-Specific Required Fields
- Method-ready Docker image:
    - Containerized images allow consistent deployment of packages by bundling OS requirements, necessary dependencies and configurations so portal developers can rapidly incorporate a package while bypassing the need to build unfamiliar software.
    - Images should be tagged with method version so the docker pull command requests a versioned image compatible with the example command line(s) and validation commands provided below.
    - Recommended container registries: [quay.io](https://docs.quay.io/solution/getting-started.html), [Docker Hub](https://docs.docker.com/docker-hub/)
    - Container [best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) and [gotchas](https://runnable.com/blog/9-common-dockerfile-mistakes)
    - Example Method-ready Docker image: `docker pull pinellolab/stream:0.3.2`

- Language
    - Methods Registry recommends authors provide one canonical package but recognize that some packages are implemented in multiple languages. Language implementations should be submitted separately so docker images are kept small to minimize deployment costs.
    - Example Language: Python
- Test data location: (reference test data set, reference output(s))
    - Packages must provide a small test data set that successfully runs (aka. toy data) in a reasonably short amount of time, so that developers can verify that their local deployments work as expected.
    - Test data should be hosted and maintained by the methodologist, unless the data is already publicly accessible.
    - Verification of a deployed instance requires a copy of known good output (aka. reference output) to evaluate the accuracy of the deployed instance. This data is generated by the method developer running their methodology using the test data, confirming the run was successful, and providing it to the registry with the input data.
    - Location options include “URL”, “R data package”, "in docker image" etc. We encourage methodologists to store large test data sets outside of their container image to keep images small and efficient.
    - Example Test data location: https\://www.dropbox.com/sh/n8qq4m7w17i6b07/AAAro_qY_-q5VBDC1sZg-LE5a and validation data in docker image
- Command line usage - description & example
    - Each use of the submitted package should be invocable as a single command line call. Some packages may require a small wrapper script to provide this functionality; key parameters should be exposed in a provided wrapper script to provide all typical usage functionality (exposed on the command line with -h or --help).
    - For each use case of the method, please provide a short description and example with complete usage syntax.
    - Basic command line usage examples:

        Trajectory inference (transcriptomic data) with marker gene exploration\
        Perform trajectory inference analysis on single cell transcriptomic data then detect DE (differentially expressed) genes, transition genes, and leaf genes\
        docker run -v ${PWD}:/data -w /data pinellolab/stream -m data\_Nestorowa.tsv.gz -l cell\_label.tsv.gz -c cell\_label\_color.tsv.gz --DE --TG --LG

        Feature mapping\
        Reuse a previously inferred principal graph as reference to map new cells

        docker run -v ${PWD}:/data -w /data pinellolab/stream -m data\_Olsson.tsv.gz -l cell\_label.tsv.gz -c cell\_label\_color.tsv.gz --lle_components 4 --EPG_shift

        docker run -v ${PWD}:/data -w /data pinellolab/stream --new data\_perturbation.tsv.gz --new\_l cell\_perturbation\_label.tsv.gz --new\_c cell\_perturbation\_label\_color.tsv.gz

        Trajectory inference (scATAC-seq data) using precomputed z-score file\
        Reconstructs trajectories and pseudotime from epigenomic data\
        docker run -v ${PWD}:/data -w /data pinellolab/stream --atac -m zscore.tsv.gz --atac\_samples sample\_file.tsv.gz --atac\_regions region_file.bed.gz -l cell\_label.tsv.gz -c cell\_label\_color.tsv.gz --lle\_components 4

- Command(s) to validate installation
    - Please provide a call of the methodology using the test data to verify that the program ran to completion and the output is valid.
    - Command line calls should programmatically return zero if validation is successful and non-zero for validation failure.
    - Validation may be a single command line (eg. --test parameter provided via CLI) or a series of commands that
        - runs the method on the reference test data set 
        - compares the locally generated result with the reference output(s)
        - indicates whether the locally generated result is valid
        - indicates success/failure of validation programmatically (to facilitated automated deployment/testing)
    - Example Command to validate installation: docker run --entrypoint stream\_run\_test pinellolab/stream

### Visualization Component-Specific Optional Fields:
- URL to implementation of this package in an active portal:
    - Please provide a URL to a simple page with a visualization demo.
    - In our examples we use “Mashups”, see example here https://github.com/eweitz/igv.js-react/blob/master/README.md#igvjs-in-react

## Packages Submitted in Collaboration with a Methodologist
with separate maintenance of supporting scripts should provide parallel information for "methodologist" and "accessibility maintainer" for the following fields:
- Contact name
- Contact email
- Who to attribute
- Code repository URL
- Affirm code is free and open source with license available in code repository
- Upstream registry URL
- Build badge URL
- Coverage badge URL

For such collaborative submissions the long description may be used to describe the relationship between the supporting scripts and the listed package.

## How to Update Your Package Entry
Package information may be updated by creating a GitHub pull request:
- From the package details page, click "Improve this page"
- Edit the page content to reflect your updates
- Start a pull request by clicking "Commit changes". Your edits will be committed to a new branch in github and queued for the Methods Registry Maintainer to push to production.
