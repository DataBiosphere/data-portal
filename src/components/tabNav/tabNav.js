/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tab nav component.
 */

// Core dependencies
import compStyles from './tabNav.module.css'
import React from 'react';
import Link from 'gatsby-link';
import * as siteMap from '../../siteMap';

var classNames = require('classnames');

let getTabClassName = (tab, docPath) => {

    const   key = docPath.split("/")[2];

    const active = tab.key === key;

    return classNames({
        [compStyles.hcaTab]: true,
        [compStyles.active]: active
    });
};

const TabNav = ({docPath}) => (
        <div className={compStyles.hcaTabs}>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaTabList}>
                    {siteMap.getTabs(docPath).map((tab, i) => <div key={i} className={getTabClassName(tab, docPath)}><Link to={tab.key}>{tab.name}</Link></div>)}
                </div>
            </div>
        </div>
);

export default TabNav;
