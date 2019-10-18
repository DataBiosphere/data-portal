/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Home page.
 */

// Core dependencies
import { Link } from 'gatsby';
import React from 'react';

// App dependencies
import ExploreData from '../components/explore/exploreData';
import Layout from '../components/layout';
import SearchBrowser from '../components/searchBrowser/searchBrowser';
import * as FileSummaryService from '../utils/fileSummary.service';
import * as SystemService from '../utils/system.service';
import * as numberFormatter from '../utils/number-format.service';

// Styles
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';
import compStyles from './index.module.css';

// Images
import cells from '../../images/icon/metrics/cells.png';
import donors from '../../images/icon/metrics/donors.png';
import labs from '../../images/icon/metrics/labs.png';
import organs from '../../images/icon/metrics/organs.png';
import projects from '../../images/icon/metrics/projects.png';
import arrow from '../../images/icon/portal/arrow.png';
import labsContribute from '../../images/icon/portal/labsContribute.png';
import pipelineProcessing from '../../images/icon/portal/pipelineProcessing.png';
import searchCommunity from '../../images/icon/portal/searchCommunity.png';
import searchData from '../../images/icon/portal/searchData.png';

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
	 * system-wide status. If any system is down or health check API call fails, or if data requests return an error
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

	render() {
		return (
			<Layout healthy={this.state.healthy} homePage={true}>
				<main className={compStyles.main}>
					<section className={compStyles.hero}>
						<div
							className={classNames(compStyles.sectionInner, compStyles.s)}>
							<h1 className={fontStyles.headline}>
								<span>Mapping the human body </span>
								<span>at the cellular level</span>
							</h1>
							{/*<p className={fontStyles.subhead}>[insert]</p>*/}
						</div>
					</section>
					<section className={classNames({[compStyles.metricsBar]: true, [compStyles.loading]: !this.state.loaded})}>
						<div className={classNames(compStyles.sectionInner, compStyles.l, compStyles.metrics)}>
							<div className={compStyles.metric}>
								<span><img src={cells} alt='cells'/></span>
								<div>
									<span className={compStyles.count}>{numberFormatter.formatCount(this.state.cellCount)}</span>
									<span className={compStyles.label}>Cells</span>
								</div>
							</div>
							<div className={compStyles.metric}>
								<span><img src={organs} alt='Organs'/></span>
								<div>
									<span className={compStyles.count}>{numberFormatter.formatCount(this.state.organCount)}</span>
									<span className={compStyles.label}>Organs</span>
								</div>
							</div>
							<div className={compStyles.metric}>
								<span><img src={donors} alt='Donors'/></span>
								<div>
									<span className={compStyles.count}>{numberFormatter.formatCount(this.state.donorCount)}</span>
									<span className={compStyles.label}>Donors</span>
								</div>
							</div>
							<div className={compStyles.metric}>
								<span><img src={projects} alt='Projects'/></span>
								<div>
									<span className={compStyles.count}>{numberFormatter.formatCount(this.state.donorCount)}</span>
									<span className={compStyles.label}>Projects</span>
								</div>
							</div>
							<div className={compStyles.metric}>
								<span><img src={labs} alt='Labs'/></span>
								<div>
									<span className={compStyles.count}>{numberFormatter.formatCount(this.state.labCount)}</span>
									<span className={compStyles.label}>Labs</span>
								</div>
							</div>
						</div>
					</section>
					<section className={compStyles.explore}>
						<div className={classNames(compStyles.sectionInner, compStyles.m)}>
							<div className={compStyles.intro}>
								<h4 className={fontStyles.introTitle}>Start Exploring Data</h4>
								<p className={fontStyles.introText}>
									<span>Community generated, multi-omic, </span>
									<span>open data processed by standardized pipelines</span>
								</p>
							</div>
							<ExploreData cellCountSummaries={this.state.cellCountSummaries} totalCellCount={numberFormatter.formatCount(this.state.totalCellCount)}/>
						</div>
					</section>
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
					{/*<section className={compStyles.lifecycle}>*/}
						{/*<div className={classNames(compStyles.sectionInner, compStyles.s, compStyles.intro)}>*/}
							{/*<p>Aliquam eros ante, ornare in hendrerit at, faucibus at eros. Morbi gravida augue in nunc pulvinar hendrerit. Cras et lobortis leo, a placerat risus <Link to="/guides/data-lifecycle">learn about Data Lifecycle.</Link></p>*/}
						{/*</div>*/}
					{/*</section>*/}
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
