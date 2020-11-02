/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating system status functionality.
 */

// App dependencies
import * as EnvironmentService from "./environment/environment.service";
import {SystemStatusQuery} from "../hooks/system-status-query";

/**
 * Returns the name of the current environment.
 *
 * @returns {*}
 */
export function getSystemEnvironment() {

    const currentEnv = EnvironmentService.getCurrentEnvironment();

    if ( currentEnv === "LOCAL" ) {

        return "DEV";
    }

    return currentEnv;
}

/**
 * Return system status' for the current environment.
 *
 * @returns {*}
 */
export function getSystems() {

    const systemsQuery = SystemStatusQuery();

    if ( systemsQuery ) {

        const systems = systemsQuery[0].systems;

        if ( systems ) {

            return systems.reduce((accum, system) => {

                /* Filter out all other environments that do not match the current environment. */
                /* Return the system only if the environment exists. */
                const applicableEnvironments = system.environments.filter(environment =>
                    EnvironmentService.isCurrentEnvironment(environment.name.toUpperCase(), true));

                if ( applicableEnvironments.length ) {

                    accum.push({...system, environments: applicableEnvironments});
                }

                return accum;
            }, []);
        }
    }

    return [];
}
