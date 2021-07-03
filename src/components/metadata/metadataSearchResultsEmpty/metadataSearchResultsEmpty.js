/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search error component.
 */

// Core dependencies
import React from 'react'

// Styles
import compStyles from './metadataSearchResultsEmpty.module.css'
import fontStyles from '../../../styles/fontsize.module.css'

function MetadataSearchResultsEmpty() {
  return (
    <div className={compStyles.noResult}>
      <p className={fontStyles.s}>
        Oops! We don’t have an exact match, it may be called by a different
        name.
      </p>
      <p className={fontStyles.s}>
        Try starting with a schema name, for example "cell_line" or
        "specimen_from_organism".
      </p>
    </div>
  )
}

export default MetadataSearchResultsEmpty
