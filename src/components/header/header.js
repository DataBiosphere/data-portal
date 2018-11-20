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

    constructor(props) {
        super(props);
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
        this.setState({showNav: !this.state.showNav});
        this.props.onMenuOpen(this.state.showNav);
    };

    render() {
        return (
            <div className={this.getHeaderClassName()}>
                <div className={compStyles.wrapper}>
                    <Link to="/" className={compStyles.logo}><img src={headerLogo}/></Link>
                    {this.state.showNav ?
                        <div className={classNames(compStyles.links, compStyles.small)}>
                            <a href={process.env.GATSBY_EXPLORE_URL} onClick={this.toggleMenu}>
                                <span>Explore</span>
                                <span>Search for data in the HCA</span>
                            </a>
                            <Link activeClassName={compStyles.active} to="/contribute/overview/overview"
                                  onClick={this.toggleMenu}>
                                <span>Contribute</span>
                                <span>Submit your data to the HCA</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/analyze/portals/visualization-portals"
                                  onClick={this.toggleMenu}>
                                <span>Analyze</span>
                                <span>Find a list of Apps</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/learn/userguides/accessing-data"
                                  onClick={this.toggleMenu}>
                                <span>Learn</span>
                                <span>Find user guides and how-to’s here</span>
                            </Link>
                            <Link to="/about/platform/dcp" activeClassName={compStyles.active}
                                  className={compStyles.about} onClick={this.toggleMenu}>About</Link>
                        </div> : null}
                    <div className={classNames(compStyles.links)} ref={(div) => this.links = div}>
                        <a href={process.env.GATSBY_EXPLORE_URL}>
                            <span>Explore</span>
                        </a>
                        <div id="linkContribute" onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/contribute/overview/overview" onMouseEnter={(e) => this.setActiveLink(1)}>
                                <span>Contribute</span>
                            </Link>
                        </div>
                        <div id="linkAnalyze" onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/analyze/portals/visualization-portals" onMouseEnter={(e) => this.setActiveLink(0)}>
                                <span>Analyze</span>
                            </Link>
                        </div>
                        <div id="linkLearn" onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active} to="/learn/userguides/accessing-data" onMouseEnter={(e) => this.setActiveLink(2)} >
                                <span>Learn</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/about/platform/dcp" activeClassName={compStyles.active}
                          className={compStyles.about}>About</Link>
                    <div className={compStyles.menuDropDown} onClick={this.toggleMenu}>Menu</div>
                    {this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleMenu}/> : null}
                </div>
            </div>
        );
    }
}

export default Header;
