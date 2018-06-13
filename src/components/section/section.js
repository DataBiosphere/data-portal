/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal section component.
 */

// Core dependencies
import compStyles from './section.module.css'
import Link from 'gatsby-link';
import React from 'react';
import * as siteMap from '../../siteMap';

const Section = ({docPath}) => (
    <div>
        <div className={compStyles.wrapper}>
            <div className={compStyles.hcaHeading}>{siteMap.getSection(docPath).name}</div>{docPath}
        </div>
    </div>
);

export default Section;
