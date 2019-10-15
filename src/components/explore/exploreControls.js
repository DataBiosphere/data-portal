/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal explore controls component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import * as stringFormatter from '../../../src/utils/string-format.service';

// Images
import arrow from '../../../images/icon/explore/arrow.png';

// Styles
import compStyles from './exploreControls.module.css';

let classNames = require('classnames');

let organTermList = [
	"blood",
	"kidney",
	"bone",
	"liver",
	"brain",
	"lung",
	"development samples",
	"pancreas",
	"gut",
	"female reproductive",
	"heart",
	"male reproductive",
	"immune system",
	"skin of body"
];

class ExploreControls extends React.Component {

	constructor(props) {
		super(props);
		this.setOrganActive = this.setOrganActive.bind(this);
	}

	componentDidMount() {
		this.setOrganInteractions();
	}

	componentWillUnmount() {
		this.removeOrganInteractions();
	};

	clearOrganActive = () => {

		return () => {

			this.props.onActiveOrgan("");
		}
	};

	getOrganDisplayLabel = (organ) => {

		const displayLabel = this.translateOrganNameToDisplayLabel(organ);

		return stringFormatter.convertSentenceCaseToTitleCase(displayLabel);
	};

	getOrganEls = () => {

		return document.querySelectorAll("[id^=organ]");
	};

	getOrganFilter = (organ) => {

		const {cellCountSummaries} = this.props;

		if ( !cellCountSummaries ) {

			return [];
		}

		return cellCountSummaries.filter(cellCountSummary => cellCountSummary.label === organ)[0];
	};

	getOrganId = (organ) => {

		const idStem = stringFormatter.convertSentenceCaseToTitleCase(organ).replace(/\s/g, "");

		return `organ${idStem}`;
	};

	getOrganIdStem = (organId) => {

		return organId.split("organ")[1];
	};

	isOrganSummarized = (organ) => {

		const {cellCountSummaries} = this.props;

		return cellCountSummaries && this.getOrganFilter(organ) ? true : false;
	};

	removeOrganInteractions = () => {

		const organEls = this.getOrganEls();

		// Remove event listener for mouse over and mouse out and click event of organ elements
		organEls.forEach(organEl => {

			organEl.removeEventListener('mouseenter', this.setOrganActive(organEl));
			organEl.removeEventListener('mouseleave', this.clearOrganActive());
		});
	};

	setOrganActive = (organEl) => {

		return () => {

			const organId = this.getOrganIdStem(organEl.getAttribute("id"));
			this.props.onActiveOrgan(organId);
		}
	};

	setOrganInteractions = () => {

		const organEls = this.getOrganEls();

		// Add event listener for mouse over and mouse out and click event of organ elements
		organEls.forEach(organEl => {

			organEl.addEventListener('mouseenter', this.setOrganActive(organEl));
			organEl.addEventListener('mouseleave', this.clearOrganActive());
		});
	};

	stringifyOrganFilter = (term) => {

		return JSON.stringify([{"facetName": "organ", "terms": [term]}]);
	};

	translateOrganNameToDisplayLabel = (organName) => {

		switch (organName) {
			case "female reproductive":
				return "Reproductive (Female)";
			case "male reproductive":
				return "Reproductive (Male)";
			case "skin of body":
				return "skin";
			default:
				return organName;
		}
	};

	visitExploreLink = (organ) => {

		if ( !this.isOrganSummarized(organ) ) {
			return;
		}

		const organFilter = this.getOrganFilter(organ);
		const stringifyOrganFilter = this.stringifyOrganFilter(organFilter.label);

		window.location.href = `${process.env.GATSBY_EXPLORE_URL}projects?filter=${stringifyOrganFilter}`;
	};

	render() {
		const {totalCellCount} = this.props;
		return (
			<div className={compStyles.controls}>
				<div>
					<span className={compStyles.count}>{totalCellCount} Cells</span>
					<span className={compStyles.label}>All Cells</span>
				</div>
				<div className={compStyles.organs}>
					{organTermList ? organTermList.map((organ, i) =>
						<div
							className={classNames(compStyles.organ, {[compStyles.unspecified]: !this.isOrganSummarized(organ)})}
							id={this.getOrganId(organ)}
							onClick={() => this.visitExploreLink(organ)}
							key={i}>
							<span>{this.getOrganDisplayLabel(organ)}</span>
							<img src={arrow} alt="Select"/>
						</div>) : null}
				</div>
				<a href={process.env.GATSBY_EXPLORE_URL} className={compStyles.moreOrgans}>View More Organs</a>
			</div>
		);
	}
}

export default ExploreControls;
