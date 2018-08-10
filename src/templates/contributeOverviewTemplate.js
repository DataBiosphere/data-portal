/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal contribute overview template component.
 */

// Core dependencies
import React from "react";
import Link from 'gatsby-link';

// App dependencies
import compStyles from './contributeOverviewTemplate.module.css';
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
                    <div className={compStyles.contribute}>
                        <h1>The Atlas is built by the Community</h1>
                        <div>
                            <div className={compStyles.codeStyle}>
                                <div>We plan to incorporate all types of single cell data.</div>
                                <ul>
                                    <li>We are interested in openly consented data from human subjects.</li>
                                    <li>Our pipelines can proccess data derived from Smart-seq2 and 10x v2 scRNA-seq
                                        assays.
                                    </li>
                                    <li>All single cell genomics assays are welcome.</li>
                                </ul>
                            </div>
                            <a href="mailto:data-help@humancellatlas.org"
                               className={compStyles.contactUs}>Contribute</a>
                        </div>
                    </div>
                    <div className={compStyles.subSection}>
                        <h4>How to Participate</h4>
                        <div className={compStyles.contentFlex}>
                            {linked.slice(0, 4).map((link, i) => <div key={i}
                                                                      dangerouslySetInnerHTML={{__html: link.childMarkdownRemark.html}}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const pageQuery = graphql`
  query ContributePostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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
