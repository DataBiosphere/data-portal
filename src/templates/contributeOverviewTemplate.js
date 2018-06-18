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
                        <h1>It is the community which makes the Atlas</h1>
                        <div>
                            <div>
                                <code>We are interested in all data at single-cell resolution level. For our autumn
                                    release,
                                    we are specifically interested in:</code>
                                <code>
                                    <li>openly-released data from human subjects</li>
                                    <li>smartSeq or 10x technology</li>
                                </code>
                            </div>
                            <a href="/" className={compStyles.contactUs}>Contact Us</a>
                        </div>
                    </div>
                    <div className={compStyles.subSection}>
                        <h4>How to Participate</h4>
                        <div className={compStyles.contentFlex}>
                            {linked.slice(0, 4).map((link, i) => <div key={i}>
                                <div className={compStyles.flexImg}/>
                                <h4>{link.childMarkdownRemark.frontmatter.title}</h4>
                                <p>{link.childMarkdownRemark.frontmatter.subTitle}</p>
                                <Link to="/">Link</Link>
                            </div>)}
                        </div>
                    </div>
                    <div className={compStyles.subSection}>
                        <h4>Data Checklist</h4>
                        <div className={classNames(compStyles.contentFlex, compStyles.blockFlex)}>
                            {linked.slice(4, 6).map((link, i) => <div key={i}>
                                <h4>{link.childMarkdownRemark.frontmatter.title}</h4>
                                <li>{link.childMarkdownRemark.frontmatter.subTitle}</li>
                                <Link to="/">Link</Link>
                            </div>)}
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
        componentName
        linked {
               childMarkdownRemark{
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
