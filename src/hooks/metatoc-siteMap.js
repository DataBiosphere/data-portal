import {useStaticQuery, graphql} from 'gatsby';

export const metadataTOCSiteMap = (metaType, metaProp) => {
	const {allMetadataSchemaEntity} = useStaticQuery(
		graphql`
		query MetadataTOCSiteMap {
		  allMetadataSchemaEntity {
			edges {
			  node {
				coreEntity
				name
				required
				properties {
					name
					properties {
						user_friendly
						}
				}
			  }
			}
		  }
		}
    `
	);
	return allMetadataSchemaEntity.edges.map(e => e.node).filter(n => n.coreEntity === metaType && n.name === metaProp)[0];
};
