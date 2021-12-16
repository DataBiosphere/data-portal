/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar nav component.
 */

// Core dependencies
import React, { ReactNode } from "react";

// Styles
import { toolbarNav as nav } from "./toolbarNav.module.css";

interface Props {
  children: ReactNode;
}

export default function ToolbarNav({ children }: Props): JSX.Element {
  return <ul className={nav}>{children}</ul>;
}
