/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal io template component.
 */

// Core dependencies
import {graphql} from 'gatsby';
import React from 'react';

// App dependencies
import Layout from '../components/layout';
import Nav from '../components/nav/nav';
import Section from '../components/section/section';
import TabNav from '../components/tabNav/tabNav';

// Styles
import compStyles from './healthCheckTemplate.module.css';
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

	return (
		<Layout pageTitle={title}>
			<Section docPath={docPath}/>
			<TabNav docPath={docPath}/>
			<div className={globalStyles.wrapper}>
				<div className={compStyles.hcaContent}>
					<Nav docPath={docPath}/>
					<div className={classNames(compStyles.markdownContent, compStyles.healthCheckContent)}>
						<div
							className='content-template'
							dangerouslySetInnerHTML={{__html: html}}
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id  }) {
      id
      html
    frontmatter {
      path
      title
    }
      }
  healthCheck: allHealthCheck {
    edges {
      node {
        relativeFilePath
      }
    }
  }
}
`;
