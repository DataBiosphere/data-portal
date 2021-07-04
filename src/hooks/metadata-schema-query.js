import { useStaticQuery, graphql } from "gatsby";

export const MetadataSchemaQuery = () => {
  const { allMetadataSchema } = useStaticQuery(
    graphql`
      query MetadataSchemaQuery {
        allMetadataSchema(sort: { fields: schemaName }) {
          edges {
            node {
              category
              description
              entity
              fields {
                slug
              }
              id
              relativePath
              schemaName
              title
              type
              urlTo
              usedByProperties {
                description
                label
                propertyPath
                schema {
                  title
                }
                urlTo
              }
            }
          }
        }
      }
    `
  );
  return allMetadataSchema.edges.map(n => n.node);
};
