---
appUrl: "http://bioconductor.org/packages/SC3"
author: "Martin Hemberg (SC3), Gene Expression Team (sc3-scripts)"
componentName: "analysisDetail"
date: "2019-02-28"
description: "SC3 is an unsupervised clustering method for scRNA-seq data."
githubUrl: "https://github.com/hemberg-lab/SC3"
path: "/analyze/methods/methods-packages/sc3"
title: "Single-cell consensus clustering (SC3)"
upstreamRegistryUrl: "http://bioconductor.org/packages/SC3"
---

[![Build Status](http://www.bioconductor.org/shields/build/release/bioc/SC3.svg)](https://git.bioconductor.org/packages/SC3)

[SC3](http://bioconductor.org/packages/SC3) is an unsupervised clustering method for scRNA-seq data. SC3 also estimates the number of clusters and it provides features to aid the biological interpretation of the clusters. [sc3-scripts](https://anaconda.org/bioconda/sc3-scripts) provides a set of simple wrappers with robust argument parsing for individual components of the SC3 package.

## Use

```
docker pull quay.io/biocontainers/bioconductor-sc3-scripts:0.0.3--r351_0
```

How to perform unsupervised clustering on scRNA-seq data (already QCed and normalised) in a SingleCellExperiment object 

```
curl -L -o deng-reads.rds https://github.com/hemberg-lab/scRNA.seq.course/raw/master/deng/deng-reads.rds

curl -L -o  sc3-sc3.R https://raw.githubusercontent.com/ebi-gene-expression-group/bioconductor-sc3-scripts/develop/sc3-sc3.R

docker run -v ${PWD}:/data -w /data --rm quay.io/biocontainers/bioconductor-sc3-scripts:0.0.3--r351_0 Rscript sc3-sc3.R -i deng-reads.rds -o deng-sc3.rds 
```

## Validate

Run this command to confirm your container produces correct reference output:

```
curl -L -o  sc3-sc3-validate.R https://raw.githubusercontent.com/ebi-gene-expression-group/bioconductor-sc3-scripts/develop/sc3-sc3-validate.R

docker run -v ${PWD}:/data -w /data --rm quay.io/biocontainers/bioconductor-sc3-scripts:0.0.3--r351_0 Rscript sc3-sc3-validate.R
```

## Contact

Martin Hemberg, SC3 ([mh26@sanger.ac.uk](mailto:mh26@sanger.ac.uk))\
Gene Expression Team, sc3-scripts ([gene-expression@ebi.ac.uk](mailto:gene-expression@ebi.ac.uk))
