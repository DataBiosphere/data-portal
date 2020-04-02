import {useStaticQuery, graphql} from 'gatsby';

export const MetadataTypeSiteMap = () => {
	const {type} = useStaticQuery(
		graphql`
		query MetadataTypeSiteMap {
		  type: allMetadataSchemaEntity {
			edges {
			  node {
				relativeFilePath
				fields {
				  path
				}
				schemaType
				coreEntity
				title
				name
				description
				properties {
				  name
				  properties {
					description
					type
					user_friendly
					_ref
					enum
					example
					items {
					  type
					  _ref
					}
				  }
				}
				required
			  }
			}
		  }
		}
		`
	);
	return type.edges.map(e => e.node);
};
