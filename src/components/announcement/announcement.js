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

class Announcement extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <div className={compStyles.announcement}>
                <p className={fontStyles.m}>
                    {children}
                </p>
            </div>
        );
    }
}

export default Announcement;
