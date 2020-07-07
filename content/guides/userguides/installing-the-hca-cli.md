---
path: "/guides/userguides/installing-the-hca-cli"
date: "2018-05-30"
title: "Installing the HCA CLI"
description: "Overview of installing the HCA Command Line Interface."
---

# Installing the HCA Command Line Interface (HCA CLI)
The HCL CLI allows users to interact with the HCA Data Storage System (DSS). 

A primary use case of the HCA CLI is to allow users to download data and associated metadata from the HCA DSS using a file manifest obtained from the Data Browser.

## Installing the HCA CLI for Mac OS
Install Python 3.6 using instructions found on line. Make sure that the basic configuration is correct by running a quick version check on Python:

python --version

It is recommended that the CLI be run in a virtual environment to control Python library dependencies. A common utility for creating and managing virtual environment is `virtualenv`. Installation instructions for `virtualenv` can be found online. In Mac OS High Sierra, one might use:

```
 sudo pip install virtualenv
 virtualenv venv
 source venv/bin/activate
 ```

Now install the HCA command line interface:

`pip install hca`

Now verify that the `hca` program has been installed:

`hca --version`

There are detailed configuration instructions for using `hca` [here](https://hca.readthedocs.io/en/latest/) as well as basic instructions for using each of the available CLI commands.

## Installing the HCA CLI for Windows 10
It is recommended that the CLI be run in a virtual environment to control Python library dependencies. A common utility for creating and managing virtual environment is `virtualenv`. 

Install Python 3.6 using instructions found on line. Make sure that the basic configuration is correct by running a quick version check on Python:

`python --version`

The `pip3` installer should come with Python 3.6. Make sure that your path includes the Scripts sub-dir so that you will have access to the `pip3` program. Verify access after modifying the path by running:

`pip3 --version`

Now install virtualenv

`pip3 install virtualenv`

Now create a virtual environment

`virtualenv venv`

Now move into the virtual environment

`venv\Scripts\activate.bat`

Now install the HCA command line interface:

`pip3 install hca`

Now verify that the `hca` program has been installed:

`hca --version`

There are detailed configuration instructions for using `hca` [here](https://hca.readthedocs.io/en/latest/) as well as basic instructions for using each of the available CLI commands.
