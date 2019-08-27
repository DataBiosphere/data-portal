---
path: "/analyze/methods/methods-packages/phate"
date: "2019-01-23"
title: "Potential of Heat-diffusion for Affinity-based Transition Embedding (PHATE)"
author: "Kevin Moon, David van Dijk, Scott Gigante, Smita Krishnaswamy"
description: "PHATE is a tool for visualizing high dimensional single-cell data with natural progressions or trajectories."
githubUrl: "https://github.com/KrishnaswamyLab/PHATE/"
appUrl: "https://pypi.org/project/phate/"
upstreamRegistryUrl: "https://pypi.org/project/phate/"
componentName: "analysisDetail"
---

[![Build Status](https://travis-ci.com/KrishnaswamyLab/PHATE.svg?branch=master)](https://travis-ci.com/KrishnaswamyLab/PHATE#)

[PHATE](https://pypi.org/project/phate/) is a tool for visualizing high dimensional single-cell data with natural progressions or trajectories. PHATE uses a novel conceptual framework for learning and visualizing the manifold inherent to biological systems in which smooth transitions mark the progressions of cells from one state to another, as described in Moon, van Dijk, Wang et al. (2017), Visualizing Transitions and Structure for Biological Data Exploration, bioRxiv https://www.biorxiv.org/content/early/2018/06/28/120378.

## Use

```
docker pull scottgigante/phate:release-1.1
```

Here we download a csv file containing raw scRNA-seq counts, preprocess it by filtering cells with less than 2000 counts, library size normalize and then apply a square root transform before running PHATE, then save the low-dimensional embedding results to phate_output.csv in your current working directory.

```
docker run -v ${PWD}:/data --rm scottgigante/phate:release-1.1 --filename https://github.com/KrishnaswamyLab/MAGIC/raw/master/data/HMLE_TGFb_day_8_10.csv.gz --min-library-size 2000 --normalize --transform sqrt --knn 5 --decay 15 --output /data/phate_output.csv
```


## Validate
Run this command to confirm your container produces correct reference output:

```
docker run --rm scottgigante/phate:release-1.1 --validate
```

## Contact
Scott Gigante ([scott.gigante@yale.edu](mailto:scott.gigante@yale.edu))
