import { useStaticQuery, graphql } from "gatsby";

export const MetadataTypeEntityQuery = () => {
  const { allMetadataEntity } = useStaticQuery(
    graphql`
      query MetadataTypeEntityQuery {
        allMetadataEntity(filter: { entityName: { eq: "type" } }) {
          edges {
            node {
              categories {
                categoryName
                schemas {
                  description
                  schemaName
                  title
                  urlTo
                }
              }
              entityName
            }
          }
        }
      }
    `
  );
  return allMetadataEntity.edges.map(n => n.node)[0];
};
