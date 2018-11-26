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
import footerLogo from "../../../images/logo/logo-hca-white.png"

const Footer = () => (
    <div className={compStyles.footer}>
        <div className={compStyles.wrapper}>
            <a href="https://www.humancellatlas.org/" className={compStyles.logo}><i className='material-icons'>chevron_left</i><img src={footerLogo}/></a>
            <div className={compStyles.links}>
                <Link to="/about">About</Link>
                <Link to="/help">Help</Link>
                <Link to="/attributions">Attributions</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    </div>
);

export default Footer;
