import { useStaticQuery, graphql } from 'gatsby'

export const FooterQuery = () => {
  const { allSiteMapYaml } = useStaticQuery(
    graphql`
      query FooterSiteMap {
        allSiteMapYaml(
          filter: { position: { location: { regex: "/f/" } } }
          sort: { order: ASC, fields: position___order }
        ) {
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
  )
  return allSiteMapYaml.edges.map(e => e.node)
}
