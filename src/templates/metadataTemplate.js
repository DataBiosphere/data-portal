/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */

// Core dependencies
import {graphql} from 'gatsby';
import React from 'react';

// App dependencies
import MetadataPage from '../components/metadata/metadataPage';

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const type = data.typeMetadata.edges.map(n => n.node)[0];
	const references = data.referenceMetadata.edges.map(n => n.node);

	const {sitePage} = data,
		{context} = sitePage || {},
		{nav} = context || {};

	// Relocate provenance to the end of properties
	if ( type && type.properties[0].name === "provenance" ) {

		const provenance = type.properties.shift();
		type.properties.push(provenance);
	}

	return (
		<MetadataPage nav={nav} references={references} type={type}/>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    typeMetadata: allMetadataSchemaEntity(filter: {id: {eq: $id}}) {
      edges {
        node {
          relativeFilePath
          fields {
            slug
          }
          schemaType
          coreEntity
          title
          name
          description
          properties {
            name
            properties {
              description
              type
              user_friendly
              _ref
              enum
              example
              items {
                type
                _ref
              }
            }
          }
          required
        }
      }
    }
    referenceMetadata: allMetadataSchemaEntity(filter: {schemaType: {in: ["module","core","type","system"]}}) {
      edges {
        node {
          relativeFilePath
          fields {
            slug
          }
          schemaType
          coreEntity
          title
          name
          type
          description
          definitions {
            task {
              required
              type
              properties {
                name
                type
              }
            }
            parameter {
              required
              type
              properties {
                name
                type
                description
              }
            }
          }
          properties {
            name
            properties {
              description
              type
              user_friendly
              _ref
              enum
              example
              items {
                type
                _ref
              }
            }
          }
          required
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
