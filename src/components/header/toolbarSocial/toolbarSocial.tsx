/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar social component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Social } from "../../social/social";

// Styles
import { social as headerSocial } from "./toolbarSocial.module.css";

interface Props {
  social: Social;
}

export default function ToolbarSocial({ social }: Props): JSX.Element {
  const { imageSrc, name, url } = social;

  return (
    <a className={headerSocial} href={url} rel="noopener" target="_blank">
      <img alt={name} src={imageSrc} />
    </a>
  );
}
