import {useStaticQuery, graphql} from "gatsby";

export const MetadataSchemaPropertiesQuery = () => {
    const {allMetadataSchemaProperty} = useStaticQuery(
        graphql`
        query MetadataSchemaPropertiesQuery {
        allMetadataSchemaProperty(sort: {fields: propertyPath}) {
          edges {
            node {
              anchor
              dataType
              description
              example
              graphRestriction {
                classes
                ontologies
                relations
              }
              id
              label
              name
              primary
              primaryRequired
              propertyFrom
              propertyFromLink
              propertyPath
              propertyPaths
              _ref
              referenceFrom
              referenceFromLink
              relativePath
              required
              schema {
                schemaName
                title
              }
              type
              urlTo
            }
          }
        }
      }
    `
    );
    return allMetadataSchemaProperty.edges.map(n => n.node);
};
