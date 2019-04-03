import {useStaticQuery, graphql} from 'gatsby';

export const allSiteMap = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query AllSiteMap {
		  allSiteMapYaml {
			edges {
			  node {
				name
				key
				path
				tabs {
					name
					key
					primaryLinks {
						name
						key
						path
						secondaryLinks {
							name
							key
							path
						}
					}
				}
			  }
			}
		  }
        }
    `
	);
	return allSiteMapYaml.edges.map(e => e.node);
};
