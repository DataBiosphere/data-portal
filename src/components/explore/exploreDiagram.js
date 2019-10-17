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

		// Note, svg organ element id stem should correspond with browser cell count summary label
		return organ ? document.querySelector(`[id^=path${organ}]`) : null // Returns corresponding organ element when organ is specified
	};

	setOrganAttributes = () => {

		// Get (current) active organ and its corresponding element
		const prevOrgan = this.state.organ;
		const prevOrganEl = this.getOrganEl(prevOrgan);

		// Get (new) active organ and its corresponding element
		const nextOrgan = this.props.activeOrgan;
		const nextOrganEl = this.getOrganEl(nextOrgan);

		// Update state when active organ does not equal current organ
		if ( nextOrgan !== prevOrgan ) {

			// Update state with (new) active organ
			this.setState({organ: nextOrgan});
		}

		// Remove class when current organ is valid with a corresponding element
		if ( prevOrganEl ) {

			prevOrganEl.removeAttribute('class');
		}

		// Add class when new organ is valid with a corresponding element
		if ( nextOrganEl ) {

			// Set class to corresponding next organ element - if exists
			nextOrganEl.setAttribute('class', compStyles.active);
		}
	};

	render() {
		return (
			<HumanBodyDiagram className={compStyles.humanBody}/>
		);
	}
}

export default ExploreDiagram;
