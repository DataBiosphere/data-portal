/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating table of contents functionality.
 */

// App dependencies
import { TOCMetadataQuery } from '../hooks/toc-metadata-query'
import { TOCPageQuery } from '../hooks/toc-page-query'

/**
 * Returns the TOCs.
 *
 * @param docPath
 * @param showAllMetadata
 * @returns {Array}
 */
export function getTOCs(docPath, showAllMetadata) {
  if (docPath) {
    /* Metadata TOC. */
    if (docPath.startsWith('/metadata/dictionary/')) {
      return buildTOCsMetadata(docPath, showAllMetadata)
    } else {
    /* Page (markdown) TOC. */
      return buildTOCsMarkdown(docPath)
    }
  }

  return []
}

/**
 * Returns the TOC in FE model.
 *
 * @param anchor
 * @param depth
 * @param name
 * @param required
 * @param tocType
 * @returns {{anchor: string, depth: *, name: *, required: boolean, type: *}}
 */
function buildTOC(anchor, depth, name, required = true, tocType) {
  return {
    anchor: `#${anchor}`,
    depth: depth,
    name: name,
    required: required,
    type: tocType,
  }
}

/**
 * Returns the pages TOC.
 *
 * @param docPath
 */
function buildTOCsMarkdown(docPath) {
  const tocQuery = TOCPageQuery()

  /* Find the TOC query for the specified path. */
  const tocPage = tocQuery.find(page => page.fields.slug === docPath)

  /* Filter for <h2> and <h3> headings. */
  const headings = tocPage.htmlAst.children.filter(
    child => child.tagName === 'h2' || child.tagName === 'h3'
  )

  /* Return the TOC. */
  return headings.map(heading => {
    const anchor = `${heading.properties.id}`
    const tocDepth = Number(heading.tagName.charAt(1))
    const tocName = heading.children.find(child => child.type === 'text').value
    const tocType = 'docs'

    return buildTOC(anchor, tocDepth, tocName, false, tocType)
  })
}

/**
 * Returns the metadata TOC.
 *
 * @param docPath
 * @param showAllMetadata
 * @returns {Array}
 */
function buildTOCsMetadata(docPath, showAllMetadata) {
  const tocQuery = TOCMetadataQuery()

  /* Find the schema for the specified path. */
  const tocSchema = getMetadataSchema(tocQuery, docPath)

  /* Filter for primary properties and/or show/hide fields. */
  const tocProperties = filterMetadataProperties(tocSchema, showAllMetadata)

  /* Return the TOC. */
  return getMetadataTOC(tocProperties)
}

/**
 * Returns the metadata schema for the specified path.
 *
 * @param schemas
 * @param docPath
 * @returns {*}
 */
function getMetadataSchema(schemas, docPath) {
  return schemas.find(schema => schema.fields.slug === docPath)
}

/**
 * Returns a built TOC, for each property.
 *
 * @param tocProperties
 */
function getMetadataTOC(tocProperties) {
  return tocProperties.map(property => {
    const anchor = property.anchor
    const tocDepth = 2
    let tocName
    const tocRequired = property.required

    if (tocRequired) {
      tocName = `${property.label} *`
    } else {
      tocName = property.label
    }

    return buildTOC(anchor, tocDepth, tocName, tocRequired, 'metadata')
  })
}

/**
 * Returns properties that are primary.
 * If the show all metadata toggle is false, then only properties that are primary and required are returned.
 *
 * @param tocSchema
 * @param showAllMetadata
 * @returns {Array.<T>}
 */
function filterMetadataProperties(tocSchema, showAllMetadata) {
  /* Filter to include only the primary properties. */
  /* Filter if the show all metadata toggle is "required" only. */
  return tocSchema.properties.filter(property => {
    const { primary, primaryRequired } = property || {}

    if (showAllMetadata) {
      return primary
    }

    return primary && primaryRequired
  })
}
