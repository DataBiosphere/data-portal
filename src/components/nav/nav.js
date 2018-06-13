/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav component.
 */

// Core dependencies
import compStyles from './nav.module.css'
import Link from 'gatsby-link';
import React from 'react';
import * as siteMap from '../../siteMap';

var classNames = require('classnames');

let getListClassName = () => {
    return classNames({
        [compStyles.expanded]: true,
        [compStyles.selected]: false
    })
};

const Nav = ({docPath}) => (
                <ul className={compStyles.hcaContentSideNav}>
                    {siteMap.getNav(docPath).map((p, i) =>
                        <div key={i}>
                            <li key={i}><Link to={p.key}>{p.name}</Link></li>
                            {p.children ?
                            <ul>
                            {p.children.map((c, j) => <li key={j}>{c.name}</li>)}
                            </ul> : null}
                        </div>)}
                </ul>
);

export default Nav;
