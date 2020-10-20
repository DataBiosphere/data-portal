/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as MetadataService from "../../../utils/metadata.service";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFieldGraphRestriction(props) {

    const {property} = props,
        {graphRestriction} = property,
        {classes, direct, includeSelf, ontologies} = graphRestriction || {};
    const showGraphRestriction = classes && ontologies;

    const Restriction = (props) => {

        const {counter, joinBy, ontology, restriction} = props;
        const firstRestriction = counter === 0;
        const linkTo = MetadataService.buildOntologySearchUrl(restriction, ontology);

        return (
            <>
            {firstRestriction ? null : <span>{joinBy}</span>}
            <a href={linkTo} rel="noopener noreferrer" target="_blank">{restriction}</a>
            </>
        )
    };

    return (
        showGraphRestriction ?
            <p className={fontStyles.s}>
                <span className={fontStyles.regular}>Graph restriction: </span>
                {direct ? <span>Direct subclasses of </span> : <span>Subclasses of </span>}
                {classes.map((restriction, r) => <Restriction key={r} counter={r} joinBy={", "} restriction={restriction}/>)}
                <span> from </span>
                {ontologies.map((restriction, r) => <Restriction key={r} counter={r} joinBy={" or "} ontology restriction={restriction}/>)}
                {includeSelf ? <span> including self.</span> : <span>.</span>}
            </p> : null
    );
}

export default MetadataSchemaPropertyFieldGraphRestriction;
