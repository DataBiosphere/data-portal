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

// Styles
import compStyles from "./announcementCatalog.module.css";
import * as DPGTMService from "../../utils/dp-gtm/dp-gtm.service";

function AnnouncementCatalog() {

    /**
     * Track click on view catalog.
     *
     * @param catalog
     */
    const trackCatalogViewed = (catalog) => {

        DPGTMService.trackCatalogViewed(catalog);
    };

    const dcp2ComingSoonPath = "/what-is-the-dcp-20-data-preview";
    const dcp2PreviewPath = `${process.env.GATSBY_EXPLORE_URL}projects?catalog=dcp2`;
    return (
        <Announcement>
            <span className={compStyles.catalog}>
                <span><strong>Update: </strong>A preview of the HCA DCP 2.0 data is now available.</span>
                <span>
                    <a href={dcp2PreviewPath} onClick={() => trackCatalogViewed('dcp2')}>View DCP 2.0 Data Preview</a>
                    <span>|</span>
                    <Link to={dcp2ComingSoonPath}>Learn More</Link>
                </span>
            </span>
        </Announcement>
    );
}

export default AnnouncementCatalog;
