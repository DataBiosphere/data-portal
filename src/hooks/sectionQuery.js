import {useStaticQuery, graphql} from 'gatsby';

export const SectionQuery = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query SectionQuery {
		  allSiteMapYaml {
			edges {
			  node {
				name
				key
			  }
			}
		  }
        }
    `
	);
	return allSiteMapYaml.edges.map(e => e.node);
};
