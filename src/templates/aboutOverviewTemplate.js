/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal about template component.
 */

// Core dependencies
import React from "react";
import Link from 'gatsby-link';

// App dependencies
import compStyles from './aboutOverviewTemplate.module.css';
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

var classNames = require('classnames');

// Images
import analysisPortal from "../../images/data-portal/analysis-portal.png";
import arrowRight from "../../images/data-portal/arrow-right.png";
import contribute from "../../images/data-portal/contribute.png";
import findData from "../../images/data-portal/find-data.png";
import processData from "../../images/data-portal/process-data.png";

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
                    <div className={compStyles.dataPortal}>
                        <h1>The HCA Data Portal stores and provides single-cell data contributed by labs around the world.
                            Anyone can contribute data, find data, or access community tools and applications.</h1>
                            <div className={compStyles.portalDescription}>
                                <div>
                                    <div>
                                        <img src={contribute}/>
                                    </div>
                                    <div>
                                        <p className={compStyles.s}>Labs contribute single-cell data</p>
                                        <a className={compStyles.s}>Learn about contributing</a>
                                    </div>
                                </div>
                                <div className={compStyles.dpArrow}>
                                    <img src={arrowRight}/>
                                </div>
                                <div>
                                    <div>
                                        <img src={processData}/>
                                    </div>
                                    <div><p className={compStyles.s}>We process and quality-check the data with our pipelines</p><a
                                        className={compStyles.s}>Learn about Pipelines</a>
                                    </div>
                                </div>
                                <div className={compStyles.dpArrow}>
                                    <img src={arrowRight}/>
                                </div>
                                <div>
                                    <div>
                                        <img src={findData}/>
                                    </div>
                                    <div><p className={compStyles.s}>Anyone can find data to download or use for analysis</p><a
                                        className={compStyles.s}>Start Searching</a></div>
                                </div>
                                <div className={compStyles.dpArrow}>
                                    <img src={arrowRight}/>
                                </div>
                                <div>
                                    <div>
                                        <img src={analysisPortal}/>
                                    </div>
                                    <div><p className={compStyles.s}>Find community analysis tools and applications</p><a
                                        className={compStyles.s}>Explore applications</a></div>
                                </div>
                            </div>
                    </div>
                    <div className={compStyles.whatWeProvide}>
                        <h4>What we provide</h4>
                        <div className={compStyles.contentFlex}>
                            <div>
                                <div className={compStyles.flexImg}/>
                                <h4>Services</h4>
                                <p>Services for uploading, analyzing, and accessing data</p>
                                <Link to="/">Ingest Service</Link>
                                <Link to="/">Data Store</Link>
                                <Link to="/">Data Browser</Link>
                                <Link to="/">Secondary Analysis</Link>
                            </div>
                            <div>
                                <div className={compStyles.flexImg}/>
                                <h4>Software</h4>
                                <p>Software for building your own pipelines and analysis platforms</p>
                                <Link to="/">Fringilla</Link>
                                <Link to="/">Condimentum</Link>
                                <Link to="/">Consectetur</Link>
                                <Link to="/">Pharetra</Link>
                                <Link to="/">Fermentum</Link>
                            </div>
                            <div>
                                <div className={compStyles.flexImg}/>
                                <h4>Standards</h4>
                                <p>Standards for addressing data quality to enable comparisons between datasets from labs around the world</p>
                                <Link to="/">Metadata</Link>
                                <Link to="/">Standards</Link>
                                <Link to="/">Condimentum</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const pageQuery = graphql`
  query AboutOverviewPostByPath($path: String!) {
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
