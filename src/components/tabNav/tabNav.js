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

const classNames = require('classnames');

const getTabClassName = (tab, docPath) => {

    const   key = docPath.split("/")[2];

    const active = tab.key === key;

    return classNames({
        [compStyles.hcaTab]: true,
        [compStyles.active]: active
    });
};

const getLinkForTab = (tab) => {

    if (tab.children[0]) {
        return tab.children[0].key;
    }
    else {
        return "/";
    }
};


const TabNav = ({docPath, homeTab, noTab}) => (
        <div className={compStyles.hcaTabs}>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaTabList}>
                    {homeTab ? <div className={compStyles.hcaBackTab}><Link to="/"><i className='material-icons'>keyboard_arrow_left</i><span>Home</span></Link></div> : noTab ? <div className={compStyles.hcaTab}></div> : siteMap.getTabs(docPath).map((tab, i) => <div key={i} className={getTabClassName(tab, docPath)}><Link to={getLinkForTab(tab)}>{tab.name}</Link></div>)}
                </div>
            </div>
        </div>
);

export default TabNav;
