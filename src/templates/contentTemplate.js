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
import Metadata from "../components/metadata/metadata";
import Nav from '../components/nav/nav';
import NavOverview from "../components/navOverview/navOverview";
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;

    let docPath,linked, componentName, subTitle;
    docPath = markdownRemark.fields.path;

    const editPath = "https://github.com/HumanCellAtlas/data-portal-content/tree/master/content" + (markdownRemark.fields.path) + ".md";

    if(frontmatter){
        linked = frontmatter.linked;
        componentName = frontmatter.componentName;
        subTitle = frontmatter.subTitle;
    }

    return (
        <div>
            <Section docPath={docPath}/>
            <TabNav docPath={docPath}/>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <Nav docPath={docPath}/>
                    <div className={classNames(compStyles.markdownContent)}>
                        <div
                            className="content-template"
                            dangerouslySetInnerHTML={{__html: html}}
                        />
                        {linked && !componentName ? <NavOverview linked={linked}/> : null}
                        {linked && (componentName === "analyze") ? <Analyze linked={linked}/> : null}
                        {linked && (componentName === "about") ? <About subTitle={subTitle} linked={linked}/> : null}
                        {(componentName === "metadata") ? <Metadata/> : null}
                        <div className={compStyles.editContent}><a href={editPath} target="_blank">Edit me on GitHub</a></div>
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
      html
      fields{
            path
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
