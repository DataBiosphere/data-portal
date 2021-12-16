/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * LungMAP Portal header component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ToolbarNav from "../header/toolbarNav/toolbarNav";
import ToolbarNavItems from "../header/toolbarNavItems/toolbarNavItems";
import ToolbarRow from "../header/toolbarRow/toolbarRow";
import ToolbarTools from "../header/toolbarTools/toolbarTools";
import SearchBar from "../searchPortal/searchBar/searchBar";
import SearchButton from "../searchPortal/searchButton/searchButton";

// Images
import headerLogo from "../../../images/lungmap/logo/logo-lungmap.png";

// Styles
import {
  hamburger,
  logo,
  lungmapHeader,
  wrapper,
} from "./header-lungmap.module.css";

class HeaderLungMAP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      showHamburger: false,
      searchBarOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
  }

  componentDidMount() {
    /* Init media query list. */
    this.mediaQueryList = window.matchMedia("(max-width: 839px)");

    /* Init state showHamburger; set to true with small viewport. */
    if (this.mediaQueryList.matches) {
      this.setState({ showHamburger: true });
    }
    this.mediaQueryList.addEventListener("change", this.onChangeMedia);
  }

  componentWillUnmount() {
    this.mediaQueryList.removeEventListener("change", this.onChangeMedia);
  }

  shouldComponentUpdate(prevState, nextState, nextContext) {
    return this.state !== nextState;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* When there is a state change to showing the hamburger the site should always be scrollable. */
    /* Resizing to larger viewport, the nav should remain open. */
    /* Resizing to a smaller viewport the nav should be closed, until toggled open. */
    if (prevState.showHamburger !== this.state.showHamburger) {
      this.props.onHandleSiteScroll(true);
      this.setState({ navOpen: !this.state.showHamburger });
    }
  }

  onChangeMedia = () => {
    this.setState({ showHamburger: this.mediaQueryList.matches });
  };

  toggleMenu = () => {
    if (this.state.showHamburger) {
      this.setState({ navOpen: !this.state.navOpen });
      this.props.onHandleSiteScroll(this.state.navOpen);
    }
  };

  toggleSearchBar = (open) => {
    this.setState({ searchBarOpen: open });
  };

  render() {
    const { navOpen, searchBarOpen, showHamburger } = this.state;
    const navItems = [
      {
        description: "Search for data in LungMAP",
        headerName: null,
        name: "Explore",
        path: process.env.GATSBY_EXPLORE_URL || "/",
      },
      {
        description: "Fields used to describe datasets in LungMAP",
        headerName: null,
        name: "Metadata",
        path: "/metadata",
      },
      {
        description: "APIs",
        headerName: null,
        name: "APIs",
        path: "/apis",
      },
    ];

    return (
      <div className={lungmapHeader}>
        <div className={wrapper}>
          <ToolbarRow>
            <a className={logo} href="https://lungmap.net/">
              <img alt="LungMAP" src={headerLogo} />
            </a>
            <ToolbarTools>
              <SearchButton lungmap toggleSearchBar={this.toggleSearchBar} />
              <SearchBar
                lungmap
                searchBarOpen={searchBarOpen}
                toggleSearchBar={this.toggleSearchBar}
              />
              <button className={hamburger} onClick={this.toggleMenu}>
                Menu
              </button>
            </ToolbarTools>
          </ToolbarRow>
          {(navOpen || !showHamburger) && (
            <ToolbarRow>
              <ToolbarNav>
                <ToolbarNavItems
                  lungmap
                  navItems={navItems}
                  toggleMenu={this.toggleMenu}
                />
              </ToolbarNav>
            </ToolbarRow>
          )}
        </div>
      </div>
    );
  }
}

export default HeaderLungMAP;
