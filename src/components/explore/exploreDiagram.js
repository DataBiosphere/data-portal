/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal explore diagram component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import HumanBodyDiagram from './humanBodyDiagram.svg';

// Styles
import compStyles from './exploreDiagram.module.css';

class ExploreDiagram extends React.Component {

	constructor(props) {
		super(props);
		this.state = {organ: ""};
	}

	componentDidUpdate() {
		this.setOrganAttributes();
	}

	getOrganEl = (organ) => {

		return document.querySelector(`[id^=path${organ}]`);
	};

	setOrganAttributes = () => {

		// Get active organ
		const {activeOrgan} = this.props;

		if (activeOrgan === this.state.organ) {
			return // Do nothing;
		}
		else {

			if (this.state.organ === "") {

				// No need to remove any existing class
				// Get corresponding organ element and set class
				const organEl = this.getOrganEl(activeOrgan);
				organEl.setAttribute('class', compStyles.active);
			}
			else {

				// Get organ with active class, and remove class
				const organEl = this.getOrganEl(this.state.organ);
				organEl.removeAttribute('class');
			}

			// Update state with active organ
			this.setState({organ: activeOrgan});
		}
	};

	render() {
		return (
			<HumanBodyDiagram className={compStyles.humanBody}/>
		);
	}
}

export default ExploreDiagram;
