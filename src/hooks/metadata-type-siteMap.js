import {useStaticQuery, graphql} from 'gatsby';

export const MetadataTypeSiteMap = () => {
	const {type} = useStaticQuery(
		graphql`
		query MetadataTypeSiteMap {
		  type: allMetadataSchemaEntity {
			edges {
			  node {
				coreEntity
				description
				fields {
				  path
				}
				name
				properties {
				  name
				  properties {
					description
					enum
					example
					type
					user_friendly
					_ref
					items {
					  type
					  _ref
					}
				  }
				}
				relativeFilePath
				required
				schemaType
				title
			  }
			}
		  }
		}
		`
	);
	return type.edges.map(e => e.node);
};
