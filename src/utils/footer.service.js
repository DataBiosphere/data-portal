/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating footer links.
 */

// App dependencies
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
 * Are all footer links are returned; however the system status will be filtered when
 * - the gatsby content version is equivalent to version 2 i.e. the new “cgl” environment and
 * - the path is "/status" (system status).
 *
 * @returns {boolean}
 */
function filterFooterLinks(links) {

    return links.filter(link => {

        const {path} = link;

        if ( path === "/status" ) {

            const contentVersion = process.env.GATSBY_CONTENT_VERSION;
            const cglEnvExists = Number(contentVersion) === 2;

            return !cglEnvExists;
        }
        return true;
    })
}
