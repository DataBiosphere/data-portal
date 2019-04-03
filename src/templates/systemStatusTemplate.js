/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal environment system status template component.
 */

// Core dependencies
import {graphql} from 'gatsby';
import React from 'react';

// App dependencies
import Layout from '../components/layout';

// Styles
import compStyles from './systemStatusTemplate.module.css';
import fontStyles from '../styles/fontsize.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const systems = data.allSystemStatus.edges.map(n => n.node)[0].systems;
	let currentEnv = process.env.GATSBY_EXPLORE_URL.split('//')[1].split('.')[0];

	const systemEnv = systems.filter(system => {

		// Filter out all other environments that do not match the current environment
		// Return the system only if the environment exists
		system.environments = system.environments.filter(environment => environment.name === currentEnv);
		return system.environments.length;
	});

	const getMetrics = (healthCheckID, type) => {

		// Returns svg badge
		return `<img src="${process.env.GATSBY_SYSTEM_STATUS_URL}${type}/${healthCheckID}.svg"/>`;
	};

	return (
		<Layout sectionTitle={'System Status'} homeTab={false} noTab={true} noNav={true}>
			<h2>Environment - {currentEnv.toUpperCase()}</h2>
			<div className={compStyles.system}>
				<div className={classNames(fontStyles.m, compStyles.label)}>
					<span>System Name</span>
					<span>Status</span>
					<span>Availability</span>
				</div>
				{systemEnv.map((s, i) =>
					<div key={i}>
						{s.environments.map((e, j) =>
							<div key={j} className={classNames(fontStyles.xs, compStyles.systemStatus)}>
								<span>{s.system_name}</span>
								<span
									dangerouslySetInnerHTML={{__html: getMetrics(e.health_check_id, "service")}}/>
								<span
									dangerouslySetInnerHTML={{__html: getMetrics(e.health_check_id, "availability")}}/>
							</div>)}
					</div>
				)}
			</div>
		</Layout>
	);
}

// modified to find the page by id which is passed in as context

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id  }) {
      id
      html
      }
  allSystemStatus {
    edges {
      node {
        relativeFilePath
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
`;
