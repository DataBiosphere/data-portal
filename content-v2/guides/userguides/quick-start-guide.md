---
path: "/guides/userguides/quick-start-guide"
date: "2018-05-30"
title: "Quick Start Guide"
description: "A quick start guide on accessing HCA data and metadata."
---


# Accessing HCA Data and Metadata
This section briefly reviews how to find and download data and associated metadata using the Data Browser and curl commands. 


### Finding Data
The *Explore* section of the data portal provides an interactive data browser. You can design a unique cohort, or data subset, by selecting various facets in the Browser's Organ, Method, Donor, Specimen sections. The Specimen's tab shows you how many specimens have been selected. It also gives an estimate of the size of the data set if the entire list were downloaded.


### Downloading Data with a Curl Command
After you identify a cohort of interest, you download the raw data by clicking the blue `Export Selected Data` icon on the right hand side of the page. This will open a new page giving you the option to:
 1) Download Selected Data Using "curl"
 2) Download a File Manifest with Metadata for the Selected Data
 3)Export to Terra. 

 Select Option #1. 

 The Download dialog box gives you the option to further refine the types of files you would like to be included in the manifest. Select which files to include in the download and the click "Request curl Command".

 After a few seconds, a new window with curl command will open. Paste this curl command in your local or cloud-based terminal to download the data. 

### Downloading Metadata in a Data Manifest
Once you have selected data in the Browser, you can download the metadata associated with it to help link important information back to your data files such as donors, disease-states, species, etc.. 

This metadata, also called a "Data Manifest" is in TSV file format and lists all the details about your selected data; however, the manifest is not the actual data file itself.

To download the metadata after selecting data in the Browser, click the blue `Export Selected Data` icon on the right hand side of the page. Then select option #2 (Download a File Manifest with Metadata for the Selected Data) which will download a TSV file with all the metadata associated with the selected data (not the actual data files). 

The Download dialog box gives you the option to further refine the types of files you would like to be included in the manifest. Select which files to include in the manifest. Be cognizant that the sizes listed are for the actual files and not for the manifest itself. When you are ready, select "Start".

The format of the manifest file (TSV) is a simple tab separated text file, with the first line representing the header title for each column. It is OK to remove rows for unwanted files but the header row must remain, and the columns should remain the same.


