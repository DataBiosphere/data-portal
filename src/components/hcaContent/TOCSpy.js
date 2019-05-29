/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC spy component.
 * Provides event listener for scroll and hashchange events.
 */

// Core dependencies
import React from 'react';

class TOCSpy extends React.Component {

	elementIdsByAnchorFromTop = new Map();

	constructor(props) {
		super(props);
		this.state = ({activeTOC: ''});
		this.handleScroll = this.handleScroll.bind(this);
		this.handleHashChange = this.handleHashChange.bind(this);
	}

	componentDidMount() {
		this.getPageAnchors();
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('hashchange', this.handleHashChange, false);
	};

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('hashchange', this.handleHashChange, false);
	};

	getPageAnchors = () => {

		let anchorables = Array.from(document.getElementById('hcaContent').querySelectorAll("[id]"));
		let currentScrollPos = window.scrollY;

		anchorables.forEach(pageAnchor => {
			if (pageAnchor.tagName.toUpperCase().split('H')[1] <= 3 || pageAnchor.tagName === 'DIV') {
				this.elementIdsByAnchorFromTop.set((pageAnchor.getBoundingClientRect().top + currentScrollPos), pageAnchor.id);
			}
		});
	};

	handleHashChange = () => {
		this.setState({activeTOC: window.location.hash});
		this.props.onTOCChange(this.state.activeTOC);
	};

	handleScroll = () => {

		let currentScrollPos = window.scrollY + 28;
		let endScrollPos = document.body.clientHeight - window.innerHeight + 28;

		// Check not at the bottom of the page
		if (currentScrollPos !== endScrollPos) {

			let currentAnchorPos;

			for (let anchorPos of this.elementIdsByAnchorFromTop.keys()) {

				if (currentScrollPos >= anchorPos) {
					currentAnchorPos = anchorPos;
				}
				else {
					break; // exit iterator
				}
			}

			let currentElementId = `#${this.elementIdsByAnchorFromTop.get(currentAnchorPos)}`;

			if (currentElementId !== this.state.activeTOC) {

				if (currentAnchorPos !== undefined) {

					window.history.pushState(null, '', `#${this.elementIdsByAnchorFromTop.get(currentAnchorPos)}`);
					this.setState({activeTOC: currentElementId});
					this.props.onTOCChange(this.state.activeTOC);
				}
				else {
					window.history.pushState(null, '', window.location.pathname);
					this.setState({activeTOC: ''});
					this.props.onTOCChange(this.state.activeTOC);
				}
			}
		}
	};

	render() {
		return this.props.children
	}
}

export default TOCSpy;
