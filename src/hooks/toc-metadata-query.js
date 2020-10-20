import {useStaticQuery, graphql} from "gatsby";

export const TOCMetadataQuery = () => {
    const {allMetadataSchema} = useStaticQuery(
        graphql`
        query TOCMetadataQuery {
        allMetadataSchema {
          edges {
            node {
              fields {
                slug
              }
              properties {
                anchor
                name
                primary
                primaryRequired
                required
              }
            }
          }
        }
      }
    `
    );
    return allMetadataSchema.edges.map(n => n.node);
};
