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
import Layout from '../components/layout';
import Metadata from '../components/metadata/metadata';
import * as StringFormatService from '../utils/string-format.service';

// Styles
import compStyles from './metadataTemplate.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	let coreEntity, docPath, pageTitle, referenceMetadata, title, type;

	docPath = data.typeMetadata.edges.map(n => n.node)[0].fields.path;
	type = data.typeMetadata.edges.map(n => n.node)[0];
	referenceMetadata = data.referenceMetadata.edges.map(n => n.node);
	coreEntity = StringFormatService.convertSentenceCasetoTitleCase(type.coreEntity);
	title = type.title;
	pageTitle = `${coreEntity} - ${title}`;

	return (
		<Layout pageTitle={pageTitle} docPath={docPath}>
			<h2 className={classNames(globalStyles.md, compStyles.meta)}>{pageTitle}</h2>
			<p className={fontStyles.hcaCode}>{type.name}</p>
			<p className={fontStyles.xxs}>* Indicates a required field</p>
			<Metadata entity={type} reference={referenceMetadata} unFriendly={type.name}/>
		</Layout>
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
