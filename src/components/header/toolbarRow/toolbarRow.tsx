/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar nav component.
 */

// Core dependencies
import React, { ReactNode } from "react";

// Styles
import { toolbarRow } from "./toolbarRow.module.css";

interface Props {
  children: ReactNode;
}

export default function ToolbarRow({ children }: Props): JSX.Element {
  return <div className={toolbarRow}>{children}</div>;
}
