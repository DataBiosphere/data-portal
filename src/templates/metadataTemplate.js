/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */

// Core dependencies
import {graphql} from "gatsby";
import React from "react";

// App dependencies
import MetadataType from "../components/metadataType/metadataType";
import * as MetadataService from "../utils/metadata.service";

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const {allMetadataCore, sitePage} = data,
        {context} = sitePage || {},
        {id: sitePageId, nav} = context || {};

    const core = MetadataService.getMetadataCore(allMetadataCore);
    const type = MetadataService.getMetadataType(sitePageId, allMetadataCore);

    return (
        <MetadataType core={core} nav={nav} type={type}/>
    );
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    allMetadataCore(filter: {types: {elemMatch: {id: {eq: $id}}}}) {
      edges {
        node {
          name
          types {
            description
            entity
            fields {
              slug
            }
            id
            name
            properties {
              anchor
              core
              dataType
              description
              example
              grouped
              label
              primary
              primaryRequired
              required
              unfriendly
            }
            relativePath
            required
            title
            unfriendly
          }
        }
      }
    }
    sitePage(context: {id: {eq: $id }}) {
      context {
        id
        nav {
          section {
            key
            name
            path
          }
          tabs {
            active
            key
            name
            path
          }
          links {
            active
            key
            name
            path
            sLinks {
              active
              key
              name
              path
            }
          }
        }
      }
      path
    }
  }
`;
