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

	const core = data.metadata.edges.find((x) => {
			return x.node.schemaType === 'core';
		}
	).node;

	const types = data.metadata.edges.filter((x) => {
		return x.node.schemaType === 'type';
	}).map(n => n.node);

	const modules = data.metadata.edges.filter((x) => {
		return x.node.schemaType === 'module';
	}).map(n => n.node);

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
						<h2>{title} Core</h2>
						<Metadata entity={core}/>
						<h2>{title} Types</h2>
						{types.length ? types.map((e, i) => <Metadata entity={e} key={i}/>) :
							<div className={fontStyles.s}>No Modules</div>}
						<h2>{title} Modules</h2>
						{modules.length ? modules.map((e, i) => <Metadata entity={e} key={i}/>) :
							<div className={fontStyles.s}>No Modules</div>}
					</div>
				</div>
			</div>
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!, $metadataCoreName: String!) {
    markdown: markdownRemark(id: { eq: $id  }) {
      id
      html
      fields{
            path
            gitHubPath
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subTitle
        componentName
        metadataCoreName
        linked {
               childMarkdownRemark{
                   html
                   frontmatter{
                        path
                        title
                        subTitle
                    }
               }
        }
      }
    }
    
    metadata: allMetadataSchemaEntity(
    filter: {coreEntity: {eq: $metadataCoreName} schemaType: {ne: "bundle"}}
  ){
    edges{
      node{
        title
        coreEntity
        schemaType
        properties{
          name
          description
          itemsRef
          itemsType
          objectRef
          required
          type
          userFriendly
        }
      }
    }
  }
  }
`;
