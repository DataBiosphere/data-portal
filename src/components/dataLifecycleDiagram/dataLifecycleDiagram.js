/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal data lifecycle diagram component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import DataLifecycle from './dataLifecycleDiagram.svg';

// Styles
import compStyles from './dataLifecycleDiagram.module.css';

let classNames = require('classnames');

class DataLifecycleDiagram extends React.Component {

	dataLifecycleStates = [
		{
			name: 'AnalysisPortals',
			cardHeight: 253,
			link: '/analyze',
			text: 'From the Data Portal, we link to a large variety of community portals and method and visualization packages enabling you to perform the most up-to-date and diverse types of data analyses. Any HCA community developer can submit their analysis method to be listed on the HCA Data Portal.'
		},
		{
			name: 'MatrixService',
			cardHeight: 0,
			link: '/apis/api-documentation/matrix-service-api',
			text: ''
		},
		{
			name: 'CLIDataAccess',
			cardHeight: 126,
			link: '',
			text: 'The CLI (Command Line Interface) enables programmatic interaction with the Data Storage System for downloading data files.'
		},
		{
			name: 'HCADataStorage',
			cardHeight: 253,
			link: `${process.env.GATSBY_EXPLORE_URL}`,
			text: 'The interactive Data Browser allows you to search, filter, and read about projects to select the data you want. You can then download the list of datasets as a data manifest or download an expression matrix of the data.  The datasets listed in the file manifest can be downloaded using the CLI.'
		},
		{
			name: 'Pipelines',
			cardHeight: 285,
			link: '/pipelines',
			text: 'Data processing pipelines, approved by the HCA Analysis Working Group, process raw data from some single cell assays, producing matrices and QC metrics files. These pipelines identify genes, quantify transcripts, and assess data quality. Like raw data, processed data are put in the Data Storage System for access by the community.'
		},
		{
			name: 'Storage',
			cardHeight: 190,
			link: '',
			text: 'Validated raw data and metadata files are submitted to the Data Storage System. Storage is provided in both Amazon Web Services (AWS) and Google Cloud Platform (GCP) environments, and data can be accessed from either.'
		},
		{
			name: 'Validation',
			cardHeight: 0,
			link: '',
			text: ''
		},
		{
			name: 'DataCurator',
			cardHeight: 190,
			link: '',
			text: 'Submitters work with a Data Curator to upload the data and metadata and ensure it is well formatted and conforms to file format standards. Metadata is also validated as conforming to HCA metadata standards; errors are identified and corrected for re-uploading.'
		},
		{
			name: 'ResearchData',
			cardHeight: 78,
			link: '',
			text: 'Labs submit their single cell data and associated metadata.'
		}
	];

	dataLifecycleFlowPaths = ['processedDataRetrieveHCAData', 'metaDataRetrieveHCAData', 'rawDataRetrieveHCAData', 'processedDataUploadProcessedData', 'rawDataReceiveRawData', 'rawDataSubmitData', 'metadataSubmitData'];

	hoverBounds = 20; // 10px top and 10px bottom or 10px left and 10px right of active element
	hoverPosition = this.hoverBounds / 2; // Positions hover target area top, left of active element; 10px around active element
	cardWidth = 212;

	constructor(props) {
		super(props);
		this.state = ({hover: false, dataLifecycle: null});
	}

	componentDidMount() {
		this.setStateInteractionAndAttributes();
		this.setFlowPathInteractionAndAttributes();
	}

	componentWillUnmount() {
		this.removeStateInteractionAndAttributes();
		this.removeFlowPathInteractionAndAttributes();
	};

	clearFlowPathActiveClassAndAttributes = (flowPathEl) => {

		return () => {

			// Remove class attributes
			flowPathEl.removeAttribute('class');
		}
	};

	clearStateActiveClassAndAttributes = (stateEl, i) => {

		return () => {

			// Only want to execute active state
			if (i === this.dataLifecycleStates.indexOf(this.state.dataLifecycle)) {

				// Move element up by one position in dom
				this.moveElementUp(stateEl);

				// Set activeLifecycleState to null
				// Set hover state to false - for class 'hover'
				this.setState({hover: false, dataLifecycle: null});

				// Remove class and filter attributes
				stateEl.removeAttribute('class');
				stateEl.removeAttribute('filter');
			}
			else {
				return // do nothing;
			}
		}
	};

	getCardStyles = (state) => {

		// Get state button and its attributes
		let stateButtonEl = document.getElementById(`container${state.name}`);
		let stateButtonAttributes = stateButtonEl.attributes;

		// Calculate card top position
		let topPos = Number(stateButtonAttributes.y.value) + Number(stateButtonAttributes.height.value) + this.hoverPosition;

		// Calculate card left position
		let leftPos = state.name === 'AnalysisPortals' ? this.hoverPosition : (Number(stateButtonAttributes.x.value) + this.hoverPosition);

		return {
			borderRadius: state === this.dataLifecycleStates[0] ? '4px 0 4px 4px' : '0 4px 4px 4px',
			left: leftPos + 'px',
			opacity: 1,
			top: topPos + 'px',
		}

	};

