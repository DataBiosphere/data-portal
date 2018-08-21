/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal about template component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from "react";

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
	const linked = frontmatter.linked;

	return (
		<div>
			<Section docPath={docPath}/>
			<TabNav docPath={docPath}/>
			<div className={compStyles.wrapper}>
				<div className={compStyles.hcaContent}>
					<div className={compStyles.dataPortal}>
						<h1>The <a target="_blank" href="https://www.humancellatlas.org/">Human Cell Atlas</a>’ mission is to create comprehensive reference maps of all human
							cells—the fundamental units of life—as a basis for both understanding human health and
							diagnosing, monitoring, and treating disease.</h1>
						<a target="_blank" href="https://www.humancellatlas.org/">View the Human Cell Atlas website</a>
						<h2>The Human Cell Atlas Data Portal stores and provides single-cell data contributed by labs around the world. Anyone can contribute data, find data, or access community tools and applications.</h2>
						<div className={compStyles.portalDescription}>
							<div>
								<div>
									<img src={contribute}/>
								</div>
								<div>
									<p className={compStyles.s}>Labs contribute single-cell data</p>
									<Link to="../../contribute/overview/overview" className={compStyles.s}>Learn about contributing</Link>
								</div>
							</div>
							<div className={compStyles.dpArrow}>
								<img src={arrowRight}/>
							</div>
							<div>
								<div>
									<img src={processData}/>
								</div>
								<div><p className={compStyles.s}>We process and quality-check the data with our
									pipelines</p><Link to="../../learn/userguides/secondary-analysis/what-is-the-secondary-analysis-service"
									className={compStyles.s}>Learn about Pipelines</Link>
								</div>
							</div>
							<div className={compStyles.dpArrow}>
								<img src={arrowRight}/>
							</div>
							<div>
								<div>
									<img src={findData}/>
								</div>
								<div><p className={compStyles.s}>Anyone can find data to download or use for
									analysis</p><a href={process.env.GATSBY_EXPLORE_URL}
									className={compStyles.s}>Start Searching</a></div>
							</div>
							<div className={compStyles.dpArrow}>
								<img src={arrowRight}/>
							</div>
							<div>
								<div>
									<img src={analysisPortal}/>
								</div>
								<div><p className={compStyles.s}>Find community analysis tools and applications</p><Link to="../../analyze/portals/visualization-portals"
									className={compStyles.s}>Explore applications</Link></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const pageQuery = graphql`
  query AboutPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
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
