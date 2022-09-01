/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content template component.
 */

// Core dependencies
import { graphql } from "gatsby";
import React from "react";

// App dependencies
import AnalysisDetail from "../components/analyze/analysisDetail";
import Analyze from "../components/analyze/analyze";
import Attributions from "../components/attributions/attributions";
import Layout from "../components/layout";
import Markdown from "../components/markdown/markdown";
import ProviderMetadataDisplaying from "../components/metadata/providerMetadataDisplaying/providerMetadataDisplaying";
import { Relationship } from "../utils/anchor/relationship.model";
import { Target } from "../utils/anchor/target.model";
import * as TemplateService from "../utils/template.service";

// Class name helper
import classNames from "classnames";

// Styles
import * as globalStyles from "../styles/global.module.css";

// the data prop will be injected by the GraphQL query below.
export default function Template({ data, location, pageContext }) {
  const { pathname, hash } = location;
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, htmlAst } = markdownRemark,
    { nav } = pageContext || {},
    { fields } = markdownRemark || {},
    { slug } = fields || {},
    { componentName, description, linked, title } = frontmatter || {};
  const showEditPage = TemplateService.showEditPage(slug);
  const editPath = TemplateService.getPageEditUrl(slug);
  const h1 = TemplateService.getPageTitle(htmlAst);
  const pageTitle = h1 ? h1 : title;

  return (
    <ProviderMetadataDisplaying>
      <Layout
        activeLocation={{ pathname, hash }}
        description={description}
        docPath={slug}
        nav={nav}
        pageTitle={pageTitle}
      >
        {componentName === "analysisDetail" ? (
          <AnalysisDetail data={markdownRemark} />
        ) : (
          <Markdown>{htmlAst}</Markdown>
        )}
        {linked && componentName === "analyze" ? (
          <Analyze linked={linked} />
        ) : null}
        {componentName === "attributions" ? <Attributions /> : null}
        {showEditPage ? (
          <a
            className={classNames(
              globalStyles.editContent,
              globalStyles.editContentSeparator
            )}
            href={editPath}
            rel={Relationship.NOOPENER}
            target={Target.BLANK}
          >
            Improve this page
          </a>
        ) : null}
      </Layout>
    </ProviderMetadataDisplaying>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      htmlAst
      fields {
        slug
      }
      frontmatter {
        appUrl
        author
        componentName
        date(formatString: "MMMM DD, YYYY")
        description
        githubUrl
        linked {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              author
              description
              githubUrl
              path
              subTitle
              title
            }
            html
          }
        }
        path
        subTitle
        title
      }
    }
  }
`;
