import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const HeaderQuery = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query HeaderQuery {
		  allSiteMapYaml {
			edges {
			  node {
				name
				headerName
				description
				path
				position {
					location
					order
				}
			  }
			}
		  }
        }
    `
	);
	let headerLinks = (NavigationService.filterNavigationByLocation(allSiteMapYaml.edges.map(e => e.node), 'h'));
	return (NavigationService.orderNavigationLinks(headerLinks));
};
