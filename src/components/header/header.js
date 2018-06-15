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
import headerLogo from "../../../site/images/logo/hca-data-portal/logo-hca.png"

const classNames = require('classnames');

class Header extends React.Component {

    constructor() {
        super();
        this.state = { showNav: false };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav = () => {
        this.setState({showNav: !this.state.showNav })
    };

    render() {
        return (
            <div className={compStyles.navBar}>
                <div className={compStyles.wrapper}>
                    <div className={compStyles.logo}><img src={headerLogo}/></div>
                    {this.state.showNav ?
                        <div className={classNames(compStyles.links, compStyles.small)}>
                            <a href="https://explore.dev.data.humancellatlas.org" onClick={this.toggleNav}>
                                <span>Explore</span>
                                <span>Search for data in the HCA</span>
                            </a>
                            <Link to="/analyze/portals/visualization-portals" onClick={this.toggleNav}>
                                <span>Analyze</span>
                                <span>Find a list of Apps</span>
                            </Link>
                            <Link to="/" onClick={this.toggleNav}>
                                <span>Contribute</span>
                                <span>Submit your data to the HCA</span>
                            </Link>
                            <Link to="/learn/how-it-works/data-lifecycle" onClick={this.toggleNav}>
                                <span>Learn</span>
                                <span>Find user guides and how-to’s here</span>
                            </Link>
                            <Link to="/build/development-guides/pipeline-development-guide" onClick={this.toggleNav}>
                                <span>Build</span>
                                <span>Find developer guides and API docs</span>
                            </Link>
                        </div> : null}
                    <div className={classNames(compStyles.links)}>
                        <a href="https://explore.dev.data.humancellatlas.org">
                            <span>Explore</span>
                        </a>
                        <Link to="/analyze/portals/visualization-portals">
                            <span>Analyze</span>
                        </Link>
                        <Link to="/">
                            <span>Contribute</span>
                        </Link>
                        <Link to="/learn/how-it-works/data-lifecycle">
                            <span>Learn</span>
                        </Link>
                        <Link to="/build/development-guides/pipeline-development-guide">
                            <span>Build</span>
                        </Link>
                    </div>
                    <div className={compStyles.userDropDown}>Alex S.</div>
                    <div className={compStyles.menuDropDown} onClick={this.toggleNav}>Menu</div>
                    {this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleNav}/> : null}
                </div>
            </div>
        );
    }
}

export default Header;
