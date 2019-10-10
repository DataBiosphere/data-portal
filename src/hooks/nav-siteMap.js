import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const NavSiteMap = (docPath) => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query NavSiteMap {
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
	return NavigationService.getNav(allSiteMapYaml.edges.map(e => e.node), docPath);
};
