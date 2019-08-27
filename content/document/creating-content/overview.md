---
path: "/document/creating-content/overview"
date: "2018-05-30"
title: "Overview"
---

# Overview

The HCA Data Portal is a [JAMStack](https://jamstack.org/) style site that uses [Gatsby.js](https://www.gatsbyjs.org/ ) as the static site generator.

In a JAMStack site, rather than mixing contet with a style template on every request to a webserver, templates are combined with content during a build step.

The resulting static web pages are then deployed to an AWS S3 bucket and fronted by the AWS Cloudfront Content Delivery Network.

In addition to generating static pages optimized for download, the Data Portal will pre-fetch pages once the initial page is loaded giving a very fast browsing experience.

# Content

The site content is written in [markdown](https://en.wikipedia.org/wiki/Markdown) and stored in the `/content` directory of the [Data Portal Content Repository](https://github.com/HumanCellAtlas/data-portal-content) in Github.

# Site Organization

## Sections
The site is layed out in a 4 level hierarchy with the top level sections being:

1. Explore (links to the Data Browser)
1. Analyze 
1. Contribute
1. Learn
1. About 


## Sub Sections

Each section may have zero to 3 sub sections.


## Left Nav Level 1

Each sub section may have a left hand nav of 0 or more documents.

## Left Nav Level 2
Each top level left nav document may have 0 or more child documents.

#Site Map
The sitemap is controlled by a siteMap.js file in the Data Portal Repository. This file is a json file that defines the structure of website. Reach out on the [Content Team Slack Channel](https://slack.com/app_redirect?channel=CA53K2C3A&team=T2EQJFTMJ) for help getting modifications made to the site map. 













 

