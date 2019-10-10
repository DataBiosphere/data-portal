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
import Layout from '../components/layout';
import SearchBrowser from '../components/searchBrowser/searchBrowser';
import Explore from '../../images/explore/explore-person/explore-svg';
import ExploreStats from '../../images/explore/explore-stats/explore-stats-svg';
import * as FileSummaryService from '../utils/fileSummary.service';
import * as SystemService from '../utils/system.service';
import * as numberFormatter from '../utils/number-format.service';

// Styles
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';
import compStyles from './index.module.css';

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
				<main className={compStyles.main}>
					<section className={compStyles.hero}>
						<div
							className={classNames(compStyles.sectionInner, compStyles.s)}>
							<h1 className={fontStyles.headline}>
								<span>Explore the human body </span>
								<span>at the cellular level.</span>
							</h1>
							<p className={fontStyles.subhead}>We curate and quality check data from contributing labs
								around
								the world and make it openly available to any researcher. Download raw or processed data
								here, or explore it using our library of analysis tools and portals.</p>
						</div>
					</section>
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
								{this.state.organCount ?
									<ExploreStats cellCountSummaries={this.state.cellCountSummaries}/> : null}
							</div>
						</div>
					</div>
					<SearchBrowser termFacets={this.state.searchTerms}/>
					<section className={compStyles.portal}>
						<div className={classNames(compStyles.sectionInner, compStyles.s)}>
							<div className={compStyles.intro}>
								<h4 className={fontStyles.introTitle}>What is the HCA Data Portal?</h4>
								<p className={fontStyles.introText}>The HCA Data Portal stores and provides single-cell
									data contributed by labs around the world. Anyone can contribute data, find data, or
									access community tools and applications.</p>
							</div>
							<div className={classNames(compStyles.process, compStyles.module)}>
								<div className={compStyles.tile}>
									<div className={compStyles.icon}>
										<img src={labsContribute} alt='Labs Contribute'/>
									</div>
									<div className={compStyles.text}>
										<p>Labs contribute single-cell data</p>
										<Link to='/contribute'>Learn about
											contributing</Link>
									</div>
								</div>
								<div className={compStyles.arrow}>
									<img src={arrow} alt='Arrow'/>
								</div>
								<div className={compStyles.tile}>
									<div className={compStyles.icon}>
										<img src={pipelineProcessing} alt='Process through Pipelines'/>
									</div>
									<div className={compStyles.text}>
										<p>We process and quality-check the data with our pipelines</p>
										<Link to='/pipelines'>Learn about Pipelines</Link>
									</div>
								</div>
								<div className={compStyles.arrow}>
									<img src={arrow} alt='Arrow'/>
								</div>
								<div className={compStyles.tile}>
									<div className={compStyles.icon}>
										<img src={searchData} alt='Search Data'/>
									</div>
									<div className={compStyles.text}>
										<p>Anyone can find data to download or use for analysis</p>
										<a href={process.env.GATSBY_EXPLORE_URL}>Start Searching</a></div>
								</div>
								<div className={compStyles.arrow}>
									<img src={arrow} alt='Arrow'/>
								</div>
								<div className={compStyles.tile}>
									<div className={compStyles.icon}>
										<img src={searchCommunity} alt='Find Community Analysis Tools'/>
									</div>
									<div className={compStyles.text}>
										<p className={compStyles.s}>Find community analysis tools and applications</p>
										<Link to='/analyze' className={compStyles.s}>Explore applications</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className={compStyles.contact}>
						<div className={classNames(compStyles.sectionInner, compStyles.s)}>
								<h4 className={classNames(fontStyles.introTitle, globalStyles.bgDark, compStyles.intro)}>Stay up-to-date
									with the Human Cell Atlas</h4>
							<div className={classNames(compStyles.module, compStyles.visit)}>
								<a href='https://www.humancellatlas.org/joinHCA'
								   className={classNames(globalStyles.button, globalStyles.blue, globalStyles.light)}>Visit HCA.org</a>
							</div>
						</div>
					</section>
				</main>
			</Layout>
		);
	}
}

export default IndexPage;
