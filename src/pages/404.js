/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying 404 (page not found) errors.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';
import Section from "../components/section/section";
import TabNav from "../components/tabNav/tabNav";

// Styles
import compStyles from './404.module.css';
import fontStyles from "../styles/fontsize.module.css";
import globalStyles from "../styles/global.module.css";

const NotFoundPage = () => (
    <div>
        <Section sectionTitle={"Page Not Found"}/>
        <TabNav homeTab={true}/>
        <div className={compStyles.error}>
            <div className={globalStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <h2>Oops!</h2>
                    <p className={fontStyles.m}>We can’t find the page you were looking for.</p>
                    <p className={fontStyles.m}>Here are some helpful links instead:</p>
                    <Link to="/">Home Page</Link>
                    <Link to="/contact/contact/contact-us">Contact</Link>
                </div>
            </div>
        </div>
    </div>
);

export default NotFoundPage;
