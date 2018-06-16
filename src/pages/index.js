/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Home page component.
 */

// Core dependencies
import compStyles from './index.module.css'
import Link from 'gatsby-link';
import React from 'react';

var classNames = require('classnames');

// Images
import analysisPortal from "../../images/data-portal/analysis-portal.png";
import arrowRight from "../../images/data-portal/arrow-right.png";
import contribute from "../../images/data-portal/contribute.png";
import findData from "../../images/data-portal/find-data.png";
import processData from "../../images/data-portal/process-data.png";
import ExplorePerson from "../../images/explore/explore-person/explore-person-svg";
import ExploreTable from "../../images/explore/explore-table/explore-table-svg";

const IndexPage = () => (
    <div>
        <div className={compStyles.jumbotron}>
            <div className={compStyles.wrapper}>
                <h1>Single-cell data building a foundation for human health</h1>
                <a href=""><p className={compStyles.xs}>Learn More ></p></a>
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
                <div><p className={compStyles.xs}>CELLS</p><h1>20M</h1></div>
                <div><p className={compStyles.xs}>ORGANS</p><h1>9</h1></div>
                <div><p className={compStyles.xs}>DONORS</p><h1>556</h1></div>
                <div><p className={compStyles.xs}>PROJECTS</p><h1>67</h1></div>
                <div><p className={compStyles.xs}>LABS</p><h1>20</h1></div>
            </div>
        </div>
        <div className={compStyles.explore}>
            <div className={compStyles.wrapper}>
                <div>
                    <h2>Start Exploring</h2>
                    <p className={compStyles.s}>Hover over or click on an organ to view data from that organ</p>
                    <ExploreTable name="label" value="stop"/>
                </div>
                <div>
                    <ExplorePerson/>
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
                <h2>Stay up to date with the HCA Data Portal</h2>
                <div className={compStyles.contactForm}>
                    <input className={compStyles.homepage} placeholder="Full Name"/>
                    <input className={compStyles.homepage} placeholder="Email Address"/>
                    <button className={compStyles.homepage}>SUBMIT</button>
                </div>
            </div>
        </div>
    </div>);

export default IndexPage;
