import {useStaticQuery, graphql} from 'gatsby';

export const TabsSiteMap = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query TabsSiteMap {
		  allSiteMapYaml {
			edges {
			  node {
				name
				key
				tabs {
					name
					key
					primaryLinks {
						key
						path
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
