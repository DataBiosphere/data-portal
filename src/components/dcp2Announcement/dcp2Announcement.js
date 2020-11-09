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

class DCP2Announcement extends React.Component {

    render() {
        const dcp2ComingSoonPath = "/coming-soon-DCP-2-with-support-for-controlled-access-data";
        return (
            <Announcement>
                <strong>An important update for the HCA community:</strong> The HCA DCP is undergoing a major upgrade. <Link to={dcp2ComingSoonPath}>Read the announcement.</Link>
            </Announcement>
        );
    }
}

export default DCP2Announcement;
