/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tabs component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { PORTAL_URL } from "../../config/hca/config";
import Tab from "../tab/tab";

// Class name helper
import classNames from "classnames";

// Styles
import * as globalStyles from "../../styles/global.module.css";
import * as compStyles from "./tabs.module.css";

class TabNav extends React.Component {
  render() {
    const { homeTab, secondary, tabs } = this.props;
    const classNamesTabs = classNames(compStyles.hcaTabs, {
      [compStyles.secondary]: secondary,
    });
    const classNamesWrappers = classNames(
      globalStyles.wrapper,
      compStyles.wrapper
    );
    const tabsExist = tabs && tabs.length > 0;
    return (
      <div className={classNamesTabs}>
        <div className={classNamesWrappers}>
          <div className={compStyles.tabs}>
            {tabsExist ? (
              tabs.map((tab, t) => (
                <Tab key={t} secondary={secondary} tab={tab} />
              ))
            ) : homeTab ? (
              <Tab
                back
                tab={{ active: false, name: "Home", path: PORTAL_URL }}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default TabNav;
