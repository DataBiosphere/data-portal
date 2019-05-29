/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying organ stats on home page.
 */

// Core dependencies
import React from 'react';
import compStyles from './explore-stats.module.css'
import * as numberFormatter from '../../../src/utils/number-format.service';
import * as stringFormatter from '../../../src/utils/string-format.service';

class ExploreStats extends React.Component {

	state = {
		statsSummary: []
	};

	componentDidMount() {

		const {cellCountSummaries} = this.props;
		const statsSummary = cellCountSummaries.reduce((accum, summary) => {

			accum.push({
				label: stringFormatter.convertSentenceCaseToTitleCase(summary.label),
				count: summary.cellCount,
				facetName: "organ",
				termName: summary.label
			});
			return accum;
		}, []);

		this.setState({
			statsSummary
		})
	}

	formatCount = (count) => {

		return numberFormatter.format(count, 1);
	};

	getOrganFilter = (facetName, termName) => {

		return JSON.stringify([{"facetName": facetName, "terms": [termName]}]);
	};

	visitExploreLink = (facetName, termName) => {

		const organFilter = this.getOrganFilter(facetName, termName);
		window.location.href = `${process.env.GATSBY_EXPLORE_URL}projects?filter=${organFilter}`;
	};

	render() {
		return (
			<div className={compStyles.exploreStats}>
				<ul>
					<li>
						<div>Organ</div>
						<div>Cells</div>
					</li>
					{this.state.statsSummary.map((summary) => {
						return (
							<li key={summary.label}
								onClick={() => this.visitExploreLink(summary.facetName, summary.termName)}>
								<div>{summary.label}</div>
								<div>{this.formatCount(summary.count)}</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default ExploreStats;
