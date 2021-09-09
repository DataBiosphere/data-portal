/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal production environment component.
 */

// Core dependencies
import Cookies from "js-cookie";
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
    const { cookieName } = this.props;

    if (Cookies.get(cookieName) === undefined) {
      this.setState({ visible: true });
    }

    if (Cookies.get(cookieName) === true) {
      this.setState({ visible: false });
    }
  }

  accept = () => {
    const { cookieName } = this.props;

    Cookies.set(cookieName, true, { expires: new Date(2300, 1, 1) });
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
export { Cookies };
