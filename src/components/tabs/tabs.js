/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tabs component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tab from "../tab/tab";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./tabs.module.css"

const classNames = require("classnames");

class TabNav extends React.Component {

    render() {
        const {homeTab, secondary, tabs} = this.props;
        const classNamesTabs = classNames(compStyles.hcaTabs, {[compStyles.secondary]: secondary});
        const classNamesWrappers = classNames(globalStyles.wrapper, compStyles.wrapper);
        return (
            <div className={classNamesTabs}>
                <div className={classNamesWrappers}>
                    <div className={compStyles.tabs}>
                        {homeTab ? <Tab back tab={{active: false, name: "Home", path: "/"}}/> : null}
                        {tabs ? tabs.map((tab, t) => <Tab key={t} secondary={secondary} tab={tab}/>) : <Tab/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default TabNav;
