/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content template component.
 */

// Core dependencies
import React from "react";

// App dependencies
import compStyles from './contentTemplate.module.css';
import Nav from '../components/nav/nav';
import NavBoxes from '../components/navBoxes/navBoxes';
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

var classNames = require('classnames');

export default function Template({
                                     data, // this prop will be injected by the GraphQL query below.
                                 }) {
    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;
    const docPath = frontmatter.path;
    const linked = frontmatter.linked;

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
                        {linked ? <NavBoxes linked={linked}/> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export const pageQuery = graphql`
  query ContentPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        linked {
               childMarkdownRemark{
                frontmatter{
                    path
                    title
                    subTitle
                }
               }
              }
      }
    }
  }
`;
