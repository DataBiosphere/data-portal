/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal markdown component.
 */

// Core dependencies
import React, { useCallback, useEffect, useRef } from 'react'
import rehypeReact from 'rehype-react'

// App dependencies
import ButtonCta from '../button-cta/button-cta'
import DataLifecycleDiagram from '../dataLifecycleDiagram/dataLifecycleDiagram'
import InternalLink from '../internal-link/internalLink'
import LinkToBrowser from '../linkToBrowser/linkToBrowser'
import MetadataTypeEntitySchemas from '../metadata/metadataTypeEntitySchemas/metadataTypeEntitySchemas'

// Styles
import compStyles from './markdown.module.css'
import { SurveyName } from '../survey/survey-name'
import * as DPGTMService from '../../utils/dp-gtm/dp-gtm.service'

function Markdown(props) {
  const { children } = props
  const refMarkdown = useRef(null)
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      'button-cta': ButtonCta,
      'data-lifecycle-diagram': DataLifecycleDiagram,
      'internal-link': InternalLink,
      'link-to-browser': LinkToBrowser,
      'metadata-type-entity-schemas': MetadataTypeEntitySchemas,
    },
  }).Compiler

  /**
   * Wraps a container around any markdown <table> elements to facilitate overflow styles on the table.
   */
  const initTableOverflow = useCallback(() => {
    /* Grab any direct descendants of the markdown container. */
    const markdownNodes = refMarkdown.current?.firstChild?.children

    if (markdownNodes) {
      /* Grab only table elements that are direct descendants of the markdown. */
      const tableNodes = [...markdownNodes].filter(
        node => node.nodeName === 'TABLE'
      )

      /* For each table node, wrap within a container element. */
      tableNodes.forEach(tableEl => insertTableOverflowNode(tableEl))
    }
  }, [])

  const insertTableOverflowNode = tableEl => {
    /* Create the container with "tableContainer" class. */
    const containerEl = document.createElement('div')
    containerEl.classList.add(compStyles.tableContainer)

    /* Inset new container element before existing table element. */
    tableEl.parentNode.insertBefore(containerEl, tableEl)

    /* Append the table element to the new container element. */
    containerEl.appendChild(tableEl)
  }

  /**
   * Track user clicks on survey link.
   * TODO generalize to handle tracking of other links.
   */
  const trackSurveyLaunch = e => {
    const { target } = e
    if (target.tagName === 'A' && target.innerText === 'survey') {
      DPGTMService.trackSurveyLaunch(SurveyName['2021_SPRING_MATRIX_UX'])
    }
  }

  /* useEffect - componentDidMount, componentWillUnmount. */
  useEffect(() => {
    initTableOverflow()
  }, [initTableOverflow])

  return (
    <div
      className={compStyles.markdown}
      ref={refMarkdown}
      onClick={trackSurveyLaunch}
      role="presentation"
    >
      {renderAst(children)}
    </div>
  )
}

export default Markdown
