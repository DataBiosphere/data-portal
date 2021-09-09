/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal DCP 2 announcement component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import Announcement from "../announcement/announcement";
import * as DPGTMService from "../../utils/dp-gtm/dp-gtm.service";

// Styles
import * as compStyles from "./announcementCatalog.module.css";

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
  const dcp2Path = `${process.env.GATSBY_EXPLORE_URL}projects`;
  return (
    <Announcement>
      <span className={compStyles.catalog}>
        <span>
          <strong>Update: </strong>The{" "}
          <a href={dcp2Path} onClick={() => trackCatalogViewed("dcp2")}>
            DCP 2.0 Data View
          </a>{" "}
          is now available.
        </span>
        <span>
          <span>|</span>
          <Link to={dcp2ComingSoonPath}>Learn More</Link>
        </span>
      </span>
    </Announcement>
  );
}

export default AnnouncementCatalog;
