/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Home page.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// App dependencies
import HomepageAutosuggest from '../components/homepageAutosuggest/homepageAutosuggest';
import Layout from '../components/layout';
import Explore from '../../images/explore/explore-person/explore-svg';
import ExploreStats from '../../images/explore/explore-stats/explore-stats-svg';
import * as FileSummaryService from '../utils/fileSummary.service';
import * as SystemService from '../utils/system.service';
import * as numberFormatter from '../utils/number-format.service';

// Styles
import compStyles from './index.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

// Images
import arrow from '../../images/data-portal/arrow@2x.png';
import explorePlaceholder from '../../images/data-portal/expore-placeholder.png';
import labsContribute from '../../images/data-portal/HCA-Icons_labs-contribute.png';
import pipelineProcessing from '../../images/data-portal/HCA-Icons_pipeline-processing.png';
import searchCommunity from '../../images/data-portal/HCA-Icons_search-community.png';
import searchData from '../../images/data-portal/HCA-Icons_search-data.png';

let classNames = require('classnames');

class IndexPage extends React.Component {

	state = {
		cellCount: 0,
		cellCountSummaries: null,
		donorCount: 0,
		fileCount: 0,
		fileFormatSummary: null,
		healthy: true,
		labCount: 0,
		loaded: false,
		organCount: 0,
		projectCount: 0,
		searchTerms: null,
		termFacets: null,
		totalCellCount: 0
	};

	/**
	 * Check system status is OK then load up counts and summaries.
	 */
	componentDidMount() {

		this.initComponent();
	}

	/**
	 * Fetch the file summary and term facet data to be displayed in the counts bar and organs diagram, and check
	 * system-wide status. If any system is down or health check API call fails, or if data requests reuturn an error
	 * status, display warning banner.
	 */
	initComponent = () => {

		const fetchFileSummary = FileSummaryService.fetchFileSummary();
		const fetchTermFacets = FileSummaryService.fetchTermFacets();
		const fetchHealthCheck = SystemService.healthCheck();
		Promise.all([fetchFileSummary, fetchTermFacets, fetchHealthCheck])
			.then(([fileSummary, termFacets, healthCheck]) => {

				this.setState({
					...fileSummary,
					...healthCheck,
					searchTerms: FileSummaryService.buildSearchTerms(termFacets),
					termFacets
				});
			})
			.catch((e) => {
				this.setState({
					healthy: false
				})
			});
	};

	/**
	 * Format data counts to sized value (eg k, M, G etc)
	 *
	 * @param {number} count
	 * @returns {*}
	 */
	formatCount(count) {

		return numberFormatter.format(count, 1);
	}

