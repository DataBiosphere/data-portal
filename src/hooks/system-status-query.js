import {useStaticQuery, graphql} from "gatsby";

export const SystemStatusQuery = () => {
    const {allSystemStatus} = useStaticQuery(
        graphql`
        query SystemStatusQuery {
        allSystemStatus {
          edges {
            node {
              systems {
                system_name
                repo
                group
                owner
                environments {
                  name
                  branch
                  health_check_endpoint
                  ci_cd_server
                  metrics_url
                  health_check_id
                }
              }
            }
          }
        }
      }
    `
    );
    return allSystemStatus.edges.map(n => n.node);
};
