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
import footerLogo from "../../../images/logo/hca-data-portal/hca-logo-white.png"

const Footer = () => (
    <div className={compStyles.footer}>
        <div className={compStyles.wrapper}>
            <div className={compStyles.logo}><i className='material-icons'>chevron_left</i><img src={footerLogo}/></div>
            <div className={compStyles.links}>
                {/*<Link to="/">Events/Webinar</Link>*/}
                {/*<Link to="/">Announcements</Link>*/}
                {/*<Link to="/">Blog</Link>*/}
                {/*<Link to="/">Forum</Link>*/}
                <Link to="/about/overview/overview">About</Link>
                {/*<Link to="/">Feature Requests</Link>*/}
                <Link to="/">Help</Link>
                <Link to="/">Contact</Link>
            </div>
        </div>
    </div>
);

export default Footer;