	render() {
		return (
			<Layout healthy={this.state.healthy} homePage={true}>
				<div className={compStyles.homepage}>
					<div className={compStyles.jumbotron}>
						<div className={compStyles.sectionWrapper}>
							<Link to='/guides'><h1 className={fontStyles.hero}>Mapping the human body at the cellular level</h1>
								<h2 className={fontStyles.l}>Community generated, multi-omic, open data processed by standardized pipelines</h2>
								<p className={fontStyles.xs}>Learn More</p></Link>
							<HomepageAutosuggest termFacets={this.state.searchTerms}/>
						</div>
					</div>
					<div className={classNames({[compStyles.statsBar]: true, [compStyles.loaded]: this.state.loaded})}>
						<div className={compStyles.sectionWrapper}>
							<div><p className={fontStyles.xs}>CELLS</p>
								<h1 className={fontStyles.noMargin}>{this.state.cellCount ? this.formatCount(this.state.cellCount) : ""}</h1>
							</div>
							<div><p className={fontStyles.xs}>ORGANS</p>
								<h1 className={fontStyles.noMargin}>{this.state.fileCount ? this.formatCount(this.state.organCount) : ""}</h1>
							</div>
							<div><p className={fontStyles.xs}>DONORS</p>
								<h1 className={fontStyles.noMargin}>{this.state.fileCount ? this.formatCount(this.state.donorCount) : ""}</h1>
							</div>
							<div><p className={fontStyles.xs}>PROJECTS</p>
								<h1 className={fontStyles.noMargin}>{this.state.fileCount ? this.formatCount(this.state.projectCount) : ""}</h1>
							</div>
							<div><p className={fontStyles.xs}>LABS</p>
								<h1 className={fontStyles.noMargin}>{this.state.fileCount ? this.formatCount(this.state.labCount) : ""}</h1>
							</div>
						</div>
					</div>
					<div className={compStyles.explore}>
						<div className={compStyles.sectionWrapper}>
							<div>
								<div className={compStyles.exploreText}>
									<h2>Start Exploring</h2>
									<p>Hover over or click on an organ to view data from that
										organ</p>
								</div>
								{this.state.cellCountSummaries ?
									<Explore cellCountSummaries={this.state.cellCountSummaries}
											 totalCellCount={this.state.totalCellCount}/> :
									<img className={compStyles.explorePlaceholder} src={explorePlaceholder}
										 alt='Explore'/>}
								{this.state.organCount ? <ExploreStats cellCountSummaries={this.state.cellCountSummaries}/> : null}
							</div>
						</div>
					</div>
					<div className={compStyles.dataPortal}>
						<div className={compStyles.sectionWrapper}>
							<h4>What is the HCA Data Portal?</h4>
							<h1>The HCA Data Portal stores and provides single-cell data contributed by labs around the
								world.
								Anyone
								can contribute data, find data, or access community tools and applications.</h1>
							<div className={compStyles.portalDescription}>
								<div className={compStyles.dpTile}>
									<div className={compStyles.dpTileImage}>
										<img src={labsContribute} alt='Labs Contribute'/>
									</div>
									<div className={compStyles.dpTileDescription}>
										<p>Labs contribute single-cell data</p>
										<Link to='/contribute'>Learn about
											contributing</Link>
									</div>
								</div>
								<div className={compStyles.dpArrow}>
									<img src={arrow} alt='Arrow'/>
								</div>
								<div className={compStyles.dpTile}>
									<div className={compStyles.dpTileImage}>
										<img src={pipelineProcessing} alt='Process through Pipelines'/>
									</div>
									<div className={compStyles.dpTileDescription}><p>We process and quality-check the data with our
										pipelines</p><Link
										to='/pipelines'>Learn
										about Pipelines</Link>
									</div>
								</div>
								<div className={compStyles.dpArrow}>
									<img src={arrow} alt='Arrow'/>
								</div>
								<div className={compStyles.dpTile}>
									<div className={compStyles.dpTileImage}>
										<img src={searchData} alt='Search Data'/>
									</div>
									<div className={compStyles.dpTileDescription}><p>Anyone can find data to download or use for
										analysis</p><a href={process.env.GATSBY_EXPLORE_URL}>Start Searching</a></div>
								</div>
								<div className={compStyles.dpArrow}>
									<img src={arrow} alt='Arrow'/>
								</div>
								<div className={compStyles.dpTile}>
									<div className={compStyles.dpTileImage}>
										<img src={searchCommunity} alt='Find Community Analysis Tools'/>
									</div>
									<div className={compStyles.dpTileDescription}><p className={compStyles.s}>Find community analysis tools and applications</p>
										<Link
											to='/analyze'
											className={compStyles.s}>Explore applications</Link></div>
								</div>
							</div>
						</div>
					</div>
					<div className={compStyles.contact}>
						<div className={compStyles.sectionWrapper}>
							<h2>Stay up-to-date with the Human Cell Atlas</h2>
							<div className={compStyles.contactForm}>
								<a href='https://www.humancellatlas.org/joinHCA'
								   className={classNames(globalStyles.button, globalStyles.secondary, globalStyles.hero, compStyles.contactButton)}>Register
									For HCA</a>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default IndexPage;
