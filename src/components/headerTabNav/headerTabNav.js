/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header tab nav component.
 */

// Core dependencies
import compStyles from './headerTabNav.module.css';
import {navigateTo} from "gatsby-link";
import React from 'react';

// App dependencies
const classNames = require('classnames');
import * as siteMap from '../../siteMap';


class HeaderTabNav extends React.Component {

    constructor(props) {
        super(props);
    }

    getHeaderTabClassName = (right) => {
        {
            return classNames({
                [compStyles.headerTabs]: true,
                [compStyles.rightAlign]: right
            });
        }
    };

    getTabLink = (tab) => {

        if (tab.children[0]) {
            return tab.children[0].key;
        }
        else {
            return "/";
        }
    };

    render() {
        return (
            <div className={this.getHeaderTabClassName(this.props.rightAlign)}>
                {siteMap.getTabs(this.props.section).map((tab, i) => <div key={i}><p onClick={() => navigateTo(this.getTabLink(tab))}
                                                                          className={compStyles.s}>{tab.name}</p>
                </div>)}
            </div>
        );
    }
}

export default HeaderTabNav;
