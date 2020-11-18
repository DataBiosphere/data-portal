---
path: "/apis/api-documentation/matrix-service-api"
date: "2019-02-28"
title: "Matrix Service API"
description: "The Matrix Service provides an interface to aggregrate, query and access gene expression matrices stored in the HCA DCP."
---


# Matrix Service API

_This API is deprecated._
>This API is being deprecated as part of the DCP 2 upgrade. For more information please see our [announcement](/coming-soon-DCP-2-with-support-for-controlled-access-data).


The [Matrix Service](https://github.com/HumanCellAtlas/matrix-service) (MS) provides an interface to aggregrate, query and access gene expression matrices stored in the
[Human Cell Atlas](/) [Data Coordination
Platform](https://www.humancellatlas.org/data-sharing) (DCP). 
 
The service exposes a [REST API](https://matrix.data.humancellatlas.org) for querying and retrieving
expression matrix results.

## File formats

The DCP MS enables users to prepare expression matrices in several formats by supplying the `format` parameter in the
POST request to the `/matrix` endpoint. The following is a list of supported file formats:

- [.loom](http://loompy.org/) (default)
- [.csv](https://en.wikipedia.org/wiki/Comma-separated_values)
- [.mtx](https://math.nist.gov/MatrixMarket/formats.html)
