---
appUrl: "http://bioconductor.org/packages/slingshot"
author: "Kelly Street, Davide Risso, Diya Das, Sandrine Dudoit, Koen Van den Berge, and Robrecht Cannoodt"
componentName: "analysisDetail"
date: "2018-09-10"
description: "Slingshot provides functions for inferring continuous, branching lineage structures in low-dimensional data."
githubUrl: "https://github.com/kstreet13/slingshot"
path: "/analyze/methods/methods-packages/slingshot"
title: "Slingshot"
upstreamRegistryUrl: "http://bioconductor.org/packages/slingshot"
---

[![Build Status](https://travis-ci.org/kstreet13/slingshot.svg?branch=master)](https://travis-ci.org/kstreet13/slingshot)
[![Coverage Status](https://img.shields.io/codecov/c/github/kstreet13/slingshot/master.svg)](https://codecov.io/github/kstreet13/slingshot)

[Slingshot](http://bioconductor.org/packages/slingshot ) provides functions for inferring continuous, branching lineage structures in low-dimensional data. Designed to model developmental trajectories in single-cell RNA sequencing data, Slingshot can also serve as a component in an analysis pipeline after dimensionality reduction and clustering. It is flexible enough to handle arbitrarily many branching events and allows for the incorporation of prior knowledge through supervised graph construction.

## Use

```
docker pull quay.io/kstreet13/slingshot-docker:1.1.2
```

### How to run Slingshot with SingleCellExperiment object as rds file

```
curl -L -o slingshot_input.rds https://github.com/kstreet13/slingshot-docker/raw/master/data/slingshot_input.rds
```

```
docker run -v ${PWD}:/data -w /data --rm -it quay.io/kstreet13/slingshot-docker:1.1.2 Rscript /software/scripts/run_slingshot.R --input=slingshot_input.rds --input-type=rds --reduced-dim=zinbwave
```

### How to run Slingshot with expression matrix and cluster labels as tab delimited files

```
curl -L -o rd.tsv https://github.com/kstreet13/slingshot-docker/raw/master/data/rd.tsv
```

```
curl -L -o cl.tsv https://github.com/kstreet13/slingshot-docker/raw/master/data/cl.tsv
```

```
docker run -v ${PWD}:/data -w /data --rm -it quay.io/kstreet13/slingshot-docker:1.1.2 Rscript /software/scripts/run_slingshot.R --input= rd.tsv --cluster-labels=cl.tsv --input-type=matrix
```

## Validate

Run this command to confirm your container produces correct reference output: 

```
docker run -v ${PWD}:/data -w /data --rm -it quay.io/kstreet13/slingshot-docker:1.1.2 Rscript /software/scripts/run_slingshot.R  --validate
```

## Contact

Kelly Street ([street.kelly@gmail.com](mailto:street.kelly@gmail.com))
