/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar nav item component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React from "react";

// Styles
import {
  active,
  lungmap as darkTheme,
  subTitle,
  title,
  toolbarNavItem,
  toolbarNavLink,
} from "./toolbarNavItem.module.css";

export type ToggleMenuFn = () => void;

export interface NavItem {
  description: string;
  headerName?: string;
  name: string;
  path: string;
}

interface Props {
  lungmap: boolean;
  navItem: NavItem;
  toggleMenu: ToggleMenuFn;
}

export default function ToolbarNavItem({
  lungmap,
  navItem,
  toggleMenu,
}: Props): JSX.Element {
  const { description, headerName, name, path } = navItem;
  const internal = /^\/(?!\/)/.test(path);
  return (
    <li className={toolbarNavItem}>
      {internal ? (
        <Link
          activeClassName={active}
          className={classNames(toolbarNavLink, { [darkTheme]: lungmap })}
          partiallyActive={true}
          onClick={() => toggleMenu()}
          to={path}
        >
          <span className={title}>{headerName || name}</span>
          {description && <span className={subTitle}>{description}</span>}
        </Link>
      ) : (
        <a
          className={classNames(toolbarNavLink, { [darkTheme]: lungmap })}
          href={path}
        >
          <span className={title}>{headerName || name}</span>
          {description && <span className={subTitle}>{description}</span>}
        </a>
      )}
    </li>
  );
}
