/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - a React Context object for sharing metadata search query results.
 * Used to search and filter the metadata.
 */

// Core dependencies
import React from 'react'

const ContextMetadataSearch = React.createContext({
  inputActive: false,
  inputValue: '',
  results: [],
  showResultsPanel: false,
  onHandleSearch: () => {},
  onHandleSearchClose: () => {},
  onHandleSearchOpen: () => {},
})

export default ContextMetadataSearch
