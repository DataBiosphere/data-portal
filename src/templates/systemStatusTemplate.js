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
import * as EnvironmentService from '../utils/environment.service';
import Layout from '../components/layout';

// Styles
import compStyles from './systemStatusTemplate.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const systems = data.allSystemStatus.edges.map(n => n.node)[0].systems;
	const currentEnv = EnvironmentService.getCurrentEnvironment();
	const displayEnv = currentEnv === 'LOCAL' ? 'DEV' : currentEnv;

	const systemEnv = systems.reduce((accum, system) => {

		// Filter out all other environments that do not match the current environment
		// Return the system only if the environment exists
		const applicableEnvironments = system.environments.filter(environment =>
			EnvironmentService.isCurrentEnvironment(environment.name.toUpperCase(), true));
		
		if ( applicableEnvironments.length ) {
			accum.push({
				...system,
				environments: applicableEnvironments
			})
		}
		return accum;
	}, []);

	const getMetrics = (healthCheckID, type) => {

		// Returns svg badge
		return `<img src="${process.env.GATSBY_SYSTEM_STATUS_URL}${type}/${healthCheckID}.svg"/>`;
	};

	return (
		<Layout sectionTitle={'System Status'} homeTab={false} noTab={true} noNav={true}>
			<h1 className={globalStyles.md}>Environment - {displayEnv}</h1>
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
