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

	// Relocate provenance to the end of properties
	if ( type && type.properties[0].name === "provenance" ) {

		const provenance = type.properties.shift();
		type.properties.push(provenance);
	}

	return (
		<MetadataPage references={references} type={type}/>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
query ($metadataPath: String!) {
  typeMetadata: allMetadataSchemaEntity(filter: {relativeFilePath: {eq: $metadataPath}}) {
    edges {
      node {
        relativeFilePath
        fields {
          path
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
          path
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
}
`;
