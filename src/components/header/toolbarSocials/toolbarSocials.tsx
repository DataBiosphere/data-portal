/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toolbar socials component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Social } from "../../social/social";
import ToolbarSocial from "../toolbarSocial/toolbarSocial";

// Styles
import { socials as toolbarSocials } from "./toolbarSocials.module.css";

interface Props {
  socials: Social[];
}

function ToolbarSocials({ socials }: Props): JSX.Element {
  return (
    <div className={toolbarSocials}>
      {socials.map((social) => (
        <ToolbarSocial key={social.name} social={social} />
      ))}
    </div>
  );
}

export default ToolbarSocials;
