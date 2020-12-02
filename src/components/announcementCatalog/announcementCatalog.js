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

function AnnouncementCatalog() {

    const dcp2ComingSoonPath = "/dcp-updates";
    const dcp2PreviewPath = `${process.env.GATSBY_EXPLORE_URL}projects?catalog=dcp2`;
    return (
        <Announcement>
            <span className={compStyles.catalog}>
                <span><strong>Update: </strong>A preview of the HCA DCP 2.0 data is now available.</span>
                <span>
                    <a href={dcp2PreviewPath}>View DCP 2.0 Data Preview</a>
                    <span>|</span>
                    <Link to={dcp2ComingSoonPath}>Learn More</Link>
                </span>
            </span>
        </Announcement>
    );
}

export default AnnouncementCatalog;
