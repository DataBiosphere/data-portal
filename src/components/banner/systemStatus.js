/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal system status component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as fontStyles from "../../styles/fontsize.module.css";
import * as globalStyles from "../../styles/global.module.css";
import * as compStyles from "./systemStatus.module.css";

function SystemStatus() {
  return (
    <div className={compStyles.systemStatus}>
      <div
        className={classNames(
          globalStyles.bannerWrapper,
          compStyles.systemStatusWrapper
        )}
      >
        <i className={classNames("material-icons", fontStyles.bgDark)}>
          warning
        </i>
        <p className={classNames(fontStyles.s, fontStyles.bgDark)}>
          <span>
            One or more of the systems composing the HCA DCP is currently
            unavailable.{" "}
          </span>
          <span>
            <span>Please try again later</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SystemStatus;
