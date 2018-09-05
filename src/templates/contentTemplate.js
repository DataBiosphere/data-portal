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
import compStyles from './contentTemplate.module.css';
import About from "../components/about/about";
import Analyze from "../components/analyze/analyze";
import Nav from '../components/nav/nav';
import NavOverview from "../components/navOverview/navOverview";
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;

    let docPath, linked, componentName, subTitle, gitHubPath;
    docPath = markdownRemark.fields.path;
    gitHubPath = markdownRemark.fields.gitHubPath.substring(0, markdownRemark.fields.gitHubPath.lastIndexOf("/"));

    const editPath = "https://github.com/HumanCellAtlas/data-portal-content/tree/master/content" + gitHubPath + ".md";

    if (frontmatter) {
        linked = frontmatter.linked;
        componentName = frontmatter.componentName;
        subTitle = frontmatter.subTitle;
    }

    const getMarkdownClassName = (component) => {

        return classNames({
            [compStyles.markdownContent]: true,
            [compStyles.analyze]: (componentName === "analyze")
        });
    };

    return (
        <div>
            <Section docPath={docPath}/>
            <TabNav docPath={docPath}/>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <Nav docPath={docPath}/>
                    <div className={getMarkdownClassName(componentName)}>
                        <div
                            className="content-template"
                            dangerouslySetInnerHTML={{__html: html}}
                        />
                        {linked && !componentName ? <NavOverview linked={linked}/> : null}
                        {linked && (componentName === "analyze") ? <Analyze linked={linked}/> : null}
                        {linked && (componentName === "about") ? <About subTitle={subTitle} linked={linked}/> : null}
                        <a className={compStyles.editContent} href={editPath} target="_blank">Edit Me</a>
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
            path
            gitHubPath
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subTitle
        componentName
        linked {
               childMarkdownRemark{
                   html
                   frontmatter{
                        path
                        title
                        subTitle
                        githubUrl
                    }
               }
        }
      }
    }
  }
`;
