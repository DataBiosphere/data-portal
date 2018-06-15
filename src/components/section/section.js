/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal section component.
 */

// Core dependencies
import compStyles from './section.module.css'
import React from 'react';
import * as siteMap from '../../siteMap';

const Section = ({docPath}) => (

    <div className={compStyles.section}>
        <div className={compStyles.wrapper}>
            <div className={compStyles.hcaSectionHeading}>{siteMap.getSection(docPath).name}</div>
        </div>
    </div>
);

export default Section;
