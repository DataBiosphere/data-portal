/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal attributions component.
 */

// Core dependencies
import React from "react";

// Images
import favicon from "../../../images/favicon/favicon.png";

// Styles
import * as compStyles from "./attributions.module.css";

class Attributions extends React.Component {
  render() {
    return (
      <div className={compStyles.attributions}>
        <img className={compStyles.mosaic} src={favicon} alt="Mosaic" />
        <span>
          The mosaic ball is a trademark of the Human Cell Atlas consortium.
        </span>
      </div>
    );
  }
}

export default Attributions;
