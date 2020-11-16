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
import AnalysisDetail from '../components/analyze/analysisDetail';
import Analyze from '../components/analyze/analyze';
import Attributions from '../components/attributions/attributions';
import DataLifecycleDiagram from '../components/dataLifecycleDiagram/dataLifecycleDiagram';
import InternalLink from '../components/internal-link/internalLink';
import Layout from '../components/layout';
import LinkToBrowser from "../components/linkToBrowser/linkToBrowser";
import MetadataTypeEntitySchemas from "../components/metadata/metadataTypeEntitySchemas/metadataTypeEntitySchemas";
import SystemStatus from "../components/systemStatus/systemStatus";
import * as TemplateService from '../utils/template.service';

// Styles
import globalStyles from '../styles/global.module.css';
import '../styles/markdown.module.css';

let classNames = require('classnames');

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        "data-lifecycle-diagram": DataLifecycleDiagram,
        "internal-link": InternalLink,
        "link-to-browser": LinkToBrowser,
        "metadata-type-entity-schemas": MetadataTypeEntitySchemas,
        "system-status": SystemStatus
    }
}).Compiler;

// the data prop will be injected by the GraphQL query below.
export default function Template({data, location}) {

	const {pathname, hash} = location;
	const {markdownRemark, sitePage} = data; // data.markdownRemark holds our post data
	const {frontmatter, htmlAst} = markdownRemark,
		{context} = sitePage,
		{nav} = context || {},
		{fields} = markdownRemark || {},
		{slug} = fields || {},
		{componentName, description, linked, title} = frontmatter || {};
	const showEditPage = TemplateService.showEditPage(slug);
	const editPath = TemplateService.getPageEditUrl(slug);
	const h1 = TemplateService.getPageTitle(htmlAst);
	const pageTitle = h1 ? h1 : title;

	return (
		<Layout activeLocation={{pathname, hash}} description={description} docPath={slug} nav={nav} pageTitle={pageTitle}>
			{componentName === 'analysisDetail' ? <AnalysisDetail data={markdownRemark}/> :
				<div className={globalStyles.md}>{renderAst(htmlAst)}</div>}
			{linked && (componentName === 'analyze') ?
				<Analyze linked={linked}/> : null}
			{componentName === 'attributions' ? <Attributions/> : null}
			{showEditPage ?
				<a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)}
				   href={editPath} target='_blank' rel='noopener noreferrer'>Improve this page</a> : null}
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      htmlAst
      fields {
        slug
      }
      frontmatter {
        appUrl
        author
        componentName
        date(formatString: "MMMM DD, YYYY")
        description
        githubUrl
        linked {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter{
              author
              description
              githubUrl
              path
              subTitle
              title
            }
            html
          }
        }
        path
        subTitle
        title
      }
    }
    sitePage(context: {id: {eq: $id }}) {
      context {
        id
        nav {
          label
          section {
            key
            name
            path
          }
          tabKey
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
