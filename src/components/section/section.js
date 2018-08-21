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

const Section = ({docPath, sectionTitle}) => (

    <div className={compStyles.section}>
        <div className={compStyles.wrapper}>
            {docPath ? <div className={compStyles.hcaSectionHeading}>{siteMap.getSection(docPath).name}</div> :
                <div className={compStyles.hcaSectionHeading}>{sectionTitle}</div>}
        </div>
    </div>
);

export default Section;
