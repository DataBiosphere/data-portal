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
      title = pageTitle ? pageTitle : "HCA Data Portal";

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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=PT+Mono"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400"
        />
        <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css" />
        <html lang="en" />
      </Helmet>
    );
  }
}

export default PageHead;
