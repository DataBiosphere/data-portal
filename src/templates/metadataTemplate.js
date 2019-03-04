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

    const coreObject = core.coreEntity + "_core";

    const types = data.metadata.edges.filter((x) => {
        return x.node.schemaType === "type";
    }).map(n => n.node);

    const modules = data.metadata.edges.filter((x) => {
        return x.node.schemaType === "module";
    }).map(n => n.node);

    // Check if x_core exists
    const isXCore = (properties) => {
        return properties.some(p => p.name === coreObject);
    };

    // Removal of core entity x_core where x is entity name
    const removeCoreEntity = (properties) => {
        return properties.filter(property => property.name !== coreObject);
    };

    // Removal of duplicate properties
    const removeDuplicateProperties = (properties) => {
        return properties.filter((p, i, a) => a.map(a => a.name).indexOf(p.name) === i);
    };

    // Inserting core into type, removing x_core where x = entity name
    const typesWithCore = types.map((type) => {

        if (isXCore(type.properties)) {
            // Insert core entity x_core, if exists
            core.properties.map((c, i) => {
                type.properties.splice(i, 0, c);
            });
            // Remove core entity e.g. biomaterial_core
            type.properties = removeCoreEntity(type.properties);
            // Remove duplicates e.g. describedBy, schema_version
            type.properties = removeDuplicateProperties(type.properties);
        }

        return type;
    });

    // Inserting core into modules, removing x_core where x = entity name
    const modulesWithCore = modules.map((module) => {

        if (isXCore(module.properties)) {
            // Insert core entity x_core, if exists
            core.properties.map((c, i) => {
                module.properties.splice(i, 0, c);
            });
            // Remove core entity e.g. biomaterial_core
            module.properties = removeCoreEntity(module.properties);
            // Remove duplicates e.g. describedBy, schema_version
            module.properties = removeDuplicateProperties(module.properties);
        }

        return module;
    });

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
                        <h2>{title} Types</h2>
                        {typesWithCore.length ? types.map((e, i) => <Metadata entity={e} key={i}/>) :
                            <div className={fontStyles.s}>No Modules</div>}
                        <h2>{title} Modules</h2>
                        {modulesWithCore.length ? modules.map((e, i) => <Metadata entity={e} key={i}/>) :
                            <div className={fontStyles.s}>No Modules</div>}
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
