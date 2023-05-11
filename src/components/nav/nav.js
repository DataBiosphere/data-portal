/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import ClickHandler from "../clickHandler/clickHandler";
import MetadataOverline from "../metadata/metadataOverline/metadataOverline";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./nav.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";

// Template variables
let active;
let expanded;
let initialShowNav = false;
let tab;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNav: initialShowNav };
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    this.getTab();
  }

  getNavClassName = (nav) => {
    active = nav.active;
    expanded =
      nav.sLinks && nav.sLinks.length > 0
        ? nav.active || nav.sLinks.some((sLink) => sLink.active)
        : false;

    return classNames({
      [compStyles.expanded]: expanded,
      [compStyles.selected]: active,
    });
  };

  getTab = () => {
    const { tabKey } = this.props;

    if (tab !== tabKey) {
      this.setState({ showNav: false });
      tab = tabKey;
    }
  };

  isShowSideNav = () => {
    const { links } = this.props;

    if (links.length > 0) {
      const [firstLink] = links;

      if (links.length > 1) {
        return true;
      }

      return firstLink.sLinks && firstLink.sLinks.length > 0;
    }

    return false;
  };

  toggleNav = () => {
    // Toggle the navigation open/closed
    this.setState({ showNav: !this.state.showNav });

    initialShowNav = !this.state.showNav;
  };

  render() {
    const { label, links } = this.props,
      { showNav } = this.state;
    return (
      <div className={compStyles.hcaNav}>
        {label ? (
          <div className={compStyles.label}>
            <MetadataOverline semiBold>
              <span>{label}</span>
            </MetadataOverline>
          </div>
        ) : null}
        <ul className={compStyles.hcaSideNav} data-testid="page-navigation">
          {links.map((pLink, i) => (
            <div key={i}>
              <li className={this.getNavClassName(pLink)} key={i}>
                <Link to={pLink.path} className={fontStyles.navPrimary}>
                  {pLink.name}
                </Link>
              </li>
              {pLink.sLinks && expanded ? (
                <ul>
                  {pLink.sLinks.map((sLink, j) => (
                    <li className={this.getNavClassName(sLink)} key={j}>
                      <Link to={sLink.path} className={fontStyles.navSecondary}>
                        {sLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </ul>
        {this.isShowSideNav() ? (
          <ul className={compStyles.hcaSideNav}>
            <ClickHandler
              className={compStyles.select}
              clickAction={this.toggleNav}
              tag={"li"}
            >
              <span>Also in this section</span>
              <i className="material-icons">keyboard_arrow_down</i>
            </ClickHandler>
            {showNav
              ? links.map((pLink, i) => (
                  <div key={i}>
                    <ClickHandler
                      className={this.getNavClassName(pLink)}
                      clickAction={
                        pLink.sLinks
                          ? expanded
                            ? this.toggleNav
                            : null
                          : this.toggleNav
                      }
                      key={i}
                      tag={"li"}
                    >
                      <Link to={pLink.path} className={fontStyles.navPrimary}>
                        {pLink.name}
                      </Link>
                    </ClickHandler>
                    {pLink.sLinks && expanded ? (
                      <ul>
                        {pLink.sLinks.map((sLink, j) => (
                          <ClickHandler
                            className={this.getNavClassName(sLink)}
                            clickAction={this.toggleNav}
                            key={j}
                            tag={"li"}
                          >
                            <Link
                              className={fontStyles.navSecondary}
                              to={sLink.path}
                            >
                              {sLink.name}
                            </Link>
                          </ClickHandler>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))
              : null}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Nav;
