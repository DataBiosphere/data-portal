import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const tabsSiteMap = (docPath) => {
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
	return NavigationService.getTabs(allSiteMapYaml.edges.map(e => e.node), docPath);
};
