/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * LungMAP Portal footer component.
 */

// Core dependencies
import React from "react";

// App dependencies
import FooterLinksLungMAP from "../footer-links-lungmap/footer-links-lungmap";

// Images
import footerLogo from "../../../images/lungmap/logo/logo-lungmap.png";

// Styles
import compStyles from "./footer-lungmap.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class FooterLungMAP extends React.Component {

    render() {
        const wrapperClassName = classNames(globalStyles.wrapper, compStyles.wrapper);
        return (
            <div className={compStyles.footer}>
                <div className={wrapperClassName}>
                    <a href="https://lungmap.net/" className={compStyles.logo}>
                        <i className="material-icons">chevron_left</i>
                        <img src={footerLogo} alt="LungMAP"/>
                    </a>
                    <FooterLinksLungMAP/>
                </div>
            </div>
        );
    }
}

export default FooterLungMAP;
