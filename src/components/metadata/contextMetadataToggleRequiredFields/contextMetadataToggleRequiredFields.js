/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - a React Context object for sharing the metadata toggle required fields value.
 * Used by metadata pages and metadata search components - facilitates the toggle between showing all metadata fields,
 * or only required fields.
 */

// Core dependencies
import React from 'react'

const ContextMetadataToggleRequiredFields = React.createContext({
  showAllMetadata: true,
  onHandleToggleRequiredFields: () => {},
})

export default ContextMetadataToggleRequiredFields
