/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */
// Core dependencies
import React from "react";
// App dependencies
import compStyles from './metadataTemplate.module.css';
import Metadata from "../components/metadata/metadata";
import Nav from '../components/nav/nav';
import Section from '../components/section/section';
import TabNav from "../components/tabNav/tabNav";

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

    const modules = data.metadata.edges.filter((x) =>{
        return x.node.schemaType==="module";
    }).map(n => n.node);


    return (
        <div>
            <Section docPath={docPath}/>
            <TabNav docPath={docPath}/>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <Nav docPath={docPath}/>
                    <div className={classNames(compStyles.markdownContent)}>
                        <div
                            className="content-template"
                            dangerouslySetInnerHTML={{__html: html}}
                        />
                        <p className={compStyles.xxs}>*Required Fields</p>
                        <h2>{title} Core</h2>
                        <Metadata entity={core}/>
                        <h2>{title} Types</h2>
                        {types.map((e, i) => <Metadata entity={e} key={i}/>)}
                        <h2>{title} Modules</h2>
                        {modules.map((e, i) => <Metadata entity={e} key={i}/>)}
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
          required
          userFriendly
        }
      }
    }
  }
  }
`;
