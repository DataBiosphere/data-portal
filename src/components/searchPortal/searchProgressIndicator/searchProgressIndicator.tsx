/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search progress indicator component.
 */

// Core dependencies
import React from "react";

// Styles
import { progressBar } from "./searchProgressIndicator.module.css";

export default function SearchProgressIndicator(): JSX.Element {
  return <div className={progressBar} />;
}
