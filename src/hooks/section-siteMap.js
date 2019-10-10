import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const SectionSiteMap = (docPath) => {
	const {allSiteMapYaml} = useStaticQuery(
		graphql`
		query SectionSiteMap {
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
	return NavigationService.sectionTitle(allSiteMapYaml.edges.map(e => e.node), docPath);
};
