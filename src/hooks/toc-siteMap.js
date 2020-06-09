import {useStaticQuery, graphql} from 'gatsby';

export const TOCSiteMap = (docPath) => {
	const {allMarkdownRemark} = useStaticQuery(
		graphql`
		query TOCSiteMap {
		  allMarkdownRemark {
			edges {
			  node {
				fields {
				  slug
				}
				headings {
				  depth
				  value
				}
			  }
			}
		  }
		}
    `
	);
	return allMarkdownRemark.edges.map(e => e.node).filter(n => n.fields.slug === docPath)[0];
};
