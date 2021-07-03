/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata toggle required fields component.
 */

// Core dependencies
import React, { useContext } from 'react'

// App dependencies
import Checkbox from '../../checkbox/checkbox'
import ContextMetadataDisplaying from '../contextMetadataDisplaying/contextMetadataDisplaying'

// Styles
import compStyles from './metadataToggleRequiredFields.module.css'

function MetadataToggleRequiredFields() {
  const { showAllMetadata, onHandleToggleRequiredFields } = useContext(
    ContextMetadataDisplaying
  )
  const label = 'Show required fields only'

  return (
    <span className={compStyles.toggle}>
      <Checkbox
        checked={!showAllMetadata}
        clickAction={onHandleToggleRequiredFields}
        label={label}
        value={'showMetadata'}
      />
    </span>
  )
}

export default MetadataToggleRequiredFields
