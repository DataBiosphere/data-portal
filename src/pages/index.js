/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Home page component.
 */

// Core dependencies
import compStyles from './index.module.css';
import Link from 'gatsby-link';
import React from 'react';

let classNames = require('classnames');
let exploreCounts = ["12.3 Million", "0.2 Million", "2 Hundred", "1.02 Million", "11 Million", "5 Hundred", "2.3 Million", "2 Hundred", "5 Million"];

let exploreLinks = ["blood", "marrow", "brain", "esophagus", "heart", "immune", "kidney", "liver", "spleen"].map(organ => "?filter="+JSON.stringify({organ:organ}));

let exploreHref = ["https://explore.dev.data.humancellatlas.org/"];

// Images
import analysisPortal from "../../images/data-portal/analysis-portal.png";
import arrowRight from "../../images/data-portal/arrow-right.png";
import contribute from "../../images/data-portal/contribute.png";
import findData from "../../images/data-portal/find-data.png";
import processData from "../../images/data-portal/process-data.png";
import Explore from "../../images/explore/explore-person/explore-svg";
import ExploreTable from "../../images/explore/explore-table/explore-table-svg";

const IndexPage = () => (
    <div>
        <div className={compStyles.jumbotron}>
            <div className={compStyles.wrapper}>
                <h1>Single-cell data building a foundation for human health</h1>
                <Link to="/about/overview/overview"><p className={compStyles.xs}>Learn More</p></Link>
                <div className={compStyles.jumbotronSearch}>
                    <input className={classNames(compStyles.homepage, compStyles.large)}
                           placeholder="Search for data now by organs, publications, etc"/>
                    <input className={classNames(compStyles.homepage, compStyles.small)}
                           placeholder="Search for data by organs"/>
                    <button className={compStyles.homepage}>SEARCH</button>
                </div>
            </div>
        </div>
        <div className={compStyles.statsBar}>
            <div className={compStyles.wrapper}>
                <div><p className={compStyles.xs}>CELLS</p><h1>3.4M</h1></div>
                <div><p className={compStyles.xs}>ORGANS</p><h1>22</h1></div>
                <div><p className={compStyles.xs}>DONORS</p><h1>556</h1></div>
                <div><p className={compStyles.xs}>PROJECTS</p><h1>14</h1></div>
                <div><p className={compStyles.xs}>LABS</p><h1>14</h1></div>
            </div>
        </div>
        <div className={compStyles.explore}>
            <div className={compStyles.wrapper}>
                <div>
                    <div className={compStyles.exploreText}>
                        <h2>Start Exploring</h2>
                        <p className={compStyles.s}>Hover over or click on an organ to view data from that organ</p>
                    </div>
                    <Explore exploreCounts={exploreCounts} exploreLinks={exploreLinks} exploreHref={exploreHref}/>
                    <ExploreTable exploreCounts={exploreCounts} exploreLinks={exploreLinks} exploreHref={exploreHref}/>
                </div>
            </div>
        </div>
        <div className={compStyles.dataPortal}>
            <div className={compStyles.wrapper}>
                <h4>What is the HCA Data Portal?</h4>
                <h1>The HCA Data Portal stores and provides single-cell data contributed by labs around the world.
                    Anyone
                    can contribute data, find data, or access community tools and applications.</h1>
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
        </div>
        <div className={compStyles.contact}>
            <div className={compStyles.wrapper}>
                <h2>Stay up-to-date with the Human Cell Atlas</h2>
                <div className={compStyles.contactForm}>
                    <a href="https://www.humancellatlas.org/joinHCA" className={compStyles.homepage}>Register For HCA</a>
                </div>
            </div>
        </div>
    </div>);

export default IndexPage;
