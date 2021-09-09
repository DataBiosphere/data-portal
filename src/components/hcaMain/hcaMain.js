/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal main [content] component.
 * Wraps around back pages and markdown templates (content) and provides the title and tab navigation.
 */

// Core dependencies
import React from "react";

// App dependencies
import HCAContent from "../hcaContent/hcaContent";
import MetadataSearch from "../metadata/metadataSearch/metadataSearch";
import Section from "../section/section";
import Tabs from "../tabs/tabs";

// Styles
import * as compStyles from "./hcaMain.module.css";
import * as globalStyles from "../../styles/global.module.css";

function HCAMain(props) {
  const {
      activeLocation,
      children,
      docPath,
      homeTab,
      metadataContent,
      nav,
      onHandleSiteScroll,
      sectionTitle
    } = props,
    { label, links, secondaryTabs, section, tabKey, tabs } = nav || {};
  const showMetadataSearch = docPath ? docPath.startsWith("/metadata") : false;

  return (
    <div className={globalStyles.pageWrapper}>
      <Section section={section} sectionTitle={sectionTitle} />
      {showMetadataSearch ? (
        <MetadataSearch onHandleSiteScroll={onHandleSiteScroll} />
      ) : null}
      <Tabs homeTab={homeTab} tabs={tabs} />
      {metadataContent ? <Tabs secondary tabs={secondaryTabs} /> : null}
      <div className={compStyles.main}>
        <div className={globalStyles.wrapper}>
          <HCAContent
            activeLocation={activeLocation}
            docPath={docPath}
            label={label}
            links={links}
            metadataContent={metadataContent}
            tabKey={tabKey}
          >
            {children}
          </HCAContent>
        </div>
      </div>
    </div>
  );
}

export default HCAMain;
