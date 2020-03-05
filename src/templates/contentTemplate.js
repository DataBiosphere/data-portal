/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content template component.
 */

// Core dependencies
import {graphql} from 'gatsby';
import React from 'react';
import rehypeReact from 'rehype-react';

// App dependencies
import Analyze from '../components/analyze/analyze';
import AnalysisDetail from '../components/analyze/analysisDetail';
import Attributions from '../components/attributions/attributions';
import DataLifecycleDiagram from '../components/dataLifecycleDiagram/dataLifecycleDiagram';
import Layout from '../components/layout';
import LinkToBrowser from "../components/linkToBrowser/linkToBrowser";

// Styles
import '../styles/markdown.module.css';
import globalStyles from '../styles/global.module.css';

let classNames = require('classnames');

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { "data-lifecycle-diagram": DataLifecycleDiagram, "link-to-browser": LinkToBrowser }
}).Compiler;

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const {markdownRemark} = data; // data.markdownRemark holds our post data
	const {frontmatter, htmlAst} = markdownRemark,
		{fields} = markdownRemark || {},
		{editPage, gitHubPath, path} = fields || {},
		{componentName, linked, noNav, pageTitle} = frontmatter || {};

	const editPath = 'https://github.com/HumanCellAtlas/data-portal/tree/staging/content' + gitHubPath.trim().slice(0, -1) + '.md';

	return (
		<Layout pageTitle={pageTitle} docPath={path} noNav={noNav}>
			{componentName === 'analysisDetail' ? null :
				<div className={globalStyles.md}>{renderAst(htmlAst)}</div>}
			{linked && (componentName === 'analyze') ?
				<Analyze editPath={editPath} linked={linked}/> : null}
			{componentName === 'analysisDetail' ?
				<AnalysisDetail editPath={editPath} data={markdownRemark}/> : null}
			{componentName === 'attributions' ? <Attributions/> : null}
			{editPage ?
				<a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)}
				   href={editPath} target='_blank' rel='noopener noreferrer'>Improve this page</a> : null}
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id  }) {
      id
      html
      htmlAst
      fields{
        editPage
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
