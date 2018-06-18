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
import headerLogo from "../../../images/logo/hca-data-portal/logo-hca.png";

const classNames = require('classnames');

class Header extends React.Component {

    constructor() {
        super();
        this.state = { showNav: false };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu = () => {
        this.setState({showNav: !this.state.showNav })
    };

    render() {
        return (
            <div className={compStyles.navBar}>
                <div className={compStyles.wrapper}>
                    <Link to="/" className={compStyles.logo}><img src={headerLogo}/></Link>
                    {this.state.showNav ?
                        <div className={classNames(compStyles.links, compStyles.small)}>
                            <a href="https://explore.dev.data.humancellatlas.org" onClick={this.toggleMenu}>
                                <span>Explore</span>
                                <span>Search for data in the HCA</span>
                            </a>
                            <Link to="/analyze/portals/overview" onClick={this.toggleMenu}>
                                <span>Analyze</span>
                                <span>Find a list of Apps</span>
                            </Link>
                            <Link to="/contribute/overview/overview" onClick={this.toggleMenu}>
                                <span>Contribute</span>
                                <span>Submit your data to the HCA</span>
                            </Link>
                            <Link to="/learn/how-it-works/data-lifecycle" onClick={this.toggleMenu}>
                                <span>Learn</span>
                                <span>Find user guides and how-to’s here</span>
                            </Link>
                            <Link to="/build/development-guides/development-guides-overview" onClick={this.toggleMenu}>
                                <span>Build</span>
                                <span>Find developer guides and API docs</span>
                            </Link>
                        </div> : null}
                    <div className={classNames(compStyles.links)}>
                        <a href="https://explore.dev.data.humancellatlas.org">
                            <span>Explore</span>
                        </a>
                        <Link to="/analyze/portals/overview">
                            <span>Analyze</span>
                        </Link>
                        <Link to="/contribute/overview/overview">
                            <span>Contribute</span>
                        </Link>
                        <Link to="/learn/how-it-works/data-lifecycle">
                            <span>Learn</span>
                        </Link>
                        <Link to="/build/development-guides/development-guides-overview">
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
