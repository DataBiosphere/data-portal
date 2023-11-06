/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer component.
 */

// Core dependencies
import React from "react";

// App dependencies
import FooterLinks from "../footer-links/footer-links";
import { Target } from "../../utils/anchor/target.model";

// Images
import footerLogo from "../../../images/logo/logo-hca-white.png";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./footer.module.css";
import * as globalStyles from "../../styles/global.module.css";

class Footer extends React.Component {
  render() {
    const { onFeedbackClicked } = this.props;
    const wrapperClassName = classNames(
      globalStyles.wrapper,
      compStyles.wrapper
    );
    return (
      <div className={compStyles.footer}>
        <div className={wrapperClassName}>
          <a
            href="https://www.humancellatlas.org/"
            className={compStyles.logo}
            target={Target.BLANK}
          >
            <i className="material-icons">chevron_left</i>
            <img src={footerLogo} alt="Human Cell Atlas" />
          </a>
          <FooterLinks onFeedbackClicked={onFeedbackClicked} />
        </div>
      </div>
    );
  }
}

export default Footer;
