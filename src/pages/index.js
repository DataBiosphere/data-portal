/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Home page.
 */

// Core dependencies
import React from "react";

// App dependencies
import ExploreData from "../components/explore/exploreData";
import Layout from "../components/layout";
import SearchBrowser from "../components/searchBrowser/searchBrowser";
import * as FileSummaryService from "../utils/explore/fileSummary.service";
import * as SystemService from "../utils/system.service";
import * as numberFormatter from "../utils/number-format.service";
import { Target } from "../utils/anchor/target.model";

// Images
import cells from "../../images/icon/metrics/cells.png";
import donors from "../../images/icon/metrics/donors.png";
import labs from "../../images/icon/metrics/labs.png";
import projects from "../../images/icon/metrics/projects.png";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./index.module.css";
import * as fontStyles from "../styles/fontsize.module.css";
import * as globalStyles from "../styles/global.module.css";
import "../styles/vars.module.css";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      totalCellCount: 0,
    };
  }

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
          termFacets,
        });
      })
      .catch((e) => {
        this.setState({
          healthy: false,
        });
      });
  };

  render() {
    const description = "Community generated, multi-omic, open data";
    const pageTitle = "Mapping the Human Body at the Cellular Level";
    return (
      <Layout
        description={description}
        healthy={this.state.healthy}
        homePage={true}
        pageTitle={pageTitle}
      >
        <main className={compStyles.main}>
          <section className={compStyles.hero}>
            <div className={classNames(compStyles.sectionInner, compStyles.s)}>
              <h1 className={fontStyles.headline}>
                <span>Mapping the Human Body </span>
                <span>at the Cellular Level</span>
              </h1>
              <h2 className={fontStyles.subhead}>
                <span>
                  Community generated,{" "}
                  <span className={compStyles.noWrap}>
                    multi-omic, open data
                  </span>
                </span>
              </h2>
            </div>
          </section>
          <section
            className={classNames({
              [compStyles.metricsBar]: true,
              [compStyles.loading]: !this.state.loaded,
            })}
          >
            <div
              className={classNames(
                compStyles.sectionInner,
                compStyles.l,
                compStyles.metrics
              )}
            >
              <div className={compStyles.metric} data-testid="metric">
                <span>
                  <img src={cells} alt="cells" />
                </span>
                <div>
                  <span className={compStyles.count}>
                    {numberFormatter.formatCount(this.state.cellCount)}
                  </span>
                  <span className={compStyles.label}>Cells</span>
                </div>
              </div>
              <div className={compStyles.metric} data-testid="metric">
                <span>
                  <img src={donors} alt="Donors" />
                </span>
                <div>
                  <span className={compStyles.count}>
                    {numberFormatter.formatCount(this.state.donorCount)}
                  </span>
                  <span className={compStyles.label}>Donors</span>
                </div>
              </div>
              <div className={compStyles.metric} data-testid="metric">
                <span>
                  <img src={projects} alt="Projects" />
                </span>
                <div>
                  <span className={compStyles.count}>
                    {numberFormatter.formatCount(this.state.projectCount)}
                  </span>
                  <span className={compStyles.label}>Projects</span>
                </div>
              </div>
              <div className={compStyles.metric} data-testid="metric">
                <span>
                  <img src={labs} alt="Labs" />
                </span>
                <div>
                  <span className={compStyles.count}>
                    {numberFormatter.formatCount(this.state.labCount)}
                  </span>
                  <span className={compStyles.label}>Labs</span>
                </div>
              </div>
            </div>
          </section>
          <SearchBrowser termFacets={this.state.searchTerms} />
          <section className={compStyles.anatogram}>
            <div className={classNames(compStyles.sectionInner, compStyles.m)}>
              <ExploreData
                cellCountSummaries={this.state.cellCountSummaries}
                totalCellCount={numberFormatter.formatCount(
                  this.state.totalCellCount
                )}
              />
            </div>
          </section>
          <section className={compStyles.contact}>
            <div className={classNames(compStyles.sectionInner, compStyles.s)}>
              <h4
                className={classNames(
                  fontStyles.introTitle,
                  globalStyles.bgDark,
                  compStyles.intro
                )}
              >
                Stay up-to-date with the Human Cell Atlas
              </h4>
              <div
                className={classNames(
                  compStyles.introContent,
                  compStyles.visit
                )}
              >
                <a
                  href="https://www.humancellatlas.org/join-hca/"
                  className={classNames(
                    globalStyles.button,
                    globalStyles.blue,
                    globalStyles.light,
                    globalStyles.register
                  )}
                  target={Target.BLANK}
                >
                  <span>Join the </span>
                  <span>HCA Register of Interest</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

export default IndexPage;
