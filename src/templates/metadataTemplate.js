/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Metadata from "../components/metadata/metadata";
import Nav from "../components/nav/nav";
import Section from "../components/section/section";
import TabNav from "../components/tabNav/tabNav";

// Styles
import compStyles from "./metadataTemplate.module.css";
import fontStyles from "../styles/fontsize.module.css";
import globalStyles from "../styles/global.module.css";

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const markdownRemark = data.markdown; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;

    let docPath, metadataCoreName, gitHubPath, title;
    docPath = markdownRemark.fields.path;
    gitHubPath = markdownRemark.fields.gitHubPath.substring(0, markdownRemark.fields.gitHubPath.lastIndexOf("/"));

    const editPath = "https://github.com/HumanCellAtlas/data-portal-content/tree/master/content" + gitHubPath + ".md";

    if (frontmatter) {
        metadataCoreName = frontmatter.metadataCoreName;
        title = frontmatter.title;
    }

    const core = data.metadata.edges.find((x) => {
            return x.node.schemaType === "core";
        }
    ).node;

    const types = data.metadata.edges.filter((x) => {
        return x.node.schemaType === "type";
    }).map(n => n.node);

    const modules = data.metadata.edges.filter((x) => {
        return x.node.schemaType === "module";
    }).map(n => n.node);

    // Core and Modules comprise of objects or arrays for example within Modules there
    // is an object named "Death" with an array properties like "time_of_death" and "cause_of_death".
    // The types metadata will merge any modules or core object where it has been referenced.
    // For example the type "Donor Organism" includes the property "Death conditions", which is an object of type "death".
    // "Death conditions" will be replaced by the Module property "death".
    let typesMerged, objectTitle, objectProperties;

    // Check if the core or modules object (or array) exists within the list of type properties
    const isXObjectOrArray = (properties, objectTitle) => {
        return properties.findIndex(property => ((getRegexText(property.itemsRef) === objectTitle || getRegexText(property.objectRef) === objectTitle)));
    };

    // Regex string
    const getRegexText = (text) => {
        return text.toLowerCase().replace(/_/g, " ").replace(/\-/g, " ");
    };

    // Get Module or Core title and corresponding properties
    const getObjectTitleAndProperties = (schemaType) => {

        objectTitle = getRegexText(schemaType.title);
        objectProperties = schemaType.properties;

        return {
            objectTitle,
            objectProperties
        };
    };

    // Removal of duplicate properties
    const removeDuplicateProperties = (properties) => {
        return properties.filter((p, i, a) => a.map(a => a.name).indexOf(p.name) === i);
    };

    // Merge Modules with Core metadata
    const mergedSchemaCoreWithModules = modules.concat(core);

    // For each Module and Core, replace any found usages of the module/core with its corresponding properties
    mergedSchemaCoreWithModules.forEach((coreOrModule => {

        // Get the title for each module/core
        getObjectTitleAndProperties(coreOrModule);
        let objectArrayPosition = -1;

        // Replace any found usages of the module/core with its corresponding properties
        typesMerged = types.filter((type) => {

            // Check to see if there is a type property that is actually a module object or array.
            // For example, type property of name "Death conditions" is an object of type "death".
            objectArrayPosition = isXObjectOrArray(type.properties, objectTitle);

            // If a type property array/object exists, insert its equivalent module/core properties.
            // For example type property of name "Death conditions" would be replaced by the module property "Death"
            // which comprises of an array of properties like "cause_of_death" and "time_of_death".
            if (objectArrayPosition >= 0) {
                objectProperties.map((property, i) => (type.properties.splice((objectArrayPosition + i + 1), 0, property)));
            }

            // Exclude type property that references its module (object or array).
            // For example, exclude the type property of name "Death conditions", where it is an object "death" - we have now replaced
            // this object with its corresponding array (see above).
            type.properties = type.properties.filter((p, i) => (i !== objectArrayPosition));

            // Remove any duplicate properties e.g. "describeBy"
            type.properties = removeDuplicateProperties(type.properties);

            objectArrayPosition = -1;
            return type;
        });
    }));

    return (
        <div>
            <Section docPath={docPath}/>
            <TabNav docPath={docPath}/>
            <div className={globalStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <Nav docPath={docPath}/>
                    <div className={classNames(compStyles.markdownContent, compStyles.metadataContent)}>
                        <div
                            className="content-template"
                            dangerouslySetInnerHTML={{__html: html}}
                        />
                        <p className={classNames(fontStyles.xxs, compStyles.xxs)}>* Indicates a required field</p>
                        {types.map((type, i) => <Metadata entity={type} key={i}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query MetadataPostByPath($id: String!, $metadataCoreName: String!) {
    markdown: markdownRemark(id: { eq: $id  }) {
      id
      html
      fields{
            path
            gitHubPath
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subTitle
        componentName
        metadataCoreName
        linked {
               childMarkdownRemark{
                   html
                   frontmatter{
                        path
                        title
                        subTitle
                    }
               }
        }
      }
    }
    
    metadata: allMetadataSchemaEntity(
    filter: {coreEntity: {eq: $metadataCoreName} schemaType: {ne: "bundle"}}
  ){
    edges{
      node{
        title
        coreEntity
        schemaType
        properties{
          name
          description
          itemsRef
          itemsType
          objectRef
          required
          type
          userFriendly
        }
      }
    }
  }
  }
`;
