---
path: "/releases/documentation/2020-mar/replicating-the-hca-dcp-release-analysis"
date: "2020-03-31"
title: "Replicating the HCA DCP Release Analysis"
draft: true
---

## Replicating the HCA DCP Release Analysis

#  Clustering, Differential expression analyses, and data visualization using the Cumulus workflow. 
This tutorial covers how to process a DCP loom for clustering, differential expression, and visualization using the Cumulus workflow in a Terra workspace. We will use the same [methods](insert links) outlined for the DCP March 2020 Release. All projects for the release were divided into individual datasets (stratified by organ, sequencing, technology, and developmental stage) which are listed on the DCP Release Page. For this tutorial, we will use the sample dataset 2020-Mar-Landscape-Adult-Liver-10x derived from the project [“Dissecting the human liver cellular landscape by single cell RNA-seq reveals novel intrahepatic monocyte/ macrophage populations”](https://data.humancellatlas.org/explore/projects/4d6f6c96-2a83-43d8-8fe1-0f53bffd4674). You can explore other datasets and repeat these analyses on additional loom files.

## Downloading DCP loom files
Navigate to the [DCP Release Page](INSERT LINK)
Download the dataset with the ID: 2020-Mar-Landscape-Adult-Liver-10x.loom file (You can also find this file by going directly to the dataset download page [here](INSERT FILE)
## Creating a Terra Workspace
Terra is a cloud platform for bioinformatic analyses. For this tutorial, you will need to setup a Google account and Billing project in order to create or use a Terra workspace. If you are new to working with Terra, we recommend the following relevant links for documentation on getting started:
[Navigating in Terra](https://support.terra.bio/hc/en-us/articles/360022704371)
[Importing a workflow from Dockstore](https://support.terra.bio/hc/en-us/articles/360039827191)
[Billing](https://support.terra.bio/hc/en-us/articles/360026182251)
1. Go to app.terra.bio and select the “View Workspaces” card
![image](_images/01_new_workspace_card.png)

Select the Create a New Workspace card
