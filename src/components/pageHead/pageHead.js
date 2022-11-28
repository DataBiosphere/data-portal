/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal page head component.
 */

// Core dependencies
import Helmet from "react-helmet";
import React from "react";

// App dependencies
import * as EnvironmentService from "../../utils/environment/environment.service";

class PageHead extends React.Component {
  render() {
    const { pageTitle } = this.props,
      defaultTitle = EnvironmentService.isLungMAP()
        ? "LungMAP Data Browser"
        : "HCA Data Portal",
      title = pageTitle ? pageTitle : defaultTitle;

    return (
      <Helmet>
        <title>{title}</title>
        {EnvironmentService.isProd() ? null : (
          <meta name="robots" content="noindex" />
        )}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@300;400;500;600;700&family=PT+Mono&family=Source+Code+Pro:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css" />
        <html lang="en" />
      </Helmet>
    );
  }
}

export default PageHead;
