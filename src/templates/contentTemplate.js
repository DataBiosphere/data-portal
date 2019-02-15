/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content template component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from "react";

// App dependencies
import Analyze from "../components/analyze/analyze";
import AnalysisDetail from "../components/analyze/analysisDetail";
import Attributions from "../components/attributions/attributions";
import Nav from '../components/nav/nav';
import NavOverview from "../components/navOverview/navOverview";
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

// Styles
import compStyles from './contentTemplate.module.css';
import globalStyles from '../styles/global.module.css';
let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;

    let componentName, docPath, gitHubPath, linked, noNav;
    docPath = markdownRemark.fields.path;
    gitHubPath = markdownRemark.fields.gitHubPath.substring(0, markdownRemark.fields.gitHubPath.lastIndexOf("/"));

    const editPath = "https://github.com/HumanCellAtlas/data-portal-content/tree/master/content" + gitHubPath + ".md";

    if (frontmatter) {
        linked = frontmatter.linked;
        componentName = frontmatter.componentName;
        noNav = frontmatter.noNav;
    }

    const getContentClassName = () => {

        return classNames({
            [compStyles.hcaContent]: true,
            [compStyles.noNav]: noNav
        });
    };

    const getMarkdownClassName = (component) => {

        return classNames({
            [compStyles.markdownContent]: true,
            [compStyles.analyze]: (componentName === "analysisDetail"),
            [compStyles.noNav]: noNav
        });
    };

    return (
        <div>
            <Section docPath={docPath}/>
            <TabNav docPath={docPath}/>
            <div className={globalStyles.wrapper}>
                <div className={getContentClassName()}>
                    {noNav ? null : <Nav docPath={docPath}/>}
                    <div className={getMarkdownClassName(componentName)}>
                        {componentName === "analysisDetail" ? null : <div
                            className="content-template"
                            dangerouslySetInnerHTML={{__html: html}}
                        />}
                        {linked && !componentName ? <NavOverview linked={linked}/> : null}
                        {linked && (componentName === "analyze") ? <Analyze editPath={editPath} linked={linked}/> : null}
                        {componentName === "analysisDetail" ? <AnalysisDetail editPath={editPath} data={markdownRemark}/> : null}
                        {componentName === "attributions" ? <Attributions/> : null}
                        {componentName === "analyze" || componentName === "analysisDetail" ? null : <a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)} href={editPath} target="_blank">Improve this page</a>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ContentPostByPath($id: String!) {
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
