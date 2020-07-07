---
path: "/apis/api-documentation/data-store-consumer-api"
date: "2018-05-03"
title: "Data Store Consumer API"
description: "Deprecated API: The HCA Data Storage System (DSS) is a replicated data storage system designed for hosting large sets of scientific experimental data on Amazon S3 and Google Storage."
---

# Data Store API

The HCA Data Storage System (DSS) is a replicated data storage system designed for hosting large sets of scientific experimental data on Amazon S3 and Google Storage. The Data Store API provides a low level search and access interface to all  data stored in the DCP.

The DSS exposes a [REST API](https://dss.data.humancellatlas.org/), with [Python bindings](https://hca.readthedocs.io/en/latest/) allowing client applications to:

1. Search for data and metadata.
1. Download data and metadata.
1. Manage subscriptions for notifications of data update events. 