	getCardContainerStyles = (state) => {

		// Get state container and its attributes
		let stateContainerEl = document.getElementById(`state${state.name}`);
		let stateContainerAttributes = stateContainerEl.attributes;

		// Get state container width and height
		let stateContainerWidth = stateContainerEl.getBoundingClientRect().width;
		let stateContainerHeight = stateContainerEl.getBoundingClientRect().height;

		// Calculate card container width and height (10px margin around state container and card)
		let cardContainerWidth = stateContainerWidth > this.cardWidth ? (stateContainerWidth + this.hoverBounds) : (this.cardWidth + this.hoverBounds);
		let cardContainerHeight = stateContainerHeight + state.cardHeight + this.hoverBounds;

		// Calculate card container transform position - insert 'px' into transform value
		let cardContainerTranslate = stateContainerAttributes.transform.value.replace(',', 'px,').replace(')', 'px)');

		let leftPos = state.name === 'AnalysisPortals' ? (stateContainerWidth - this.cardWidth - this.hoverPosition) : (-this.hoverPosition);
		let topPos = -this.hoverPosition;

		return {
			height: cardContainerHeight,
			left: leftPos + 'px',
			top: topPos + 'px',
			transform: cardContainerTranslate,
			width: cardContainerWidth
		}
	};

	moveElementToLast = (stateEl) => {

		stateEl.parentNode.appendChild(stateEl);
	};

	moveElementUp = (stateEl) => {

		stateEl.parentNode.insertBefore(stateEl, stateEl.previousElementSibling);
	};

	removeFlowPathInteractionAndAttributes = () => {

		this.dataLifecycleFlowPaths.forEach(flowPath => {

			// Grab the corresponding flow path
			let flowPathContainerEl = document.getElementById(flowPath);

			// Add interaction for flow path
			flowPathContainerEl.removeEventListener('mouseenter', this.setFlowPathActiveClassAndAttributes(flowPathContainerEl));
			flowPathContainerEl.removeEventListener('mouseleave', this.clearFlowPathActiveClassAndAttributes(flowPathContainerEl));
		})
	};

	removeStateInteractionAndAttributes = () => {

		this.dataLifecycleStates.forEach((state, i) => {

			if (state.text) {
				// Grab the corresponding state/container
				let stateContainerEl = document.getElementById(`state${state.name}`);
				let cardContainerEl = document.getElementById('card');

				// Remove interaction for state/container
				stateContainerEl.removeEventListener('mouseenter', this.setStateActiveClassAndAttributes(stateContainerEl, i));
				cardContainerEl.removeEventListener('mouseleave', this.clearStateActiveClassAndAttributes(stateContainerEl, i));
			}
		})
	};

	setFlowPathActiveClassAndAttributes = (flowPathEl) => {

		return () => {

			// Add class attributes
			flowPathEl.setAttribute('class', compStyles.active);
		}
	};

	setStateActiveClassAndAttributes = (stateEl, i) => {

		return () => {

			// Set dataLifecycle
			// Set hover state to true - for class 'hover'
			this.setState({hover: true, dataLifecycle: this.dataLifecycleStates[i]});

			// Move element down to last position of parent node
			// Provides dom rendering precedence over all other elements and the hover overlay
			this.moveElementToLast(stateEl);

			// Add class and filter attributes
			stateEl.setAttribute('class', compStyles.active);
			stateEl.setAttribute('filter', `url(#shadow${this.state.dataLifecycle.name})`);
		}
	};

	setFlowPathInteractionAndAttributes = () => {

		this.dataLifecycleFlowPaths.forEach(flowPath => {

			// Grab the corresponding flow path
			let flowPathContainerEl = document.getElementById(flowPath);

			// Add interaction for flow path
			flowPathContainerEl.addEventListener('mouseenter', this.setFlowPathActiveClassAndAttributes(flowPathContainerEl));
			flowPathContainerEl.addEventListener('mouseleave', this.clearFlowPathActiveClassAndAttributes(flowPathContainerEl));
		})
	};

	setStateInteractionAndAttributes = () => {

		this.dataLifecycleStates.forEach((state, i) => {

			if (state.text) {
				// Grab the corresponding state/container, and card container
				let stateContainerEl = document.getElementById(`state${state.name}`);
				let cardContainerEl = document.getElementById('card');

				// Add interaction for state/container
				stateContainerEl.addEventListener('mouseenter', this.setStateActiveClassAndAttributes(stateContainerEl, i));
				cardContainerEl.addEventListener('mouseleave', this.clearStateActiveClassAndAttributes(stateContainerEl, i));
			}
		})
	};

	render() {
		let dataLifecycle = this.state.dataLifecycle ? this.state.dataLifecycle : '';
		return (
			<div className={classNames(compStyles.dataLifecycle, {[compStyles.hover]: this.state.hover})}>
				<DataLifecycle/>
				<div id='card' className={compStyles.dataLifecycleCard}
					 style={dataLifecycle ? this.getCardContainerStyles(dataLifecycle) : null}>
					{dataLifecycle ? <div id='card-contents' style={this.getCardStyles(dataLifecycle)}>
						<p>{dataLifecycle.text}</p>
						{dataLifecycle.link ?
							<a href={dataLifecycle.link} target='_blank' rel='noopener noreferrer'>Learn
								More</a> : null}
					</div> : null}
				</div>
			</div>
		);
	}
}

export default DataLifecycleDiagram;
