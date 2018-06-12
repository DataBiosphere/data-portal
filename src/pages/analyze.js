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
import compStyles from './analyze.module.css';

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

const AnalyzePage = () => (
    <div>
        <div className={compStyles.wrapper}>
            <div className={compStyles.hcaHeading}>Analyze</div>
        </div>
        <div className={compStyles.hcaTabs}>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaTabList}>
                    <div className={getTabClassName()}>Portals</div>
                    <div className={classNames(compStyles.hcaTab, compStyles.active)}>Methods</div>
                    <div className={getTabClassName()}>Visualizations</div>
                </div>
            </div>
        </div>
        <div className={compStyles.wrapper}>
            <div className={compStyles.hcaContent}>
                <div>
                    <ul className={compStyles.hcaContentSideNav}>
                        <li>Visualizalization Portals</li>
                        <li>Databases</li>
                        <li>Ligula Inceptos</li>
                        <li>About</li>
                    </ul>
                    <div className={compStyles.hcaSideNavExtra}>Are you an application developer?</div>
                </div>
                <div className={compStyles.hcaMarkdown}>THIS IS MY LOOP</div>
                </div>
        </div>
    </div>
);

export const pageQuery = graphql`
  query AnalysisPortalsPostByPath($path: String!) {
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

export default AnalyzePage;
