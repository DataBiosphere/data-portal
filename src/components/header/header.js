/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';
import compStyles from './header.module.css';

// Images
import headerLogo from "../../../site/images/logo/hca-data-portal/logo-hca.png"

const classNames = require('classnames');
let showLinks = false;

const getLinkClassName = () => {
    return classNames({
        [compStyles.links]: true,
        [compStyles.showLinks]: showLinks
    });
};
        const Header = ({siteTitle}) => (
            <div className={compStyles.navBar}>
                <div className={compStyles.wrapper}>
                    <div className={compStyles.logo}><img src={headerLogo}/></div>
                    <div className={getLinkClassName()}>
                        <a href="https://explore.dev.data.humancellatlas.org">
                            <span>Explore</span>
                            <span>Search for data in the HCA</span>
                        </a>
                        <Link to="/">
                            <span>Analyze</span>
                            <span>Find a list of Apps</span>
                        </Link>
                        <Link to="/">
                            <span>Contribute</span>
                            <span>Submit your data to the HCA</span>
                        </Link>
                        <Link to="/learn/how-it-works/data-lifecycle">
                            <span>Learn</span>
                            <span>Find user guides and how-to’s here</span>
                        </Link>
                        <Link to="/">
                            <span>Build</span>
                            <span>Find developer guides and API docs</span>
                        </Link>
                    </div>
                    <div className={compStyles.userDropDown}>Alex S.</div>
                    <div className={compStyles.menuDropDown}>Menu</div>
                    {showLinks ? <div className={compStyles.hcaNavOverlay}></div> : null}
                </div>
            </div>
        );

export default Header;
