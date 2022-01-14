---
date: "2021-12-25"
description: "Overview of accessing project metadata via the Terra Data Repository (TDR)."
draft: false
title: "Accessing Metadata via TDR"
---

# Accessing Metadata via TDR

The [Terra Data Repository](https://support.terra.bio/hc/en-us/sections/4407099323675-Terra-Data-Repository)
(TDR) offers a complete and authoritative source for the metadata made
available by the DCP Data Browser. This guide will walk you through the
process of accessing metadata stored within TDR.

For detailed information regarding the structure of the data within TDR, see the
[Terra Data Repository schema](https://github.com/HumanCellAtlas/dcp2/blob/main/docs/dcp2_system_design.rst#terra-data-repository-schema).


## Finding a Catalog's Sources

Each project in the DCP Data Browser belongs to a catalog. Each catalog consists
of one or more sources, and each source is composed of properties. These
properties include the name of the Google Cloud project and the name of the TDR snapshot.

A catalog's sources can be viewed via the [Data Browser API](https://data.humancellatlas.org/apis/api-documentation/data-browser-api)
`/index/catalogs` endpoint.

Using `curl` to make the request, and `jq` to parse the response, the first step
is to identify the current default catalog.
```
$ curl -s https://service.azul.data.humancellatlas.org/index/catalogs | jq '.default_catalog'
"dcp11"
```

With the name of the catalog we can now parse out the catalog's source(s) from
the endpoint response.

```
$ curl -s https://service.azul.data.humancellatlas.org/index/catalogs | jq '.catalogs.dcp11.plugins.repository.sources'
[
  "tdr:tdr-fp-c315dee1:snapshot/hca_prod_20201120_dcp2___20211101_dcp11:/2"
]
```

In this example, there is one source for the `dcp11` catalog. The name of the
project (`tdr-fp-c315dee1`) and name of the snapshot (`hca_prod_20201120_dcp2___20211101_dcp11`)
can be extracted from the source following the syntax below.

```
"tdr:{PROJECT_NAME}:snapshot/{SNAPSHOT_NAME}:{prefix}"
```


## Running BigQuery SQL Queries

Access to the metadata in TDR can be accomplished using [Google BigQuery](https://cloud.google.com/bigquery/docs/introduction).
Queries can be run via the Cloud Console or by using the command-line tool `bq`.
- [Using the Cloud Console](https://cloud.google.com/bigquery/docs/bigquery-web-ui)
- [Using the bq command-line tool](https://cloud.google.com/bigquery/docs/bq-command-line-tool)


## Example queries

Replace the following placeholders in the query with the appropriate value
prior to use:

- `{GC_PROJECT}`: The name of the Google Cloud project.
- `{SNAPSHOT}`: The name of the snapshot.
- `{PROJECT_ID}`: The ID of a project in the DCP Data Browser.

To query for all subgraphs (links) in one project:

```
SELECT links_id, content
FROM `{PROJECT}.{SNAPSHOT}.links`
WHERE project_id = '{PROJECT_ID}'
```

To query for all specimen from organism(*) entities in one project:

(*) Note: This query can be adapted for other types of biomaterials such as cell
suspensions or donor organisms by replacing the values of the table name 
`specimen_from_organism` and ID field `specimen_from_organism_id`.

```
WITH contents AS (
    SELECT content
    FROM `{GC_PROJECT}.{SNAPSHOT}.links` AS links,
    UNNEST(JSON_EXTRACT_ARRAY(links.content, '$.links')) AS content
    WHERE links.project_id = '{PROJECT_ID}'
)
SELECT entity.specimen_from_organism_id, entity.content
FROM `{GC_PROJECT}.{SNAPSHOT}.specimen_from_organism` AS entity
WHERE entity.specimen_from_organism_id in (
    SELECT JSON_VALUE(input, '$.input_id') AS id
    FROM contents, UNNEST(JSON_EXTRACT_ARRAY(contents.content, '$.inputs')) AS input
    UNION ALL
    SELECT JSON_VALUE(output, '$.output_id') AS id
    FROM contents, UNNEST(JSON_EXTRACT_ARRAY(contents.content, '$.outputs')) AS output
)
```

To query for all analysis protocol(*) entities in one project:

(*) Note: This query can be adapted for other types of protocols such as library
preparation protocols or imaging protocols by replacing the values of the table
name `analysis_protocol` and ID field `analysis_protocol_id`.

```
WITH contents AS (
    SELECT content
    FROM `{GC_PROJECT}.{SNAPSHOT}.links` AS links,
    UNNEST(JSON_EXTRACT_ARRAY(links.content, '$.links')) AS content
    WHERE links.project_id = '{PROJET_ID}'
)
SELECT entity.analysis_protocol_id, entity.content
FROM `{GC_PROJECT}.{SNAPSHOT}.analysis_protocol` AS entity
WHERE entity.analysis_protocol_id in (
    SELECT JSON_VALUE(protocol, '$.protocol_id') AS id
    FROM contents, UNNEST(JSON_EXTRACT_ARRAY(contents.content, '$.protocols')) AS protocol
)
```
