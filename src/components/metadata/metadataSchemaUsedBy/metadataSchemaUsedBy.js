/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema used by component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyPanel from "../metadataSchemaPropertyPanel/metadataSchemaPropertyPanel";
import MetadataSchemaPropertyPanelBundle from "../metadataSchemaPropertyPanelBundle/metadataSchemaPropertyPanelBundle";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

function MetadataSchemaUsedBy(props) {
  const { property } = props,
    { propertyPath } = property || {};
  const { onHandleNavigationHit } = useContext(ContextMetadataDisplaying);

  return (
    <MetadataSchemaPropertyPanel
      hover
      onHandleClick={() => onHandleNavigationHit(property)}
    >
      <MetadataSchemaPropertyPanelBundle>
        <MetadataSchemaPropertyFieldFriendlies property={property} />
      </MetadataSchemaPropertyPanelBundle>
      <MetadataSchemaPropertyPanelBundle>
        <MetadataSchemaPropertyWordWrapper
          font={"hcaCode"}
          word={propertyPath}
          wrap
        />
        <MetadataSchemaPropertyFieldDescription
          font={"xs"}
          property={property}
        />
      </MetadataSchemaPropertyPanelBundle>
    </MetadataSchemaPropertyPanel>
  );
}

export default MetadataSchemaUsedBy;
