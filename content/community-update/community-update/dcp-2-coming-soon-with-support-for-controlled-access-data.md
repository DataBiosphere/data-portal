---
date: "2020-10-09"
description: "An important update for the community - The HCA DCP is undergoing a major upgrade."
title: Coming Soon - DCP 2.0
---

# Coming Soon - DCP 2.0

Dear HCA Community Member,

We are excited to announce the launch of the DCP 2.0 this fall. This has been a collaborative effort over the past 6 months to take on board the HCA community feedback and understand the unmet needs in order to align the goals of the DCP with the wider HCA community goals.

We have made significant changes, including GA4GH-compliance, more data—50% more than previously—and, where available, contributor-generated count matrices, embeddings, and cell type annotations.

## Changes Coming to Key Components

To accomplish this, we will be making the following changes and migrations:

* The current Data Storage Service (DSS) will be retired and we will migrate to the Terra Data Repo, which supports managed access, for storage and metadata management. Both Ingest and the Data Browser will access the Terra Data Repo via self-service APIs, making for minimal disruption to the HCA scientific community.
* The matrix service API will be retired. The per-project matrices that are most commonly used will be available in static form directly from the data browser.
* As a higher-level replacement for the DSS API, the Data Browser API is being prepared for use by the wider developer community and will be officially documented and supported by the HCA DCP team.
* The HCA-CLI will be retired and the Data Browser will provide a bulk download capability via curl (or similar) commands. Because the internal organization of the data store is subject to change with upcoming work on the metadata, direct calls against it are discouraged in favor of the new Data Browser API.

## Transition Path to DCP 2.0

More information about the transition to DCP 2.0 will be announced in the coming weeks and we will endeavour to make this transition as seamless as possible to the HCA research and developer communities.

> To enable a smooth transition, the DCP 1 data browser, APIs and data will remain available until January 1, 2021. 

We will continue to integrate third party portals and applications into the HCA ecosystem by linking from and integrating directly into the HCA Data Browser.

Regards,

The HCA DCP Team
