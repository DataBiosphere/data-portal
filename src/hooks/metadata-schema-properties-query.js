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
              propertyFriendlies
              propertyFrom
              propertyFromLink
              propertyPath
              propertyPaths
              _ref
              referenceFrom
              referenceFromLink
              relativePath
              required
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
