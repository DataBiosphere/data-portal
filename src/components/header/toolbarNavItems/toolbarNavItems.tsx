/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar nav items component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ToolbarNavItem, {
  NavItem,
  ToggleMenuFn,
} from "../toolbarNavItem/toolbarNavItem";

interface Props {
  lungmap?: boolean;
  navItems: NavItem[];
  toggleMenu: ToggleMenuFn;
}

export default function ToolbarNavItems({
  lungmap = false,
  navItems,
  toggleMenu,
}: Props): JSX.Element {
  return (
    <>
      {navItems.map((navItem) => (
        <ToolbarNavItem
          key={navItem.path}
          lungmap={lungmap}
          navItem={navItem}
          toggleMenu={toggleMenu}
        />
      ))}
    </>
  );
}
