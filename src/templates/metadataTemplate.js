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
import Nav from '../components/nav/nav';
import Section from '../components/section/section';
import TabNav from '../components/tabNav/tabNav';

// Styles
import compStyles from './metadataTemplate.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const markdownRemark = data.markdown; // data.markdownRemark holds our post data
	const {frontmatter, html} = markdownRemark;

	let docPath, title;
	docPath = markdownRemark.fields.path;

	if (frontmatter) {
		title = frontmatter.title;
	}

	const core = data.coreMetadata.edges.find(x => x).node;
	const types = data.typeMetadata.edges.filter(x => x).map(n => n.node);
	const modules = data.moduleMetadata.edges.filter(x => x).map(n => n.node);

	// Merge Modules with Core metadata
	const mergedSchemaCoreWithModules = modules.concat(core);

	return (
		<Layout pageTitle={frontmatter.title}>
			<Section docPath={docPath}/>
			<TabNav docPath={docPath}/>
			<div className={globalStyles.wrapper}>
				<div className={compStyles.hcaContent}>
					<Nav docPath={docPath}/>
					<div className={classNames(compStyles.markdownContent, compStyles.metadataContent)}>
						<div
							className='content-template'
							dangerouslySetInnerHTML={{__html: html}}
						/>
						<p className={classNames(fontStyles.xxs, compStyles.xxs)}>* Indicates a required field</p>
						{types.length ? types.map((e, i) => <Metadata entity={e} modules={mergedSchemaCoreWithModules}
																	  key={i}/>) : null}
					</div>
				</div>
			</div>
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
query ($id: String!, $metadataCoreName: String!) {
  markdown: markdownRemark(id: {eq: $id}) {
    id
    html
    fields {
      path
    }
    frontmatter {
      path
      title
    }
  }
  typeMetadata: allMetadataSchemaEntity(filter: {coreEntity: {eq: $metadataCoreName}, schemaType: {eq: "type"}}) {
    edges {
      node {
        title
        coreEntity
        schemaType
        properties {
          name
          description
          arrayModuleRef
          arrayName
          arrayType
          objectModuleRef
          objectName
          required
          type
          userFriendly
        }
      }
    }
  }
  moduleMetadata: allMetadataSchemaEntity(filter: {schemaType: {eq: "module"}}) {
  edges {
    node {
      title
      coreEntity
      schemaType
      relativeFilePath
      properties {
          name
          description
          arrayName
          objectName
          required
          type
          userFriendly
        }
      }
    }
  }
  coreMetadata: allMetadataSchemaEntity(filter: {coreEntity: {eq: $metadataCoreName}, schemaType: {eq: "core"}}) {
    edges {
      node {
        title
        coreEntity
        schemaType
        relativeFilePath
        properties {
          name
          description
          arrayName
          arrayType
          objectName
          required
          type
          userFriendly
        }
      }
    }
  }
}
`;
