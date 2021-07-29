---
path: "/guides/userguides/consumer-vignettes/export-to-terra"
date: "2019-09-17"
title: "Exporting HCA Data to Terra"
subTitle: ""
description: "This tutorial will walk you through exporting search results from the HCA Data Explorer to Terra."
---

# Exporting Search Results from the HCA Data Explorer to Terra


In this tutorial, you will learn how to send search results from the HCA Data
Explorer to Terra and how to run a basic workflow with that data.

This tutorial assumes some familiarity with the aforementioned tools. If you are
not familiar with Terra, see the [Overview of Terra](#overview-of-terra) section
below.

You should also be acquainted with the content in this tutorial:

-   [Accessing HCA Data and Metadata](../quick-start-guide)

Terra [recommends the Google Chrome browser](https://support.terra.bio/hc/en-us/articles/360028235911), which we
follow in this tutorial.

Overview of Terra
-----------------

[Terra](https://app.terra.bio/) is a scalable cloud platform for biomedical research. Terra offers the
ability to use data, tools, and workflows to do interactive analysis in the 
cloud. 

Visit [Terra Support](https://support.terra.bio/hc/en-us) to learn how to [register for a Terra account](https://support.terra.bio/hc/en-us/articles/360028235911) and [get started](https://support.terra.bio/hc/en-us/sections/360006866192) with analyzing data in the cloud.

After registering, you can view multiple workspaces dedicated to using HCA data, such as the:
* [Optimus workspace](https://app.terra.bio/#workspaces/featured-workspaces-hca/HCA_Optimus_Pipeline) for processing 10x data with the [Optimus Pipeline](/pipelines/optimus-workflow).
* [Smart-seq2 workspace](https://app.terra.bio/#workspaces/featured-workspaces-hca/HCA%20Smart-seq2%20Multi%20Sample%20Pipeline) for processing Smart-seq2 data with the [Smart-seq2 Multi-Sample Pipeline](/pipelines/smart-seq2-workflow).
* [Intro-to-HCA-data-on-Terra workspace](https://app.terra.bio/#workspaces/featured-workspaces-hca/Intro-to-HCA-data-on-Terra) for exporting HCA data and analyzing it with community tools like [Seurat](https://satijalab.org/seurat/index.html), [Scanpy](https://scanpy-tutorials.readthedocs.io/en/latest/index.html), [Cumulus](https://cumulus.readthedocs.io/en/latest/index.html), and [Pegasus](https://pegasus.readthedocs.io/en/stable/#). 


Overview of Dockstore
---------------------

[Dockstore](https://dockstore.org/) is a platform for sharing bioscience tools by wrapping them in Docker
containers and describing their use with high-level workflow languages like the Common Workflow
Language (CWL) and the Workflow Description Language (WDL).

For more information about how to use the Dockstore, see the [Dockstore documentation](https://docs.dockstore.org/en/develop/).

Step one: finding BAM files with the HCA Data Explorer
------------------------------------------------------

You can use the <link-to-browser relativelink="/projects">HCA Data Explorer</link-to-browser> to find data to export to Terra.
The Data Explorer lists projects with data available for download from the Data
Store and lets you filter the data for a number of attributes.

Using the Data Explorer, select some data that you are interested in. Choose anything
that looks interesting - we will be running a really simple workflow that
generates MD5 checksums of files, so the type of data is not important.
When you have found a data set of interest, click on the big blue *Export
Selected Data* button at the top right of the page. You will see something like
this:

<figure-styles width="710">

![The *Export Selected Data* button](../../_images/terra-export_button.png)

</figure-styles>

Click on the *Export to Terra* button. You will then see a page like this where
you can select what kind of data to export:

<figure-styles shadowless=true>

![Page for choosing data to export](../../_images/terra-choose_files.png)

</figure-styles>

Again, choose anything that looks interesting.

When you click the *Request Export* button, the Data Explorer will process your
request, and you will be redirected to Terra.

Step two: importing data to Terra and finding a workflow in Dockstore
---------------------------------------------------------------------

Select a Terra workspace to import your selected data into. Once you have selected the
workspace, you will see a page like this, showing the data you just exported:

<figure-styles shadowless=true>

![Terra page showing exported data](../../_images/terra-exported_data.png)

</figure-styles>

Next, we find a workflow to run with the data we've just exported. For this
tutorial, we are looking for *dockstore-wdl-workflow-md5sum*, which will
generate an MD5 checksum for a file (or files) that we provide. We will need 
to import this workflow from Dockstore. To do that, click on the *Workflows* 
tab at the top of the page, then on the big square *Find a Workflow* button.
It will look something like this:

<figure-styles shadowless=true>

![Terra page showing workflows that can be added to workspace](../../_images/terra-workflows.png)

</figure-styles>

Click on the *Dockstore* link at the bottom of the pop-up. Dockstore is a
workflow repository where we will find the workflow we want to run. Once
Dockstore has loaded, search for `md5sum`. The search box is on the left 
side of the page. Results should load instantly. Look for a workflow named
`briandoconnor/dockstore-workflow-md5sum/dockstore-wdl-workflow-md5sum`.
Once you find it, click on it. You will see this:

<figure-styles shadowless=true>

![md5sum workflow on Dockstore](../../_images/terra-md5sum_dockstore.png)

</figure-styles>

Note the blue *Terra* button at the bottom left which will let us load this
workflow in Terra. Click on the button and load the workflow into your
workspace. Once you have, Terra will ask you to select an input to this
workflow:

<figure-styles shadowless=true>

![Terra input screen for md5sum workflow](../../_images/terra-md5sum_input.png)

</figure-styles>

Step three: running the workflow in Terra
-----------------------------------------

On this screen, we want to select a single file from the data that we exported
and find the MD5 checksum of that file. Make sure that the *Process multiple
workflows* radio button is selected, then choose a single file to process by
navigating to *Select Data* > *Choose specific rows to process*.

Next, tell the workflow how to find the file you selected by setting the
*inputFile* variable. Click on the *Attribute* field (red box in the
screenshot above).

Select the DRS URL attribute (something like `this.__bam__.drs_url`). Once
you're done, click *Save*. You will see a blue *Run Analysis* button pop up.
Click that one, and confirm your input when prompted. Terra's running the
workflow now - walk away for a few minutes, grab a coffee, stretch. You
deserve it.

When you come back, refresh the page. Hopefully, your workflow will be done
running. If it is, you will seem something like this:

<figure-styles shadowless=true>

![Terra workflow done running](../../_images/terra-workflow_done.png)

</figure-styles>

Note the green checkmark in the *Status* column.

Congrats! If you want to see the results of this workflow execution, click
on the workflow ID (the UUID on the right of the page), which will show the
data generated by this workflow execution.


