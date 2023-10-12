---
appUrl: "https://github.com/PYangLab/Matilda"
author: "PYangLab"
componentName: "analysisDetail"
date: "2023-10-10"
description: "Matilda is a multi-task framework for learning from single-cell multimodal omics data. Matilda leverages the information from the multi-modality of such data and trains a neural network model to simultaneously learn multiple tasks including data simulation, dimension reduction, visualization, classification, and feature selection."
githubUrl: "https://github.com/PYangLab/Matilda"
path: "/analyze/methods/analysis-portals/matilda"
title: "Matilda"
upstreamRegistryUrl: "https://github.com/PYangLab/Matilda/tree/main/img/main.jpg"
---

Matilda is a multi-task framework for learning from single-cell multimodal omics data. Matilda leverages the information from the multi-modality of such data and trains a neural network model to simultaneously learn multiple tasks including data simulation, dimension reduction, visualization, classification, and feature selection.

### Language

Python

### Basic Command Line Usage

```
# training the matilda model
python main_matilda_train.py --rna [trainRNA] --adt [trainADT] --atac [trainATAC] --cty [traincty] #[training dataset]
# python main_matilda_rna_train.py --rna [trainRNA] --cty [traincty]
# Example run
python main_matilda_train.py --rna ../data/TEAseq/train_rna.h5 --adt ../data/TEAseq/train_adt.h5 --atac ../data/TEAseq/train_atac.h5 --cty ../data/TEAseq/train_cty.csv #Training TEAseq
#python main_matilda_train.py --rna ../data/TEAseq/train_rna.h5 --adt ../data/TEAseq/train_adt.h5  --cty ../data/TEAseq/train_cty.csv #Training CITEseq
#python main_matilda_train.py --rna ../data/TEAseq/train_rna.h5 --atac ../data/TEAseq/train_atac.h5 --cty ../data/TEAseq/train_cty.csv #Training RNA+ATAC
# python main_matilda_rna_train.py --rna ../data/TEAseq/train_rna.h5 --cty ../data/TEAseq/train_cty.csv # for scRNA-seq
```

### Command to validate installation

```
# training the matilda model
python main_matilda_train.py --rna [trainRNA] --adt [trainADT] --atac [trainATAC] --cty [traincty] #[training dataset]
# python main_matilda_rna_train.py --rna [trainRNA] --cty [traincty]
# Example run
python main_matilda_train.py --rna ../data/TEAseq/train_rna.h5 --adt ../data/TEAseq/train_adt.h5 --atac ../data/TEAseq/train_atac.h5 --cty ../data/TEAseq/train_cty.csv #Training TEAseq
#python main_matilda_train.py --rna ../data/TEAseq/train_rna.h5 --adt ../data/TEAseq/train_adt.h5  --cty ../data/TEAseq/train_cty.csv #Training CITEseq
#python main_matilda_train.py --rna ../data/TEAseq/train_rna.h5 --atac ../data/TEAseq/train_atac.h5 --cty ../data/TEAseq/train_cty.csv #Training RNA+ATAC
# python main_matilda_rna_train.py --rna ../data/TEAseq/train_rna.h5 --cty ../data/TEAseq/train_cty.csv # for scRNA-seq
```

### Test Data

<https://github.com/PYangLab/Matilda/tree/main/data/TEAseq>

## Contact

Chunlei Liu ([cliu@cmri.org.au](mailto:cliu@cmri.org.au))
