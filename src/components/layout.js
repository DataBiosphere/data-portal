/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal layout component; works as wrapper around site component.
 */

// Core dependencies
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

// App dependencies
import Banner from "./banner/banner";
import Footer from "./footer/footer";
import FooterLungMAP from "./footer-lungmap/footer-lungmap";
import HCAMain from "./hcaMain/hcaMain";
import Header from "./header/header";
import { SITE, useConfig } from "../hooks/useConfig";
import PageHead from "./pageHead/pageHead";
import SEO from "./seo/seo";
import SupportRequest from "./supportRequest/supportRequest";
import { getAppTheme } from "../theme/theme";
import { GASource } from "../utils/dp-gtm/ga-source.model";
import * as EnvironmentService from "../utils/environment/environment.service";

// Katex
import "katex/dist/katex.min.css";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./layout.module.css";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollable: true,
      supportRequestActive: false,
    };
  }

  onHandleSiteScroll = (scrollable) => {
    this.setState({ scrollable: scrollable });
  };

  onToggleSupportRequestForm = (active, source) => {
    this.setState({
      supportRequestActive: active,
      supportRequestSource: active ? source : null,
    });
  };

  render() {
    const {
      activeLocation,
      children,
      description,
      docPath,
      healthy,
      homePage,
      homeTab,
      metadataContent,
      nav,
      pageTitle,
      sectionTitle,
    } = this.props;
    const { scrollable, supportRequestActive, supportRequestSource } =
      this.state;
    const atlas = EnvironmentService.getAtlas();
    const lungmap = EnvironmentService.isLungMAP();
    const site = lungmap ? SITE.LUNGMAP : SITE.HCA;
    const currentConfig = useConfig(site);
    return (
      <ThemeProvider theme={getAppTheme(currentConfig.theme)}>
        <CssBaseline />
        <div className={atlas}>
          <PageHead pageTitle={pageTitle} />
          <SEO description={description} pageTitle={pageTitle} />
          <div
            className={classNames(compStyles.site, {
              [compStyles.noScroll]: !scrollable,
            })}
          >
            <Header
              header={currentConfig.layout.header}
              searchPath={currentConfig.search.searchPath}
            />
            <Banner position={"top"} healthy={healthy} />
            {homePage ? (
              children
            ) : (
              <HCAMain
                activeLocation={activeLocation}
                docPath={docPath}
                homeTab={homeTab}
                metadataContent={metadataContent}
                nav={nav}
                onHandleSiteScroll={this.onHandleSiteScroll}
                sectionTitle={sectionTitle}
              >
                {children}
              </HCAMain>
            )}
            {lungmap ? null : (
              <SupportRequest
                active={supportRequestActive}
                source={supportRequestSource}
                onToggle={(active, source) =>
                  this.onToggleSupportRequestForm(active, source)
                }
              />
            )}
            <Banner position={"bottom"} />
            {lungmap ? (
              <FooterLungMAP />
            ) : (
              <Footer
                onFeedbackClicked={() =>
                  this.onToggleSupportRequestForm(true, GASource.FOOTER)
                }
              />
            )}
            <div id="portal" />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Layout;
