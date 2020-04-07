import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const HeaderStaticQuery = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query HeaderStaticQuery {
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
