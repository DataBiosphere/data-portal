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

const Header = ({siteTitle}) => (
    <div className={compStyles.navBar}>
        <div className={compStyles.logo}>LOGO</div>
        <div className={compStyles.links}>
            <Link className={compStyles.active} to="/">Explore</Link>
            <Link to="/">Analyze</Link>
            <Link to="/">Contribute</Link>
            <Link to="/">Learn</Link>
            <Link to="/">Build</Link>
        </div>
        <div className={compStyles.menuDropDown}>Alex S.</div>
    </div>
);

export default Header;
