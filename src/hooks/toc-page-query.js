import {useStaticQuery, graphql} from "gatsby";

export const TOCPageQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query TOCPageQuery {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                headings {
                  depth
                  value
                }
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node);
};
