/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */

// Core dependencies
import { graphql } from "gatsby";
import React from "react";

// App dependencies
import Metadata from "../components/metadata/metadata";
import ProviderMetadataDisplaying from "../components/metadata/providerMetadataDisplaying/providerMetadataDisplaying";
import * as MetadataService from "../utils/metadata.service";

// the data prop will be injected by the GraphQL query below.
export default function Template({ data, location, pageContext }) {
  const { allMetadataEntity } = data,
    { id: sitePageId, nav } = pageContext || {};
  const { pathname, hash } = location;
  const metadataEntity = MetadataService.getMetadataEntity(
    allMetadataEntity,
    sitePageId
  );

  return (
    <ProviderMetadataDisplaying>
      <Metadata
        activeLocation={{ pathname, hash }}
        entity={metadataEntity}
        nav={nav}
        sitePageId={sitePageId}
      />
    </ProviderMetadataDisplaying>
  );
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query {
    allMetadataEntity {
      edges {
        node {
          entity
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
                urlTo
              }
              schemaName
              title
              usedByProperties {
                description
                label
                primaryRequired
                propertyFriendlies
                propertyPath
                required
                type
                urlTo
              }
              urlGitHub
              urlTo
            }
          }
        }
      }
    }
  }
`;
