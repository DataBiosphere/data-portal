/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal DCP 2 announcement component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

// App dependencies
import Announcement from "../announcement/announcement";
import * as DPGTMService from "../../utils/dp-gtm/dp-gtm.service";

// Styles
import compStyles from "./announcementCatalog.module.css";

function AnnouncementCatalog() {

    /**
     * Track click on view catalog.
     *
     * @param catalog
     */
    const trackCatalogViewed = (catalog) => {

        DPGTMService.trackCatalogViewed(catalog);
    };

    const dcp2ComingSoonPath = "/dcp-updates";
    const dcp2Path = `${process.env.GATSBY_EXPLORE_URL}projects`;
    return (
        <Announcement>
            <span className={compStyles.catalog}>
                <span><strong>Update: </strong>The HCA DCP 2.0 data is now available.</span>
                <span>
                    <a href={dcp2Path} onClick={() => trackCatalogViewed('dcp2')}>View DCP 2.0 Data</a>
                    <span>|</span>
                    <Link to={dcp2ComingSoonPath}>Learn More</Link>
                </span>
            </span>
        </Announcement>
    );
}

export default AnnouncementCatalog;
