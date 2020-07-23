import {useStaticQuery, graphql} from "gatsby";

export const TOCMetadataQuery = () => {
    const {allMetadataCore} = useStaticQuery(
        graphql`
        query TOCMetadataQuery {
        allMetadataCore {
          edges {
            node {
              name
              types {
                description
                entity
                fields {
                  slug
                }
                properties {
                  anchor
                  label
                  primary
                  primaryRequired
                  required
                }
              }
            }
          }
        }
      }
    `
    );
    return allMetadataCore.edges.map(n => n.node);
};
