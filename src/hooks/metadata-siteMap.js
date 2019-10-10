import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const MetadataSiteMap = (docPath) => {
	const {allSitePage} = useStaticQuery(
		graphql`
		query MetadataSiteMap {
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
