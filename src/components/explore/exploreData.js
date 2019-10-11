/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal explore data component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import ExploreControls from "./exploreControls";
import ExploreDiagram from "./exploreDiagram";

// Styles
import compStyles from './exploreData.module.css';
import mainStyles from '../../pages/index.module.css';

let classNames = require('classnames');

class ExploreData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {organ: ""};
	}

	onActiveOrgan = (event) => {
		this.setState({organ: event});
	};

	render() {
		const {organ} = this.state;
		return (
			<div className={classNames(mainStyles.module, mainStyles.spacer, compStyles.exploring)}>
				<ExploreControls onActiveOrgan={this.onActiveOrgan.bind(this)}/>
				<ExploreDiagram activeOrgan={organ}/>
			</div>
		);
	}
}

export default ExploreData;
