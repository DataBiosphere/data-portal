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

// Images
import footerLogo from "../../../images/logo/logo-hca-white.png";

// Styles
import compStyles from "./footer.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class Footer extends React.Component {

    render() {
        const {onFeedbackClicked} = this.props;
        const wrapperClassName = classNames(globalStyles.wrapper, compStyles.wrapper);
        return (
            <div className={compStyles.footer}>
                <div className={wrapperClassName}>
                    <a href="https://www.humancellatlas.org/" className={compStyles.logo}>
                        <i className="material-icons">chevron_left</i>
                        <img src={footerLogo} alt="Human Cell Atlas"/>
                    </a>
                    <FooterLinks onFeedbackClicked={onFeedbackClicked}/>
                </div>
            </div>
        );
    }
}

export default Footer;
