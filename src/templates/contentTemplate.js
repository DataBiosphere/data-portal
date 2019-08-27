/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content template component.
 */

// Core dependencies
import {graphql} from 'gatsby';
import React from 'react';

// App dependencies
import Analyze from '../components/analyze/analyze';
import AnalysisDetail from '../components/analyze/analysisDetail';
import Attributions from '../components/attributions/attributions';
import Layout from '../components/layout';

// Styles
import '../styles/markdown.module.css';
import globalStyles from '../styles/global.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const {markdownRemark} = data; // data.markdownRemark holds our post data
	const {frontmatter, html} = markdownRemark;

	let componentName, docPath, gitHubPath, linked, noNav, pageTitle;
	docPath = markdownRemark.fields.path;
	gitHubPath = markdownRemark.fields.gitHubPath.substring(0, markdownRemark.fields.gitHubPath.lastIndexOf('/'));

	const editPath = 'https://github.com/HumanCellAtlas/data-portal/tree/staging/content' + gitHubPath + '.md';

	if (frontmatter) {
		linked = frontmatter.linked;
		componentName = frontmatter.componentName;
		noNav = frontmatter.noNav;
		pageTitle = frontmatter.title;
	}

	return (
		<Layout pageTitle={pageTitle} docPath={docPath} noNav={noNav}>
			{componentName === 'analysisDetail' ? null :
				<div className={globalStyles.md} dangerouslySetInnerHTML={{__html: html}}/>}
			{linked && (componentName === 'analyze') ?
				<Analyze editPath={editPath} linked={linked}/> : null}
			{componentName === 'analysisDetail' ?
				<AnalysisDetail editPath={editPath} data={markdownRemark}/> : null}
			{componentName === 'attributions' ? <Attributions/> : null}
			{componentName === 'analyze' || componentName === 'analysisDetail' ? null :
				<a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)}
				   href={editPath} target='_blank' rel='noopener noreferrer'>Improve this page</a>}
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id  }) {
      id
      html
      fields{
            gitHubPath
            path
      }
      frontmatter {
        appUrl
        author
        componentName
        date(formatString: "MMMM DD, YYYY")
        githubUrl
        noNav
        path
        subTitle
        title
        linked {
               childMarkdownRemark{
                   html
                   frontmatter{
                        githubUrl
                        path
                        subTitle
                        title
                        author
                        description
                    }
               }
        }
      }
    }
  }
`;
