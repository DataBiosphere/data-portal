/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property component.
 */

// Core dependencies
import React, { useContext, useState } from 'react'

// App dependencies
import ContextMetadataDisplaying from '../contextMetadataDisplaying/contextMetadataDisplaying'
import InternalLink from '../../internal-link/internalLink'
import MetadataRequired from '../metadataRequired/metadataRequired'
import MetadataSchemaPropertyFieldDataType from '../metadataSchemaPropertyFieldDataType/metadataSchemaPropertyFieldDataType'
import MetadataSchemaPropertyFieldDescription from '../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription'
import MetadataSchemaPropertyFieldExample from '../metadataSchemaPropertyFieldExample/metadataSchemaPropertyFieldExample'
import MetadataSchemaPropertyFieldFriendlies from '../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies'
import MetadataSchemaPropertyFieldGraphRestriction from '../metadataSchemaPropertyFieldGraphRestriction/metadataSchemaPropertyFieldGraphRestriction'
import MetadataSchemaPropertyFieldLabel from '../metadataSchemaPropertyFieldLabel/metadataSchemaPropertyFieldLabel'
import MetadataSchemaPropertyFieldPath from '../metadataSchemaPropertyFieldPath/metadataSchemaPropertyFieldPath'
import MetadataSchemaPropertyPanel from '../metadataSchemaPropertyPanel/metadataSchemaPropertyPanel'
import MetadataSchemaPropertyPanelBundle from '../metadataSchemaPropertyPanelBundle/metadataSchemaPropertyPanelBundle'

function MetadataSchemaProperty(props) {
  const { property } = props,
    { anchor, propertyFriendlies, _ref, urlTo } = property || {}
  const { highlightValue } = useContext(ContextMetadataDisplaying)
  const [active, setActive] = useState(false)
  const highlighter = highlightValue === urlTo
  const secondary = !!_ref && propertyFriendlies
  const tertiary = secondary ? propertyFriendlies.length > 2 : false

  const onMouseEnter = () => {
    setActive(true)
  }

  const onMouseLeave = () => {
    setActive(false)
  }

  return (
    <MetadataSchemaPropertyPanel
      border
      highlighter={highlighter}
      identifier={anchor}
      secondary={secondary}
      tertiary={tertiary}
    >
      <MetadataSchemaPropertyPanelBundle>
        {secondary ? (
          <MetadataSchemaPropertyFieldFriendlies property={property}>
            <InternalLink anchor={anchor} relative />
          </MetadataSchemaPropertyFieldFriendlies>
        ) : (
          <MetadataSchemaPropertyFieldLabel property={property}>
            <InternalLink anchor={anchor} relative />
          </MetadataSchemaPropertyFieldLabel>
        )}
        <MetadataRequired property={property} />
      </MetadataSchemaPropertyPanelBundle>
      <MetadataSchemaPropertyPanelBundle
        onHandleMouseEnter={() => onMouseEnter()}
        onHandleMouseLeave={() => onMouseLeave()}
      >
        {secondary ? null : (
          <MetadataSchemaPropertyFieldPath
            active={active}
            property={property}
            wrap
          />
        )}
        <span>
          <MetadataSchemaPropertyFieldDataType property={property} />
          <MetadataSchemaPropertyFieldDescription
            font={'s'}
            property={property}
          />
          <span> </span>
          <MetadataSchemaPropertyFieldExample font={'s'} property={property} />
        </span>
        <MetadataSchemaPropertyFieldGraphRestriction property={property} />
      </MetadataSchemaPropertyPanelBundle>
    </MetadataSchemaPropertyPanel>
  )
}

export default MetadataSchemaProperty
