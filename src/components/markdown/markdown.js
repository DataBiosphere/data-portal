/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal markdown component.
 */

// Core dependencies
import React, {useEffect, useRef} from "react";
import rehypeReact from "rehype-react";

// App dependencies
import DataLifecycleDiagram from '../dataLifecycleDiagram/dataLifecycleDiagram';
import InternalLink from '../internal-link/internalLink';
import LinkToBrowser from "../linkToBrowser/linkToBrowser";
import MetadataTypeEntitySchemas from "../metadata/metadataTypeEntitySchemas/metadataTypeEntitySchemas";

// Styles
import compStyles from "./markdown.module.css";

function Markdown(props) {

    const {children} = props;
    const refMarkdown = useRef(null);
    const renderAst = new rehypeReact({
        createElement: React.createElement,
        components: {
            "data-lifecycle-diagram": DataLifecycleDiagram,
            "internal-link": InternalLink,
            "link-to-browser": LinkToBrowser,
            "metadata-type-entity-schemas": MetadataTypeEntitySchemas
        }
    }).Compiler;

    const insertTableWrapperNode = () => {

        /* Grab any direct descendants of the markdown container. */
        const markdownNodes = refMarkdown.current?.firstChild?.children;

        if ( markdownNodes ) {

            const tableNodes = [...markdownNodes].filter(node => node.nodeName === "TABLE");

            if ( tableNodes && tableNodes.length > 0 ) {

                /* For each table node, wrap within a container element. */
                tableNodes.forEach(tableEl => {

                    /* Create the container with "table" class. */
                    const containerEl = document.createElement("div");
                    containerEl.classList.add(compStyles.tableWrapper);

                    /* Inset new container element before existing table element. */
                    tableEl.parentNode.insertBefore(containerEl, tableEl);

                    /* Append the table element to the new container element. */
                    containerEl.appendChild(tableEl);
                });
            }
        }
    };

    /* useEffect - componentDidMount, componentWillUnmount. */
    useEffect(() => {

        /* Set up table wrapper. */
        insertTableWrapperNode();
    }, []);

    return (
        <div className={compStyles.content} ref={refMarkdown}>{renderAst(children)}</div>
    );
}

export default Markdown;
