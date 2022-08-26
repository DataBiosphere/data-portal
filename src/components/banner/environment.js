/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal production environment component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../clickHandler/clickHandler";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./environment.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";
import * as globalStyles from "../../styles/global.module.css";

class Environment extends React.Component {
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

    return (
      <div className={compStyles.environment}>
        <div className={globalStyles.bannerWrapper}>
          <div>
            <p
              className={classNames(
                fontStyles.s,
                fontStyles.bgDark,
                fontStyles.noMargin
              )}
            >
              {this.props.message}
            </p>
          </div>
          <ClickHandler
            className={classNames(
              globalStyles.button,
              globalStyles.bgDark,
              globalStyles.outline,
              compStyles.narrow
            )}
            clickAction={() => this.accept()}
            tag={"div"}
          >
            OK
          </ClickHandler>
        </div>
      </div>
    );
  }
}

export default Environment;
