import {useStaticQuery, graphql} from 'gatsby';

export const MetadataSiteMap = () => {
	const {allMetadataSchemaEntity} = useStaticQuery(
		graphql`
		query MetadataSiteMap {
		  allMetadataSchemaEntity(filter: {schemaType: {in: ["module","core","type","system"]}}) {
			edges {
			  node {
				coreEntity
				definitions {
				  parameter {
					properties {
					  description
					  name
					  type
					}
					required
					type
				  }
				  task {
					properties {
					  name
					  type
					}
					required
					type
				  }
				}
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
					items {
					  type
					  _ref
					}
					type
					user_friendly
					_ref
				  }
				}
				relativeFilePath
				required
				schemaType
				title
				type
			  }
			}
		  }
		}
		`
	);
	return allMetadataSchemaEntity.edges.map(e => e.node);
};
