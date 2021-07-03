/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field label component.
 */

// Core dependencies
import React from 'react'

// Styles
import compStyles from './metadataSchemaPropertyFieldLabel.module.css'
import fontStyles from '../../../styles/fontsize.module.css'

const classNames = require('classnames')

function MetadataSchemaPropertyFieldLabel(props) {
  const { children, property } = props,
    { label } = property

  return (
    <span
      className={classNames(
        compStyles.propertyName,
        fontStyles.regular,
        fontStyles.s
      )}
    >
      {label}
      {children}
    </span>
  )
}

export default MetadataSchemaPropertyFieldLabel
