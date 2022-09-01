import { useStaticQuery, graphql } from "gatsby";

export const MetadataTypeEntityQuery = () => {
  const { allMetadataEntity } = useStaticQuery(
    graphql`
      query MetadataTypeEntityQuery {
        allMetadataEntity(filter: { entity: { eq: "type" } }) {
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
              entity
            }
          }
        }
      }
    `
  );
  return allMetadataEntity.edges.map((n) => n.node)[0];
};
