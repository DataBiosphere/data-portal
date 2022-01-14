/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React from "react";

// App dependencies
import { HeaderQuery } from "../../hooks/header-query";
import SearchBar from "../searchPortal/searchBar/searchBar";
import SearchButton from "../searchPortal/searchButton/searchButton";
import ToolbarNav from "./toolbarNav/toolbarNav";
import ToolbarNavItems from "./toolbarNavItems/toolbarNavItems";
import ToolbarRow from "./toolbarRow/toolbarRow";
import ToolbarSocials from "./toolbarSocials/toolbarSocials";
import ToolbarTools from "./toolbarTools/toolbarTools";
import Config from "../../utils/config/config";

// Images
import headerLogo from "../../../images/logo/logo-hca.png";

// Styles
import { hamburger, hcaHeader, hero, logo } from "./header.module.css";

class Header extends React.Component {
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
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
    const { homePage, navItems } = this.props;
    const { navOpen, searchBarOpen, showHamburger } = this.state;
    const explore = {
      description: "Search for data in the HCA",
      headerName: null,
      name: "Explore",
      path: process.env.GATSBY_EXPLORE_URL || "/",
    };
    const navLinks = [explore, ...navItems];
    const socials = Config.hca.socials;

    return (
      <div
        className={classNames(hcaHeader, {
          [hero]: homePage,
        })}
      >
        <ToolbarRow>
          <Link className={logo} to="/">
            <img alt="HCA" src={headerLogo} />
          </Link>
          <ToolbarTools>
            <SearchButton toggleSearchBar={this.toggleSearchBar} />
            <SearchBar
              searchBarOpen={searchBarOpen}
              toggleSearchBar={this.toggleSearchBar}
            />
            {!showHamburger && socials && <ToolbarSocials socials={socials} />}
            <button className={hamburger} onClick={this.toggleMenu}>
              Menu
            </button>
          </ToolbarTools>
        </ToolbarRow>
        {(navOpen || !showHamburger) && (
          <ToolbarRow>
            <ToolbarNav>
              <ToolbarNavItems
                navItems={navLinks}
                toggleMenu={this.toggleMenu}
              />
              {showHamburger && socials && <ToolbarSocials socials={socials} />}
            </ToolbarNav>
          </ToolbarRow>
        )}
      </div>
    );
  }
}

export default (props) => {
  return <Header navItems={HeaderQuery()} {...props} />;
};
