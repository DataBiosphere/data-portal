import { useStaticQuery, graphql } from "gatsby";

export const HeaderQuery = () => {
  const { allSiteMapYaml } = useStaticQuery(
    graphql`
      query HeaderQuery {
        allSiteMapYaml(
          filter: { position: { location: { regex: "/h/" } } }
          sort: { order: ASC, fields: position___order }
        ) {
          edges {
            node {
              name
              headerName
              description
              path
            }
          }
        }
      }
    `
  );
  return allSiteMapYaml.edges.map((e) => e.node);
};
