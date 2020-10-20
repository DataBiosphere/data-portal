/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal environment system status component.
 */

// Core dependencies
import React from "react";

// Styles
import fontStyles from "../../styles/fontsize.module.css";
import globalStyles from "../../styles/global.module.css";
import compStyles from "./systemStatus.module.css";
import * as SystemStatusService from "../../utils/system-status.service";

let classNames = require("classnames");

function SystemStatus() {

    const systems = SystemStatusService.getSystems();
    const systemEnvironment = SystemStatusService.getSystemEnvironment();

    const Environment = (props) => {
        const {environment, systemName} = props,
            {health_check_id} = environment;
        const imgService = `${process.env.GATSBY_SYSTEM_STATUS_URL}service/${health_check_id}.svg`;
        const imgAvailability = `${process.env.GATSBY_SYSTEM_STATUS_URL}availability/${health_check_id}.svg`;
        return (
            <div className={classNames(fontStyles.xs, compStyles.systemStatus)}>
                <span>{systemName}</span>
                <span><img src={imgService} alt={"service"}/></span>
                <span><img src={imgAvailability} alt={"availability"}/></span>
            </div>
        )
    };

    const System = (props) => {
        const {system} = props,
            {environments, system_name} = system;
        return (
            environments.map((environment, e) =>
                <Environment key={e} environment={environment} systemName={system_name}/>)
        )
    };

    return (
        <>
        <h1 className={globalStyles.md}>Environment - {systemEnvironment}</h1>
        <div className={compStyles.system}>
            <div className={classNames(fontStyles.m, compStyles.label)}>
                <span>System Name</span>
                <span>Status</span>
                <span>Availability</span>
            </div>
            {systems.map((system, s) => <System key={s} system={system}/>)}
        </div>
        </>
    );
}

export default SystemStatus;
