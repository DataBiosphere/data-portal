/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal system status component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

// App dependencies
import * as EnvironmentService from "../../utils/environment/environment.service";

// Styles
import fontStyles from "../../styles/fontsize.module.css";
import globalStyles from "../../styles/global.module.css";
import compStyles from "./systemStatus.module.css";

let classNames = require("classnames");

class SystemStatus extends React.Component {

    render() {
        const showStatusLink = !EnvironmentService.isV2();
        return (
            <div className={compStyles.systemStatus}>
                <div className={classNames(globalStyles.bannerWrapper, compStyles.systemStatusWrapper)}>
                    <i className={classNames("material-icons", fontStyles.bgDark)}>warning</i>
                    <p className={classNames(fontStyles.s, fontStyles.bgDark)}>
                        <span>One or more of the systems composing the HCA DCP is currently unavailable. </span>
                        <span>
                            <span>Please try again later</span>
                            {showStatusLink ?
                                <span>, or monitor the full system status <Link to="/status">here</Link>.</span> :
                                <span>.</span>}
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}

export default SystemStatus;
