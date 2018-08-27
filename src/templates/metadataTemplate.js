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

let metadataTable =
    {
        entity: "Donor Fran Organism",
        properties: [
            {
                name: "Biomaterial ID IS COOL",
                description: "A unique ID for this biomaterial"
            },
            {
                name: "Biomaterial Name",
                description: "A short, descriptive name for the biomaterial that need not be unique"
            },
            {
                name: "Biomaterial Description",
                description: "A general description of the biomaterial"
            }
        ]
    };

let metadataTable2 =
    {
        entity: "Some Entity",
        properties: [
            {
                name: "Biomaterial ID",
                description: "A unique ID for this biomaterial"
            },
            {
                name: "Biomaterial Name",
                description: "A short, descriptive name for the biomaterial that need not be unique"
            },
            {
                name: "Biomaterial Description",
                description: "A general description of the biomaterial"
            }
        ]
    };

let coreEntity = "biomaterial";

let entity = {

    core: metadataTable,
    types: [metadataTable2, metadataTable, metadataTable],
    modules: [metadataTable, metadataTable, metadataTable, metadataTable]

};

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

    const {markdownRemark} = data; // data.markdownRemark holds our post data
    const {frontmatter, html} = markdownRemark;

    let docPath, metadataCoreName, gitHubPath;
    docPath = markdownRemark.fields.path;
    gitHubPath = markdownRemark.fields.gitHubPath.substring(0, markdownRemark.fields.gitHubPath.lastIndexOf("/"));

    const editPath = "https://github.com/HumanCellAtlas/data-portal-content/tree/master/content" + gitHubPath + ".md";

    if (frontmatter) {
        metadataCoreName = frontmatter.metadataCoreName;
    }

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
                        <h2>{metadataCoreName} Core</h2>
                        <Metadata entity={entity.core}/>
                        <h2>{metadataCoreName} Types</h2>
                        {entity.types.map((e, i) => <Metadata entity={e} key={i}/>)}
                        <h2>{metadataCoreName} Modules</h2>
                        {entity.modules.map((e, i) => <Metadata entity={e} key={i}/>)}
                        <div className={compStyles.editContent}><a href={editPath} target="_blank">Edit me on GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query MetadataPostByPath($id: String!) {
    markdownRemark(id: { eq: $id  }) {
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
  }
`;
