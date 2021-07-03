/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema no required properties component.
 * Renders when the "Show required fields only" checkbox is true and the schema has no required fields to display.
 */

// Core dependencies
import React from 'react'

// Styles
import compStyles from './metadataSchemaNoRequiredProperties.module.css'
import fontStyles from '../../../styles/fontsize.module.css'

class MetadataSchemaNoRequiredProperties extends React.Component {
  render() {
    return (
      <span className={compStyles.noResults}>
        <p className={fontStyles.s}>
          There are no required properties for this module.
        </p>
      </span>
    )
  }
}

export default MetadataSchemaNoRequiredProperties
