---
path: "/contribute/data/analysis-tools-registry/registry-standards"
date: "2019-02-01"
title: "Registry Standards"
description: "HCA DCP Analysis Tools Registry standards ensure reusability and ease deployment of methods and visualizations for analyses of Human Cell Atlas datasets for portals and others."
---

# Analysis Tools Registry Standards Overview

The following standards of the HCA DCP Analysis Tools Registry ensure reusability and ease deployment of methods and visualizations for analyses of Human Cell Atlas datasets for portals and others.  The primary audience for this document is developers of packages for methods and visualizations.

Standards listed below are required or optional.  Packages must conform to all required standards to be listed in the Analysis Tools Registry.  Packages should conform to all recommended standards to enhance their registry entry.

## Required Standards
The required standards must be met for packages to be listed in the Registry.

### Be Free and Open Source
Source code for portals and packages listed in the Analysis Tools Registry must be freely licensed and under source control in a public repository on GitHub.  The license must be contained in the code repository.

### Use Containers and Modules
Method packages must be containerized in Docker and listed in a container registry, e.g. Docker Hub.  Visualization packages must be modular and importable using both ES6 export syntax and traditional script tags.

### Register Upstream
Packages must be published in at least one upstream registry used by their respective implementation language; e.g. Bioconda for Python, Bioconductor  for R, or npm for JavaScript. Participation in an upstream registry ensures that the package conforms to standards common to the implementation language.

### Support Standard Data Formats
Packages must support standard data exchange format(s) for input and output, as defined by the relevant analysis community. When applicable, file formats used as standards by the HCA project should be used for input/output by Methods Registry tools.

### Document Installation and Usage
Packages must have at least brief documentation on how developers can install and use them.  Any package with a command-line interface (CLI) must implement support for “--help” or “-h” arguments that show at least a basic program summary, parameter descriptions, and an example usage call. Documentation should describe major use cases of the method and provide example commands for each use case.

### Provide Testing Data
Packages must provide a small data set that successfully runs (aka. toy data) in a reasonably short amount of time, so that developers can verify their local deployments work as expected. Packages should provide a way to validate new instantiations of the method. Validation uses methodologist-provided reference output file(s) for comparison with the results from a new docker instance running the method on methodologist-provided test data. Package documentation may also provide links to synthetic or real data for testing in realistic scenarios.  Methods and visualization vignettes should (but are not required to) use Human Cell Atlas data.

## Recommended Standards
The recommended standards in this section are encouraged, but not required, by the Registry.

### Use Continuous Integration
Packages should execute automated tests upon every push to their default branch (e.g. master) on GitHub using a continuous integration service.  Such services include Travis CI or Circle CI, which report whether the package build passes its own tests.

### Measure Code Coverage
Packages should measure the code coverage of their automated tests using services like Coveralls or Codecov, which report the percentage of lines of code, conditional branches, and other metrics covered by tests.

### Use Conventional Parameter Names
Methods packages should use parameter names that match other methods packages in the same domain wherever possible.  Consistency across package API’s will enhance interoperability.
