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
import Metadata from "../components/metadata/metadata";
import ProviderMetadataToggleRequiredFields from "../components/metadata/providerMetadataToggleRequiredFields/providerMetadataToggleRequiredFields";

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const {allMetadataEntity, sitePage} = data,
        {context} = sitePage || {},
        {id: sitePageId, nav} = context || {};

    return (
        <ProviderMetadataToggleRequiredFields>
            <Metadata entities={allMetadataEntity} nav={nav} sitePageId={sitePageId}/>
        </ProviderMetadataToggleRequiredFields>
    );
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    allMetadataEntity(filter: {categories: {elemMatch: {schemas: {elemMatch: {id: {eq: $id}}}}}}) {
      edges {
        node {
          entityDescription
          entityName
          categories {
            categoryName
            schemas {
              description
              entity
              fields {
                slug
              }
              id
              properties {
                anchor
                dataType
                description
                example
                graphRestriction {
                  classes
                  direct
                  includeSelf
                  ontologies
                  relations
                }
                label
                name
                primary
                primaryRequired
                propertyFriendlies
                propertyFrom
                propertyFromLink
                propertyPath
                propertyPaths
                _ref
                referenceFrom
                referenceFromLink
                required
                schema {
                  title
                }
              }
              schemaName
              title
              usedByProperties {
                description
                label
                propertyFriendlies
                propertyPath
                urlTo
              }
              urlGitHub
            }
          }
        }
      }
    }
    sitePage(context: {id: {eq: $id }}) {
      context {
        id
        nav {
          label
          secondaryTabs {
            active
            key
            name
            path
          }
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
