import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header as HeaderProps } from "./common/entities";
import Content from "./components/content/content";
import HeaderLogo from "./components/logo/header-logo";
import NavLinks from "./components/nav-links/nav-links";
import SearchBar from "./components/search/components/search-bar/search-bar";
import Search from "./components/search/search";
import Socials from "./components/socials/socials";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";
import { Header as AppBar } from "./header.styles";

// Template variables
export const HEADER_HEIGHT = 56;

interface Props {
  header: HeaderProps;
  searchPath: string;
}

export default function Header({ header, searchPath }: Props): JSX.Element {
  const {
    authenticationEnabled,
    logo,
    navLinks,
    searchEnabled,
    slogan,
    socials,
  } = header;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const desktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP
  );

  /**
   * Opens search bar.
   */
  const openSearch = (): void => {
    setSearchOpen(true);
  };

  /**
   * Closes menu.
   */
  const closeMenu = (): void => {
    setDrawerOpen(false);
  };

  /**
   * Closes search bar.
   */
  const closeSearch = (): void => {
    setSearchOpen(false);
  };

  // Set drawer open state to false on change of media breakpoint from mobile to desktop.
  useEffect(() => {
    if (desktop) {
      setDrawerOpen(false);
    }
  }, [desktop]);

  return (
    <AppBar elevation={1} position="sticky">
      <Toolbar sx={{ gap: 4, height: HEADER_HEIGHT }} variant="dense">
        {/* Logo */}
        <HeaderLogo logo={logo} />
        <Content
          desktop={desktop}
          drawerOpen={drawerOpen}
          modalPosition={HEADER_HEIGHT}
          onDrawerClose={(): void => setDrawerOpen(false)}
        >
          {/* Slogan divider */}
          {slogan && desktop && (
            <Divider orientation="vertical" sx={{ maxHeight: 32 }} />
          )}
          {/* Slogan */}
          {slogan && (
            <Typography
              component="div"
              sx={
                desktop
                  ? {
                      fontFamily: "Inter",
                      fontSize: 12,
                      lineHeight: "18px",
                      maxWidth: 180,
                    }
                  : { px: 6, py: 2 }
              }
              variant={desktop ? undefined : "text-body-400"}
            >
              {slogan}
            </Typography>
          )}
          {/* Nav links */}
          <NavLinks center links={navLinks} />
          {/* Socials */}
          <Socials
            buttonSize={desktop ? "small" : "xlarge"}
            socials={socials}
            sx={{
              gap: desktop ? 2 : 4,
              px: desktop ? undefined : 4,
              py: desktop ? undefined : 2,
            }}
          />
        </Content>
        {/* Actions */}
        {(searchEnabled || authenticationEnabled || !desktop) && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: { desktop: "none", mobile: 1 },
              gap: { desktop: 2, mobile: 3 },
              justifyContent: "flex-end",
            }}
          >
            {/* Search */}
            {searchEnabled && <Search openSearchFn={openSearch} />}
            <SearchBar
              closeMenuFn={closeMenu}
              closeSearchFn={closeSearch}
              modalPosition={HEADER_HEIGHT}
              searchOpen={searchOpen}
              searchPath={searchPath}
            />
            {/* Menu */}
            {!desktop && (
              <IconButton
                aria-label="drawer"
                color="ink"
                onClick={(): void => setDrawerOpen((open) => !open)}
              >
                {drawerOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
              </IconButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
