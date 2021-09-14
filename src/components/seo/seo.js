/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal seo component.
 */

// Core dependencies
import Helmet from "react-helmet";
import React from "react";

// App dependencies
import * as EnvironmentService from "../../utils/environment/environment.service";

class SEO extends React.Component {
  render() {
    const { description, pageTitle } = this.props,
      defaultTitle = EnvironmentService.isLungMAP()
        ? "LungMAP Data Browser"
        : "HCA Data Portal",
      title = pageTitle ? pageTitle : defaultTitle,
      siteURL = EnvironmentService.getCurrentEnvironmentURL(),
      atlas = EnvironmentService.getAtlas(),
      twitterImgUrl = EnvironmentService.isLungMAP()
        ? `${siteURL}images/${atlas}-twitter.jpg`
        : "";
    return (
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="twitter:title" content={title} />
        {description
          ? [
              <meta
                property="twitter:description"
                content={description}
                key="twitter:description"
              />,
              <meta
                name="description"
                content={description}
                key="description"
              />,
              <meta
                property="og:description"
                content={description}
                key="og:description"
              />,
              twitterImgUrl ? (
                <meta
                  name="twitter:image"
                  content={twitterImgUrl}
                  key="twitter:image"
                />
              ) : null,
            ]
          : null}
        <meta name="twitter:card" content="summary" />
      </Helmet>
    );
  }
}

export default SEO;
