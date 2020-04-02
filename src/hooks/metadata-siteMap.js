import {useStaticQuery, graphql} from 'gatsby';

export const MetadataSiteMap = () => {
	const {allMetadataSchemaEntity} = useStaticQuery(
		graphql`
		query MetadataSiteMap {
		  allMetadataSchemaEntity(filter: {schemaType: {in: ["module","core","type","system"]}}) {
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
				type
				description
				definitions {
				  task {
					required
					type
					properties {
					  name
					  type
					}
				  }
				  parameter {
					required
					type
					properties {
					  name
					  type
					  description
					}
				  }
				}
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
	return allMetadataSchemaEntity.edges.map(e => e.node);
};
