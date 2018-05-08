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

// import smallCellJumbotron from "../../images/jumbotron/small-cell-jumbotron.png";
// import smallCellJumbotron2x from "../../images/jumbotron/small-cell-jumbotron@2x.png"
// import fullSizeCellJumbotron from "../../images/jumbotron/full-size-cell-jumbotron.png";
import explore from "../../site/images/explore/explore.png";
// import  personWithOrgans from "../../site/images/explore/person-with-organs.png";

const IndexPage = () => (
    <div>
        <div className={compStyles.jumbotron}>
            <h1>Single-cell data building a foundation for human health</h1>
            <div className={compStyles.jumbotronSearch}>
                <span className={compStyles.longSearchText}>Search for data now by organs, publications, etc</span>
                <span className={compStyles.shortSearchText}>Search</span>
                <a href="" className={compStyles.button}>SEARCH</a>
            </div>
            {/*<img className={compStyles.smallImg} src={smallCellJumbotron}/>*/}
            {/*<img className={compStyles.largeImg} src={fullSizeCellJumbotron}/>*/}
        </div>
        <div className={compStyles.statsBar}>
            <div><p>CELLS</p><span>20M</span></div>
            <div><p>ORGANS</p><span>9</span></div>
            <div><p>DONORS</p><span>556</span></div>
            <div><p>PROJECTS</p><span>67</span></div>
            <div><p>LABS</p><span>20</span></div>
        </div>
        <div className={compStyles.explore}>
            <h2>Start Exploring</h2>
            {/*<p>Hover over or click on an organ to view data from that organ</p>*/}
            <div>
                {/*<img src={personWithoutOrgans}/>*/}
                {/*<img src={personWithOrgans}/>*/}
                <img src={explore}/>
            </div>
        </div>
        <div className={compStyles.dataPortal}>
            <p>What is the HCA Data Portal?</p>
            <h1>The Data Portal is the place where you can find data, contribute data, find tertiary analysis
                portals. Find healthy cellular data from labs around the world.</h1>
            <div className={compStyles.portalDescription}>
                <div>
                    <div>
                        <img src="../../site/images/data-portal/contribute.png"
                             srcset="../../site/images/data-portal/contribute@2x.png 2x, ../../site/images/data-portal/contribute@3x.png 3x"/>
                    </div>
                    <p>Investigators and Labs Contribute Data<a>Learn More ></a></p>
                </div>
                <div className={compStyles.dpArrow}>
                    <img src="../../site/images/data-portal/arrow-right.png"
                         srcset="../../site/images/data-portal/arrow-right@2x.png 2x, ../../site/images/data-portal/arrow-right@3x.png 3x"/>
                </div>
                <div>
                    <div>
                        <img src="../../site/images/data-portal/process-data.png"
                             srcset="../../site/images/data-portal/process-data@2x.png 2x, ../../site/images/data-portal/process-data@3x.png 3x"/>
                    </div>
                    <p>We process and quality-check the data with our HCA Pipelines<a>Learn about Pipelines
                        ></a>
                    </p>
                </div>
                <div className={compStyles.dpArrow}>
                    <img src="../../site/images/data-portal/arrow-right.png"
                         srcset="../../site/images/data-portal/arrow-right@2x.png 2x, ../../site/images/data-portal/arrow-right@3x.png 3x"/>
                </div>
                <div>
                    <div>
                        <img src="../../site/images/data-portal/find-data.png"
                             srcset="../../site/images/data-portal/find-data@2x.png 2x, ../../site/images/data-portal/find-data@3x.png 3x"/>
                    </div>
                    <p>You can find data to download or use in analysis portals<a>Start Searching ></a></p>
                </div>
                <div className={compStyles.dpArrow}>
                    <img src="../../site/images/data-portal/arrow-right.png"
                         srcset="../../site/images/data-portal/arrow-right@2x.png 2x, ../../site/images/data-portal/arrow-right@3x.png 3x"/>
                </div>
                <div>
                    <div>
                        <img src="../../site/images/data-portal/analysis-portal.png"
                             srcset="../../site/images/data-portal/analysis-portal@2x.png 2x, ../../site/images/data-portal/analysis-portal@3x.png 3x"/>
                    </div>
                    <p>Find tertiary analysis portals built by the community<a>See list of Portals ></a></p>
                </div>
            </div>
        </div>
        <div className={compStyles.contact}>
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
    </div>);

export default IndexPage;
