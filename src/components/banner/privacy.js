/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal privacy component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import ClickHandler from "../clickHandler/clickHandler";
import * as EnvironmentService from "../../utils/environment/environment.service";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./privacy.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";
import * as globalStyles from "../../styles/global.module.css";

class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.accept.bind(this);
    this.state = { visible: false };
  }

  componentDidMount() {
    const { localStorageName } = this.props;

    if (localStorage.getItem(localStorageName) === null) {
      this.setState({ visible: true });
    }

    if (localStorage.getItem(localStorageName) === "T") {
      this.setState({ visible: false });
    }
  }

  accept = () => {
    const { localStorageName } = this.props;

    localStorage.setItem(localStorageName, "T");
    this.setState({ visible: false });
  };

  render() {
    if (!this.state.visible) {
      return null;
    }

    const privacyPath = EnvironmentService.isLungMAP()
      ? "/lungmap-privacy"
      : "/privacy";

    return (
      <div className={compStyles.privacy}>
        <div className={globalStyles.bannerWrapper}>
          <div>
            <p className={classNames(fontStyles.xxs, fontStyles.noMargin)}>
              <span>
                This website uses cookies for security and analytics purposes.
                By using this site, you agree to these uses. Learn more{" "}
              </span>
              <Link to={privacyPath}>here</Link>
              <span>.</span>
            </p>
          </div>
          <ClickHandler
            className={classNames(
              globalStyles.button,
              globalStyles.primary,
              globalStyles.outline,
              compStyles.narrow
            )}
            clickAction={() => this.accept()}
            tag={"div"}
          >
            Got it
          </ClickHandler>
        </div>
      </div>
    );
  }
}

export default Privacy;
