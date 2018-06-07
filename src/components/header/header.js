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

const Header = ({siteTitle}) => (
    <div className={compStyles.navBar}>
        <div className={compStyles.wrapper}>
            <div className={compStyles.logo}><img src={headerLogo}/></div>
            <div className={compStyles.links}>
                <a  href="https://explore.dev.data.humancellatlas.org">Explore</a>
                <Link to="/">Analyze</Link>
                <Link to="/">Contribute</Link>
                <Link to="/">Learn</Link>
                <Link to="/">Build</Link>
            </div>
            <div className={compStyles.menuDropDown}>Alex S.</div>
        </div>
    </div>
);

export default Header;
