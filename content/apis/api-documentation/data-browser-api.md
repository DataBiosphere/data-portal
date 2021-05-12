---
title: "HCA Data Browser API"
description: "An overview of the HCA DCP Data Browser API."
---

# Data Browser API

The HCA DCP Data Browser API specifies a REST web service for querying metadata associated with both experimental and analysis data stored in the HCA Data Store.

To deliver response times that make it suitable for interactive use cases, the set of metadata properties that the Data Browser API exposes for sorting, filtering, and aggregation is limited.

Data Browser API provides a uniform view of the metadata over diverse schemas, effectively shielding clients from changes in the schema as they occur over time.

For more information on the Data Browser API, see the [Data Browse API Specification](https://service.azul.data.humancellatlas.org/).

## API Usage Examples

- **Project matrices download notebook**  - The [Downloading Project Matrices](https://github.com/DataBiosphere/azul/blob/develop/docs/download-project-matrices.ipynb) notebook demonstrates the process of making a request to the Azul [/index/projects](https://service.azul.data.humancellatlas.org/#/Index/get_index_projects__project_id_) endpoint for a single project and downloading all the project level matrix files contained within the response.


- **Command-line tool** - The [Azul command-line tool](https://github.com/DataBiosphere/azul/blob/develop/docs/hca_file_downloader.py) demonstrates how to use the [Data Browser API](https://service.azul.data.humancellatlas.org/) to programmatically list and download project data matrices.










