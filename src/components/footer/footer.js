/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer component.
 */

// Core dependencies
import compStyles from './footer.module.css'
import Link from 'gatsby-link';
import React from 'react';

// Images
import footerLogo from "../../../site/images/logo/hca-data-portal/logo-hca-white.png"

const Footer = () => (
    <div className={compStyles.footer}>
        <div>
            <div className={compStyles.logo}><i className='material-icons'>chevron_left</i><img src={footerLogo}/></div>
            /* Footer links will need to be iterated backwards */
            <div className={compStyles.links}>
                <Link to="/">Events/Webinar</Link>
                <Link to="/">Announcements</Link>
                <Link to="/">Blog</Link>
                <Link to="/">Forum</Link>
                <Link to="/">About</Link>
                <Link to="/">Feature Requests</Link>
                <Link to="/">Help</Link>
                <Link to="/">Contact</Link>
            </div>
        </div>
    </div>
);

export default Footer;
