/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema used by(s) component.
 */

// Core dependencies
import React from 'react'

// App dependencies
import MetadataSchemaUsedBy from '../metadataSchemaUsedBy/metadataSchemaUsedBy'

// Styles
import compStyles from './metadataSchemaUsedBys.module.css'
import fontStyles from '../../../styles/fontsize.module.css'

function MetadataSchemaUsedBys(props) {
  const { schema } = props,
    { entity, usedByProperties } = schema || {}
  const showUsedBy = !/type/.test(entity)
  const showUsedByProperties = usedByProperties.length > 0

  return showUsedBy ? (
    <>
      <h3>Used by</h3>
      <span className={compStyles.usedBy}>
        {showUsedByProperties ? (
          <p className={fontStyles.s}>
            This module is used by the following properties:
          </p>
        ) : (
          <p className={fontStyles.s}>This module is unused.</p>
        )}
      </span>
      {showUsedByProperties
        ? usedByProperties.map((usedByProperty, u) => (
            <MetadataSchemaUsedBy key={u} property={usedByProperty} />
          ))
        : null}
    </>
  ) : null
}

export default MetadataSchemaUsedBys
