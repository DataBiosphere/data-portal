/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal section component.
 */

// Core dependencies
import React from 'react';
import * as siteMap from "../../siteMap";

// Styles
import compStyles from "./section.module.css";
import fontStyles from "../../styles/fontsize.module.css";
import globalStyles from "../../styles/global.module.css";
let classNames = require('classnames');

const Section = ({docPath, sectionTitle}) => (

    <div>
        <div className={globalStyles.wrapper}>
            {docPath ? <div className={classNames(compStyles.hcaSectionHeading, fontStyles.xxl)}>{siteMap.getSection(docPath).name}</div> :
                <div className={classNames(compStyles.hcaSectionHeading, fontStyles.xxl)}>{sectionTitle}</div>}
        </div>
    </div>
);

export default Section;
