/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction component.
 */

// Core dependencies
import React from 'react'

// App dependencies
import MetadataSchemaPropertyFieldGraphRestrictionClasses from '../metadataSchemaPropertyFieldGraphRestrictionClasses/metadataSchemaPropertyFieldGraphRestrictionClasses'
import MetdataSchemaPropertyFieldGraphRestrictionOntologies from '../metadataSchemaPropertyFieldGraphRestrictionOntologies/metadataSchemaPropertyFieldGraphRestrictionOntologies'

// Styles
import fontStyles from '../../../styles/fontsize.module.css'

function MetadataSchemaPropertyFieldGraphRestriction(props) {
  const { property, showLink = true } = props,
    { graphRestriction } = property,
    { classes, direct, includeSelf, ontologies } = graphRestriction || {}
  const showGraphRestriction = classes && ontologies

  return showGraphRestriction ? (
    <span className={fontStyles.s}>
      <span className={fontStyles.regular}>Graph restriction: </span>
      {direct ? (
        <span>Direct subclasses of </span>
      ) : (
        <span>Subclasses of </span>
      )}
      <MetadataSchemaPropertyFieldGraphRestrictionClasses
        classes={classes}
        ontologies={ontologies}
        showLink={showLink}
      />
      <span> from </span>
      <MetdataSchemaPropertyFieldGraphRestrictionOntologies
        ontologies={ontologies}
        showLink={showLink}
      />
      {includeSelf ? <span> including self.</span> : <span>.</span>}
    </span>
  ) : null
}

export default React.memo(MetadataSchemaPropertyFieldGraphRestriction)
