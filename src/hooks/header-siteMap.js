import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const HeaderSiteMap = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query HeaderSiteMap {
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
