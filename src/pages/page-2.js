/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Demo of second page, keeping temporarily as a reference. TODO delete.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// App dependencies
import compStyles from './page-2.module.css';

const SecondPage = () => (
    <div className={compStyles.wrapper}>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
    </div>
);

export default SecondPage;
