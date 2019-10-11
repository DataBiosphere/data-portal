/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal explore controls component.
 */

// Core dependencies
import React from 'react';

// Images
import arrow from '../../../images/icon/explore/arrow.png';

// Styles
import compStyles from './exploreControls.module.css';

let organs = [
	{name: "Blood", id: "Blood"},
	{name: "Kidney", id: "Kidney"},
	{name: "Bone", id: "Bone"},
	{name: "Liver", id: "Liver"},
	{name: "Brain", id: "Brain"},
	{name: "Lung", id: "Lung"},
	{name: "Development Samples", id: "DevelopmentSamples"},
	{name: "Pancreas", id: "Pancreas"},
	{name: "Gut", id: "Gut"},
	{name: "Reproductive (Female)", id: "Female"},
	{name: "Heart", id: "Heart"},
	{name: "Reproductive (Male)", id: "Male"},
	{name: "Immune System", id: "ImmuneSystem"},
	{name: "Skin", id: "Skin"}
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

	getOrganEls = () => {

		return document.querySelectorAll("[id^=organ]");
	};

	getOrganKey = (organId) => {

		return organId.split("organ")[1];
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

			const organId = this.getOrganKey(organEl.getAttribute("id"));
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

	render() {
		return (
			<div className={compStyles.controls}>
				<div>
					<span className={compStyles.count}>3.6M Cells</span>
					<span className={compStyles.label}>All Cells</span>
				</div>
				<div className={compStyles.organs}>
					{organs.length ? organs.map((organ, i) =>
						<div id={`organ${organ.id}`} className={compStyles.organ} key={i}>
							<span>{organ.name}</span>
							<img src={arrow} alt="Select"></img>
						</div>) : null}
				</div>
				<a href="/" className={compStyles.moreOrgans}>View More Organs</a>
			</div>
		);
	}
}

export default ExploreControls;
