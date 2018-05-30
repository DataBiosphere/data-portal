/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal learn template component.
 */

// Core dependencies
import React from "react";

var classNames = require('classnames');

// App dependencies
import compStyles from './contentTemplate.module.css';

// let showList = false;

let getTabClassName = () => {
    return classNames({
        [compStyles.hcaTab]: true,
        [compStyles.active]: false
    });
};

let getListClassName = () => {
    return classNames({
        [compStyles.expanded]: true,
        [compStyles.selected]: false
    })
};

export default function Template({
                                     data, // this prop will be injected by the GraphQL query below.
                                 }) {
    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;

    return (
        <div>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaHeading}>Learn</div>
            </div>
            <div className={compStyles.hcaTabs}>
                <div className={compStyles.wrapper}>
                    <div className={compStyles.hcaTabList}>
                        <div className={getTabClassName()}>How it works</div>
                        <div className={classNames(compStyles.hcaTab, compStyles.active)}>Userguides</div>
                        <div className={getTabClassName()}>Metadata Dictionary</div>
                    </div>
                </div>
            </div>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <ul className={compStyles.hcaContentNav}>
                        <li>Accessing Data</li>
                        {/*<li className={getListClassName()} onClick={this.onShowList}>Contributing Data</li>*/}
                        <li className={getListClassName()}>Contributing Data</li>
                        <ul>
                            <li>About</li>
                            <li className={compStyles.selected}>How to upload data</li>
                            <li>Prepping your metadata CSV</li>
                            <li>Submission</li>
                            <li>FAQs</li>
                        </ul>
                        <li>Learning about analysis pipelines</li>
                    </ul>
                    <div>
                        <div
                            className="learn-template"
                            dangerouslySetInnerHTML={{__html: html}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const pageQuery = graphql`
  query LearnPostByPath($path: String!) {
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
