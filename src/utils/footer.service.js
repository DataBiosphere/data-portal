/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating footer links.
 */

// App dependencies
import * as EnvironmentService from "./environment/environment.service";
import {FooterQuery} from "../hooks/footer-query";

/**
 * Returns footer links from the footer hook query.
 *
 * @returns {boolean}
 */
export function getFooterLinks() {

    return filterFooterLinks(FooterQuery());
}

/**
 * Returns a filtered list of footer links.
 * All footer links are returned.
 * The exception being that system status is removed when the gatsby content version
 * is equivalent to version 2 i.e. the new “cgl” environment.
 *
 * @returns {boolean}
 */
function filterFooterLinks(links) {

    if ( !links ) {

        return [];
    }

    return links.filter(link => {

        const {path} = link;

        if ( path === "/status" ) {

            return !EnvironmentService.isCGLEnvironment();
        }

        return true;
    })
}
