/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal learn template component.
 */

// Core dependencies
import React from "react";

// App dependencies
import compStyles from './contentTemplate.module.css';
import Nav from '../components/nav/nav';
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

var classNames = require('classnames');

// let showList = false;

export default function Template({
                                     data, // this prop will be injected by the GraphQL query below.
                                 }) {
    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;
    const docPath = frontmatter.path;

    return (
        <div>
            <Section docPath={docPath}/>
            <TabNav docPath={docPath}/>
            <div className={compStyles.wrapper}>
            <div className={compStyles.hcaContent}>
                <Nav docPath={docPath}/>
                <div
                        className={classNames(compStyles.markdownContent, "learn-template")}
                        dangerouslySetInnerHTML={{__html: html}}
                />
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
      }
    }
  }
`;
