/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal announcement component, displayed under header.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./announcement.module.css";
import fontStyles from "../../styles/fontsize.module.css";

let classNames = require("classnames");

class Announcement extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <div className={classNames(compStyles.announcement, fontStyles.s)}>
                <span>{children}</span>
            </div>
        );
    }
}

export default Announcement;
