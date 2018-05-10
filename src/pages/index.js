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

// Images
import analysisPortal from "../../site/images/data-portal/analysis-portal.png";
import arrowRight from "../../site/images/data-portal/arrow-right.png";
import contribute from "../../site/images/data-portal/contribute.png";
import explore from "../../site/images/explore/explore.png";
import findData from "../../site/images/data-portal/find-data.png";
import processData from "../../site/images/data-portal/process-data.png";

const IndexPage = () => (
    <div>
        <div className={compStyles.jumbotron}>
            <div className={compStyles.wrapper}>
                <h1>Single-cell data building a foundation for human health</h1>
                <div className={compStyles.jumbotronSearch}>
                    <span className={compStyles.longSearchText}>Search for data now by organs, publications, etc</span>
                    <span className={compStyles.shortSearchText}>Search</span>
                    <a href="" className={compStyles.button}>SEARCH</a>
                </div>
            </div>
        </div>
        <div className={compStyles.statsBar}>
            <div className={compStyles.wrapper}>
                <div><p>CELLS</p><span>20M</span></div>
                <div><p>ORGANS</p><span>9</span></div>
                <div><p>DONORS</p><span>556</span></div>
                <div><p>PROJECTS</p><span>67</span></div>
                <div><p>LABS</p><span>20</span></div>
            </div>
        </div>
        <div className={compStyles.explore}>
            <div className={compStyles.wrapper}>
                <h2>Start Exploring</h2>
                <p>Hover over or click on an organ to view data from that organ</p>
                <div>
                    <img src={explore}/>
                </div>
            </div>
        </div>
        <div className={compStyles.dataPortal}>
            <div className={compStyles.wrapper}>
                <p>What is the HCA Data Portal?</p>
                <h1>The HCA Data Portal stores and provides single-cell data contributed by labs around the world.
                    Anyone
                    can contribute data, find data, or access community tools and applications.</h1>
                <div className={compStyles.portalDescription}>
                    <div>
                        <div>
                            <img src={contribute}/>
                        </div>
                        <p>Labs contribute single-cell data<a>Learn about contributing ></a></p>
                    </div>
                    <div className={compStyles.dpArrow}>
                        <img src={arrowRight}/>
                    </div>
                    <div>
                        <div>
                            <img src={processData}/>
                        </div>
                        <p>We process and quality-check the data with our pipelines<a>Learn about Pipelines ></a>
                        </p>
                    </div>
                    <div className={compStyles.dpArrow}>
                        <img src={arrowRight}/>
                    </div>
                    <div>
                        <div>
                            <img src={findData}/>
                        </div>
                        <p>Anyone can find data to download or use for analysis<a>Start Searching ></a></p>
                    </div>
                    <div className={compStyles.dpArrow}>
                        <img src={arrowRight}/>
                    </div>
                    <div>
                        <div>
                            <img src={analysisPortal}/>
                        </div>
                        <p>Find community analysis tools and applications <a>Explore applications ></a></p>
                    </div>
                </div>
            </div>
        </div>
        <div className={compStyles.contact}>
            <div className={compStyles.wrapper}>
                <h2>Stay up to date with the HCA Data Portal</h2>
                <div className={compStyles.contactForm}>
                    <div>
                        <span>Full Name</span>
                    </div>
                    <div>
                        <span>Email Address</span>
                    </div>
                    <a className={compStyles.button}>SUBMIT</a>
                </div>
            </div>
        </div>
    </div>);

export default IndexPage;
