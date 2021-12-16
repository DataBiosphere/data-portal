/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar tools component.
 */

// Core dependencies
import React, { ReactNode } from "react";

// Styles
import { toolbarTools } from "./toolbarTools.module.css";

interface Props {
  children: ReactNode;
}

export default function ToolbarTools({ children }: Props): JSX.Element {
  return <div className={toolbarTools}>{children}</div>;
}
