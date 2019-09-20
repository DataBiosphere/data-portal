import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const FooterSiteMap = () => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query FooterSiteMap {
		  allSiteMapYaml {
			edges {
			  node {
				name
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
	let footerLinks = (NavigationService.filterNavigationByLocation(allSiteMapYaml.edges.map(e => e.node), 'f'));
	return (NavigationService.orderNavigationLinks(footerLinks));
};
