/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal banner component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { CookieBanner } from "./cookie-banner";
import Environment from "./environment";
import SystemStatus from "./systemStatus";
import * as EnvironmentService from "../../utils/environment/environment.service";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./banner.module.css";

class Banner extends React.Component {
  getBannerClassName = (bannerPos) => {
    return classNames({
      [compStyles.banner]: true,
      [compStyles.top]: bannerPos === "top",
    });
  };

  isTestEnvironment = () => {
    return EnvironmentService.isTestEnvironment();
  };

  render(props) {
    let testMessage =
      "This is a test environment and periodically may be unavailable and/or may contain test data.";
    // prodMessage = 'This is a beta test environment and periodically features, content, or data may change or be unavailable.';
    return (
      <div className={this.getBannerClassName(this.props.position)}>
        {this.props.position === "top" ? (
          this.props.healthy === false ? (
            <SystemStatus />
          ) : null
        ) : null}
        {this.props.position === "top" && this.isTestEnvironment() ? (
          <Environment
            localStorageName="environmentAccepted"
            message={testMessage}
          />
        ) : null}
        {this.props.position === "bottom" ? <CookieBanner /> : null}
      </div>
    );
  }
}

export default Banner;
