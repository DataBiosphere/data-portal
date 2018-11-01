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

// Images
import analysisPortal from "../../images/data-portal/analysis-portal.png";
import arrowRight from "../../images/data-portal/arrow-right.png";
import contribute from "../../images/data-portal/contribute.png";
import explorePlaceholder from "../../images/data-portal/expore-placeholder.png";
import findData from "../../images/data-portal/find-data.png";
import processData from "../../images/data-portal/process-data.png";

// App dependencies
import HomepageAutosuggest from "../components/homepageAutosuggest/homepageAutosuggest";
import Explore from "../../images/explore/explore-person/explore-svg";
import ExploreStats from "../../images/explore/explore-stats/explore-stats-svg";
import * as FileSummaryService from "../utils/fileSummary.service";
import * as numberFormatter from "../utils/number-format.service";

class IndexPage extends React.Component {

    state = {
        cellCount: 0,
        donorCount: 0,
        fileCount: 0,
        fileFormatSummary: null,
        labCount: 0,
        loaded: false,
        organCount: 0,
        organSummary: null,
        projectCount: 0,
        termFacets: null,
        totalCellCount: 0
    };

    /**
     * Load up counts and summaries on mount of component.
     */
    componentDidMount() {

        FileSummaryService.fetchFileSummary().then(fileSummary => {

            this.setState({
                ...fileSummary
            });
        });

        FileSummaryService.fetchTermFacets().then(termFacets => {

            this.setState({
                termFacets
            });
        });
    }

    constructor(props) {

        super(props);
    }

    formatCount(count) {

        return numberFormatter.format(count, 1);
    }

    render() {
        return (
            <div className={compStyles.homepage}>
                <div className={compStyles.jumbotron}>
                    <div className={compStyles.wrapper}>
                        <h1>Single-cell data building a foundation for human health</h1>
                        <Link to="/about/overview/overview"><p className={compStyles.xs}>Learn More</p></Link>
                        <HomepageAutosuggest termFacets={this.state.termFacets}/>
                    </div>
                </div>
                <div className={classNames({[compStyles.statsBar]: true, [compStyles.loaded]: this.state.loaded})}>
                    <div className={compStyles.wrapper}>
                        <div><p className={compStyles.xs}>CELLS</p>
                            <h1>{this.state.cellCount ? this.formatCount(this.state.cellCount) : ""}</h1></div>
                        <div><p className={compStyles.xs}>ORGANS</p>
                            <h1>{this.state.fileCount ? this.formatCount(this.state.organCount) : ""}</h1></div>
                        <div><p className={compStyles.xs}>DONORS</p>
                            <h1>{this.state.fileCount ? this.formatCount(this.state.donorCount) : ""}</h1></div>
                        <div><p className={compStyles.xs}>PROJECTS</p>
                            <h1>{this.state.fileCount ? this.formatCount(this.state.projectCount) : ""}</h1></div>
                        <div><p className={compStyles.xs}>LABS</p>
                            <h1>{this.state.fileCount ? this.formatCount(this.state.labCount) : ""}</h1></div>
                    </div>
                </div>
                <div className={compStyles.explore}>
                    <div className={compStyles.wrapper}>
                        <div>
                            <div className={compStyles.exploreText}>
                                <h2>Start Exploring</h2>
                                <p className={compStyles.s}>Hover over or click on an organ to view data from that
                                    organ</p>
                            </div>
                            {this.state.organSummary ? 
                                <Explore organSummary={this.state.organSummary} totalCellCount={this.state.totalCellCount}/> : 
                                <img className={compStyles.explorePlaceholder} src={explorePlaceholder}/>}
                            {this.state.organCount ? <ExploreStats organSummary={this.state.organSummary}/> : null}
                        </div>
                    </div>
                </div>
                <div className={compStyles.dataPortal}>
                    <div className={compStyles.wrapper}>
                        <h4>What is the HCA Data Portal?</h4>
                        <h1>The HCA Data Portal stores and provides single-cell data contributed by labs around the
                            world.
                            Anyone
                            can contribute data, find data, or access community tools and applications.</h1>
                        <div className={compStyles.portalDescription}>
                            <div>
                                <div>
                                    <img src={contribute}/>
                                </div>
                                <div>
                                    <p className={compStyles.s}>Labs contribute single-cell data</p>
                                    <Link to="/contribute/overview/overview" className={compStyles.s}>Learn about
                                        contributing</Link>
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
                                    pipelines</p><Link
                                    to="/learn/userguides/data-processing-pipelines/overview-of-data-processing-pipelines-user-guides"
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
                                <div><p className={compStyles.s}>Find community analysis tools and applications</p><Link
                                    to="/analyze/portals/visualization-portals"
                                    className={compStyles.s}>Explore applications</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={compStyles.contact}>
                    <div className={compStyles.wrapper}>
                        <h2>Stay up-to-date with the Human Cell Atlas</h2>
                        <div className={compStyles.contactForm}>
                            <a href="https://www.humancellatlas.org/joinHCA" className={compStyles.homepage}>Register
                                For HCA</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexPage;
