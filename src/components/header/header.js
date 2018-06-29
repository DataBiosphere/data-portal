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

// App dependencies
import HeaderTabNav from "../headerTabNav/headerTabNav";

// Images
import headerLogo from "../../../images/logo/logo-hca.png";

const classNames = require('classnames');

class Header extends React.Component {

    constructor() {
        super();
        this.state = {showNav: false, tabId: null};
        this.clearActiveLink = this.clearActiveLink.bind(this);
        this.setActiveLink = this.setActiveLink.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    clearActiveLink = () => {
        this.setState({tabId: null})
    };

    getHeaderClassName = () => {

        const browser = typeof window !== "undefined";
        let homePage = browser && window.location.href.split("/")[3];

        if (homePage) {
            return classNames({
                [compStyles.navBar]: true
            });
        }
        return classNames({
            [compStyles.hcaHeader]: true,
            [compStyles.navBar]: true
        });
    };

    setActiveLink = (activeLink) => {
        this.setState({tabId: activeLink})
    };

    toggleMenu = () => {
        this.setState({showNav: !this.state.showNav})
    };

    render() {
        return (
            <div className={this.getHeaderClassName()}>
                <div className={compStyles.wrapper}>
                    <Link to="/" className={compStyles.logo}><img src={headerLogo}/></Link>
                    {this.state.showNav ?
                        <div className={classNames(compStyles.links, compStyles.small)}>
                            <a href="https://explore.dev.data.humancellatlas.org" onClick={this.toggleMenu}>
                                <span>Explore</span>
                                <span>Search for data in the HCA</span>
                            </a>
                            <Link activeClassName={compStyles.active} to="/analyze/portals/visualization-portals"
                                  onClick={this.toggleMenu}>
                                <span>Analyze</span>
                                <span>Find a list of Apps</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/contribute/overview/overview"
                                  onClick={this.toggleMenu}>
                                <span>Contribute</span>
                                <span>Submit your data to the HCA</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/learn/overview/overview"
                                  onClick={this.toggleMenu}>
                                <span>Learn</span>
                                <span>Find user guides and how-to’s here</span>
                            </Link>
                            <Link activeClassName={compStyles.active}
                                  to="/build/development-guides/development-guides-overview" onClick={this.toggleMenu}>
                                <span>Build</span>
                                <span>Find developer guides and API docs</span>
                            </Link>
                            <Link to="/about/overview/overview" activeClassName={compStyles.active}
                                  className={compStyles.about} onClick={this.toggleMenu}>About</Link>
                        </div> : null}
                    <div className={classNames(compStyles.links)} ref={(div) => this.links = div}>
                        <a href="https://explore.dev.data.humancellatlas.org">
                            <span>Explore</span>
                        </a>
                        <div id="linkAnalyze" onMouseEnter={(e) => this.setActiveLink(0)} onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/analyze/portals/visualization-portals">
                                <span>Analyze</span>
                            </Link>
                            {this.state.tabId === 0 ? <HeaderTabNav section={"/analyze"}/> : null }
                        </div>
                        <div id="linkContribute" onMouseEnter={(e) => this.setActiveLink(1)} onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/contribute/overview/overview">
                                <span>Contribute</span>
                            </Link>
                            {this.state.tabId === 1 ? <HeaderTabNav section={"/contribute"}/> : null }
                        </div>
                        <div id="linkLearn" onMouseEnter={(e) => this.setActiveLink(2)} onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active} to="/learn/overview/overview">
                                <span>Learn</span>
                            </Link>
                            {this.state.tabId === 2 ? <HeaderTabNav section={"/learn"} rightAlign={true}/> : null }
                        </div>
                        <div id="linkBuild" onMouseEnter={(e) => this.setActiveLink(3)} onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/build/development-guides/development-guides-overview">
                                <span>Build</span>
                            </Link>
                            {this.state.tabId === 3 ? <HeaderTabNav section={"/build"} rightAlign={true}/> : null }
                        </div>
                    </div>
                    <Link to="/about/overview/overview" activeClassName={compStyles.active}
                          className={compStyles.about}>About</Link>
                    <div className={compStyles.menuDropDown} onClick={this.toggleMenu}>Menu</div>
                    {this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleMenu}/> : null}
                </div>
            </div>
        );
    }
}

export default Header;
