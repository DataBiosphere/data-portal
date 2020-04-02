import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const MetadataNavSiteMap = (docPath) => {
	const {allSitePage} = useStaticQuery(
		graphql`
		query MetadataNavSiteMap {
			allSitePage(filter: {path: {regex: "/metadata/dictionary/"}}) {
				edges {
					node {
						path
						context {
							metadataCoreName
							metadataTitle
						}
					}
				}
			}
		}
		`
	);
	return NavigationService.getMetadataNav(allSitePage.edges.map(e => e.node), docPath);
};
