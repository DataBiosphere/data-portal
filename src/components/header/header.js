/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';
import compStyles from './header.module.css';

// Images
import headerLogo from "../../../images/logo/logo-hca.png";

const classNames = require('classnames');

class Header extends React.Component {

    constructor() {
        super();
        this.state = { showNav: false };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu = (isHomePage) => {
        this.setState({showNav: !this.state.showNav })
    };

    getHeaderClassName = () => {

        let isHomePage = window.location.href.split("/")[3];

        if (isHomePage) {
            return classNames({
                [compStyles.navBar]: true
            });
        }
        return classNames({
            [compStyles.hcaHeader]: true,
            [compStyles.navBar]: true
        });
    };

    render() {
        return (
            <div className={this.getHeaderClassName(2)}>
                <div className={compStyles.wrapper}>
                    <Link to="/" className={compStyles.logo}><img src={headerLogo}/></Link>
                    {this.state.showNav ?
                        <div className={classNames(compStyles.links, compStyles.small)}>
                            <a href="https://explore.dev.data.humancellatlas.org" onClick={this.toggleMenu}>
                                <span>Explore</span>
                                <span>Search for data in the HCA</span>
                            </a>
                            <Link activeClassName={compStyles.active} to="/analyze/portals/visualization-portals" onClick={this.toggleMenu}>
                                <span>Analyze</span>
                                <span>Find a list of Apps</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/contribute/overview/overview" onClick={this.toggleMenu}>
                                <span>Contribute</span>
                                <span>Submit your data to the HCA</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/learn/overview/overview" onClick={this.toggleMenu}>
                                <span>Learn</span>
                                <span>Find user guides and how-to’s here</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/build/development-guides/development-guides-overview" onClick={this.toggleMenu}>
                                <span>Build</span>
                                <span>Find developer guides and API docs</span>
                            </Link>
                        </div> : null}
                    <div className={classNames(compStyles.links)}>
                        <a href="https://explore.dev.data.humancellatlas.org">
                            <span>Explore</span>
                        </a>
                        <Link activeClassName={compStyles.active} to="/analyze/portals/visualization-portals">
                            <span>Analyze</span>
                        </Link>
                        <Link activeClassName={compStyles.active} to="/contribute/overview/overview">
                            <span>Contribute</span>
                        </Link>
                        <Link activeClassName={compStyles.active} to="/learn/overview/overview">
                            <span>Learn</span>
                        </Link>
                        <Link activeClassName={compStyles.active} to="/build/development-guides/development-guides-overview">
                            <span>Build</span>
                        </Link>
                    </div>
                    <div className={compStyles.userDropDown}>Alex S.</div>
                    <div className={compStyles.menuDropDown} onClick={this.toggleMenu}>Menu</div>
                    {this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleMenu}/> : null}
                </div>
            </div>
        );
    }
}

export default Header;
