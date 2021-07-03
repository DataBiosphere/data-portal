/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field description component.
 */

// Core dependencies
import React from 'react'
import Linkify from 'react-linkify'

// Styles
import fontStyles from '../../../styles/fontsize.module.css'

const classNames = require('classnames')

function MetadataSchemaPropertyFieldDescription(props) {
  const { font, property } = props,
    { description } = property
  const classNameFontStyle = classNames({ [fontStyles[font]]: !!font })

  return (
    <Linkify>
      <span className={classNameFontStyle}>{description}</span>
    </Linkify>
  )
}

export default MetadataSchemaPropertyFieldDescription
