---
path: "/pipelines/pipeline-development/processing-pipelines/portability-service-environments"
date: "2018-07-12"
title: "Adding an Environment to the Portability Service"
---

# Why add an environment to the Portability Service?

HCA pipelines and other user-submitted pipelines are executed in multiple environments during development and release to demonstrate their portability. This testing is beneficial in two respects:

1. Pipeline developers get quick feedback about limitations they may be introducing into their pipelines that make them incompatible with a particular environment, so they are more likely to write pipelines that execute successfully in the tested environments.
2. Execution environment implementers get feedback about what kinds of pipelines do or do not work in their environments. With this information, they can identify potential issues with or enhancements to their environments.

## Adding an execution environment

The Portability Service only makes workflow execution requests using the [GA4GH WES API](https://github.com/ga4gh/workflow-execution-service-schemas). Therefore, the first step to adding an environment is to make sure that the environment implements WES (which stands for [Workflow Execution Schema](https://github.com/ga4gh/workflow-execution-service-schemas/blob/develop/README.md)). WES is a common API that helps to standardize workflow submission requests across execution engines.

The mechanics of adding an environment are relatively straightforward. A POST request to the `/environments` endpoint is required, with the following parameters in the request body:

- name: A human-readable name for the environment. This will be used for reporting results.
- schema: Must be "WES".
- url: The base URL for the WES endpoints provided by the environment.
- headers: An optional object with any headers that should be included in requests to the environment.
- key_values: An optional object with any key value pairs that should be included in the request to run the workflow.
