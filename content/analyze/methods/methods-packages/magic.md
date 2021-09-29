---
appUrl: "https://pypi.org/project/magic-impute/"
author: "David van Dijk, Kevin Moon, Scott Gigante, Daniel Dager, Guy Wolf, Smita Krishnaswamy"
componentName: "analysisDetail"
date: "2019-01-23"
description: "Markov Affinity-based Graph Imputation of Cells (MAGIC) is an algorithm for denoising and imputation of single cells applied to single-cell RNA sequencing data"
githubUrl: "https://github.com/KrishnaswamyLab/MAGIC/"
path: "/analyze/methods/methods-packages/magic"
title: "Markov Affinity-based Graph Imputation of Cells (MAGIC)"
upstreamRegistryUrl: "https://pypi.org/project/magic-impute/"
---

[![Build Status](https://travis-ci.com/KrishnaswamyLab/MAGIC.svg?branch=master)](https://travis-ci.com/KrishnaswamyLab/MAGIC#)

Markov Affinity-based Graph Imputation of Cells ([MAGIC](https://pypi.org/project/magic-impute/)) is an algorithm for denoising and imputation of single cells applied to single-cell RNA sequencing data, as described in Van Dijk D et al. (2018), Recovering Gene Interactions from Single-Cell Data Using Data Diffusion, Cell https://www.cell.com/cell/abstract/S0092-8674(18)30724-4.

## Use

```
docker pull scottgigante/magic:release-1.1
```

Here we download a csv file containing raw scRNA-seq counts, preprocess it by filtering cells with less than 2000 counts, library size normalize and then apply a square root transform before running MAGIC, then save the smoothed data matrix to magic_output.csv in your current working directory.

```
docker run -v ${PWD}:/data --rm scottgigante/magic:release-1.1 --filename  https://github.com/KrishnaswamyLab/MAGIC/raw/master/data/HMLE_TGFb_day_8_10.csv.gz  --min-library-size 2000 --normalize --transform sqrt --knn 5 --decay 15 --all-genes  --output /data/magic_output.csv
```

## Validate
Run this command to confirm your container produces correct reference output:

```
docker run --rm scottgigante/magic:release-1.1 --validate
```

## Contact

Scott Gigante ([scott.gigante@yale.edu](mailto:scott.gigante@yale.edu))
