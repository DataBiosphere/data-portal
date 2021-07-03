/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search results panel scroll spy component.
 */

// Core dependencies
import { useEffect } from 'react'

function MetadataSearchResultsPanelScrollSpy(props) {
  const { children, activeResultEl } = props

  /* useEffect - componentDidUpdate - activeResultEl. */
  /* Handles scrolling to maintain visibility of any active result. */
  useEffect(() => {
    if (activeResultEl) {
      const { offsetHeight, offsetParent, offsetTop } = activeResultEl,
        { lastElementChild } = offsetParent || {},
        { clientHeight, scrollTop } = lastElementChild || 0
      const abovePanelTop = offsetTop - scrollTop < 56
      const belowPanelBottom =
        offsetTop + offsetHeight - scrollTop > clientHeight

      /* Keep to top view. */
      /* Note, scroll-margin-top added to classname "result". */
      /* Prevents result from scrolling to position under result panel hero. */
      if (abovePanelTop) {
        activeResultEl.scrollIntoView({ block: 'start' })
      } else if (belowPanelBottom) {
      /* Keep to bottom view. */
        activeResultEl.scrollIntoView({ block: 'end' })
      }
    }
  }, [activeResultEl])

  return children
}

export default MetadataSearchResultsPanelScrollSpy
