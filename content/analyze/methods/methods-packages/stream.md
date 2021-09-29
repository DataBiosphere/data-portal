---
appUrl: " http://stream.pinellolab.org/"
author: "Huidong Chen, Luca Pinello"
componentName: "analysisDetail"
date: "2018-12-07"
description: "STREAM is an interactive computational pipeline for reconstructing complex cellular developmental trajectories from sc-qPCR, scRNA-seq or scATAC-seq data."
githubUrl: "https://github.com/pinellolab/STREAM/"
path: "/analyze/methods/methods-packages/stream"
title: "STREAM: Single-cell Trajectories Reconstruction, Exploration And Mapping of single-cell data"
upstreamRegistryUrl: "https://bioconda.github.io/recipes/stream/README.html"
---

[![Build Status](https://travis-ci.org/pinellolab/STREAM.svg)](https://travis-ci.org/pinellolab/STREAM)

![STREAM](../../_images/methods/stream_logo.png)

[STREAM](https://bioconda.github.io/recipes/stream/README.html) is an interactive computational pipeline for reconstructing complex cellular developmental trajectories from sc-qPCR, scRNA-seq or scATAC-seq data.

![STREAM](../../_images/methods/stream_screenshot.png)

## Usage

### Obtain docker image

```
docker pull pinellolab/stream:0.3.2
```

### Download test data (optional) 

```
curl -L -o testData.zip https://www.dropbox.com/sh/n8qq4m7w17i6b07/AAAro_qY_-q5VBDC1sZg-LE5a?dl=0?dl=1

unzip testData.zip
```

__Input files must be located in the directory where the docker container will be launched__

### How to run trajectory inference (transcriptomic data) with marker gene exploration

Perform trajectory inference analysis on single cell transcriptomic data then detect DE (differentially expressed) genes, transition genes, and leaf genes

```
cd Nestorowa_2016

docker run -v ${PWD}:/data -w /data pinellolab/stream:0.3.2 -m  data_Nestorowa.tsv.gz -l cell_label.tsv.gz -c cell_label_color.tsv.gz --DE --TG --LG
```

### How to run feature mapping

Reuse a previously inferred principal graph as reference to map new cells 

```
cd Olsson_2016

docker run -v ${PWD}:/data -w /data pinellolab/stream:0.3.2 -m  data_Olsson.tsv.gz -l cell_label.tsv.gz -c cell_label_color.tsv.gz --lle_components 4 --EPG_shift

docker run -v ${PWD}:/data -w /data pinellolab/stream:0.3.2 --new  data_perturbation.tsv.gz --new_l cell_perturbation_label.tsv.gz --new_c cell_perturbation_label_color.tsv.gz
```

### How to run trajectory inference (scATAC-seq data) using precomputed z-score file

Reconstructs trajectories and pseudotime from epigenomic data

```
cd Buenrostro_2018

docker run -v ${PWD}:/data -w /data pinellolab/stream:0.3.2 --atac -m zscore.tsv.gz --atac_samples sample_file.tsv.gz --atac_regions region_file.bed.gz -l cell_label.tsv.gz -c cell_label_color.tsv.gz --lle_components 4
```

## Validate

Run this command to confirm your container produces correct reference output:

```
docker run --entrypoint stream_run_test pinellolab/stream:0.3.2
```

The validation test includes marker gene detction and will take ~15m to finish.

## Integrate

View STREAM in its [production portal](http://stream.pinellolab.org/).

## Contact

Huidong Chen ([huidong.chen@mgh.harvard.edu](mailto:huidong.chen@mgh.harvard.edu))\
Luca Pinello ([lpinello@mgh.harvard.edu](mailto:lpinello@mgh.harvard.edu))
