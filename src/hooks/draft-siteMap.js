import {useStaticQuery, graphql} from 'gatsby';

export const DraftSiteMap = () => {
	const {allMarkdownRemark} = useStaticQuery(
		graphql`
		query DraftSiteMap {
		  allMarkdownRemark {
			edges {
			  node {
				fields {
				  path
				}
				frontmatter {
				  draft
				}
			  }
			}
		  }
		}
    `
	);
	return allMarkdownRemark.edges.map(e => e.node).filter(n => n.frontmatter.draft === true);
};
