/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// Images
import headerLogo from "../../../images/logo/logo-hca.png";

// Styles
import compStyles from "./header.module.css";
import fontStyles from "../../styles/fontsize.module.css";
import globalStyles from "../../styles/global.module.css";
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
                <div className={classNames(globalStyles.wrapper, compStyles.headerWrapper)}>
                    <Link to="/" className={compStyles.logo}><img src={headerLogo}/></Link>
                    {this.state.showNav ?
                        <div className={classNames(compStyles.links, compStyles.small)}>
                            <a href={process.env.GATSBY_EXPLORE_URL} onClick={this.toggleMenu}>
                                <span className={classNames(fontStyles.xs, compStyles.xs)}>Explore</span>
                                <span className={classNames(fontStyles.xxs, compStyles.xxs)}>Search for data in the HCA</span>
                            </a>
                            <Link activeClassName={compStyles.active} to="/contribute"
                                  onClick={this.toggleMenu}>
                                <span className={classNames(fontStyles.xs, compStyles.xs)}>Contribute</span>
                                <span className={classNames(fontStyles.xxs, compStyles.xxs)}>Submit your data to the HCA</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/analyze"
                                  onClick={this.toggleMenu}>
                                <span className={classNames(fontStyles.xs, compStyles.xs)}>Analyze</span>
                                <span className={classNames(fontStyles.xxs, compStyles.xxs)}>Find a list of Apps</span>
                            </Link>
                            <Link activeClassName={compStyles.active} to="/learn"
                                  onClick={this.toggleMenu}>
                                <span className={classNames(fontStyles.xs, compStyles.xs)}>Learn</span>
                                <span className={classNames(fontStyles.xxs, compStyles.xxs)}>Find user guides and how-to’s here</span>
                            </Link>
                            <Link to="/help" activeClassName={compStyles.active} className={classNames(fontStyles.xs, compStyles.help)} onClick={this.toggleMenu}>Help</Link>
                        </div> : null}
                    <div className={classNames(compStyles.links)} ref={(div) => this.links = div}>
                        <a href={process.env.GATSBY_EXPLORE_URL}>
                            <span className={compStyles.linkTo}>Explore</span>
                        </a>
                        <div id="linkContribute" onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/contribute" onMouseEnter={(e) => this.setActiveLink(1)}>
                                <span className={compStyles.linkTo}>Contribute</span>
                            </Link>
                        </div>
                        <div id="linkAnalyze" onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active}
                                  to="/analyze" onMouseEnter={(e) => this.setActiveLink(0)}>
                                <span className={compStyles.linkTo}>Analyze</span>
                            </Link>
                        </div>
                        <div id="linkLearn" onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
                            <Link activeClassName={compStyles.active} to="/learn" onMouseEnter={(e) => this.setActiveLink(2)} >
                                <span className={compStyles.linkTo}>Learn</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/help" activeClassName={compStyles.active} className={classNames(compStyles.help, fontStyles.s)}>Help</Link>
                    <div className={classNames(compStyles.menuDropDown, fontStyles.s)} onClick={this.toggleMenu}>Menu</div>
                    {this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleMenu}/> : null}
                </div>
            </div>
        );
    }
}

export default Header;
