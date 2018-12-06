/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';
import * as siteMap from '../../siteMap';

// Styles
import compStyles from './nav.module.css';
import fontStyles from "../../styles/fontsize.module.css";
const classNames = require('classnames');

let active;
let expanded;
let initialShowNav = false;
let tab;

const getNavClassName = (docPath, nav) => {

    const key = docPath.split("/")[3];
    active = nav.key === docPath;
    expanded = (key === nav.key.split("/")[3] && nav.children);

    return classNames({
        [compStyles.expanded]: expanded,
        [compStyles.selected]: active
    });
};

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showNav: initialShowNav};
        this.getTab();
        this.toggleNav = this.toggleNav.bind(this);
    }

    getTab = () => {

        if (tab !== this.props.docPath.split("/")[2]) {
            this.state.showNav = false;
            tab = this.props.docPath.split("/")[2]
        }
    };

    toggleNav = () => {

        // Navigation closes when new tab selected
        this.getTab();

        // Toggle the navigation open/closed
        this.setState({showNav: !this.state.showNav});

        if (this.state.showNav) {
            initialShowNav = false;
        }
        else {
            initialShowNav = true;
        }
    };

    render() {
        return (
            <div className={compStyles.hcaNav}>
                <ul className={compStyles.hcaSideNav}>
                    {siteMap.getNav(this.props.docPath).map((p, i) =>
                            <div key={i}>
                                <li className={getNavClassName(this.props.docPath, p)} key={i}><Link
                                    to={siteMap.getPath(p.key)}>{p.name}</Link></li>
                                {p.children && expanded ?
                                    <ul>
                                        {p.children.map((c, j) => <li className={getNavClassName(this.props.docPath, c)}
                                                                      key={j}><Link
                                            to={siteMap.getPath(c.key)}>{c.name}</Link></li>)}
                                    </ul> : null}
                            </div>)}
                </ul>
                <ul className={compStyles.hcaSideNav}>
                    <li className={compStyles.select} onClick={this.toggleNav}>
                        <span>Please select</span><i className='material-icons'>keyboard_arrow_down</i>
                    </li>
                    {this.state.showNav ?
                        siteMap.getNav(this.props.docPath).map((p, i) =>
                            <div key={i}>
                                <li className={getNavClassName(this.props.docPath, p)} key={i}><Link
                                    to={siteMap.getPath(p.key)}>{p.name}</Link></li>
                                {p.children && expanded ?
                                    <ul>
                                        {p.children.map((c, j) => <li className={getNavClassName(this.props.docPath, c)}
                                                                      key={j}><Link
                                            to={siteMap.getPath(c.key)}>{c.name}</Link></li>)}
                                    </ul> : null}
                            </div>) : null}
                </ul>
            </div>
        );
    }
}

export default Nav;
