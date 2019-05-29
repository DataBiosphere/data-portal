/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content component.
 * Provides navigation and TOC for backpages and metadata.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Nav from '../nav/nav';
import TOC from '../toc/toc';
import TOCSpy from './TOCSpy';

// Styles
import compStyles from './hcaContent.module.css';

let classNames = require('classnames');

class HCAContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = ({activeTOC: '', isTOC: true});
	}

	onTOCChange = (event) => {
		this.setState({activeTOC: event});
	};

	isTOC = (event) => {
		this.setState({isTOC: event});
	};

	render() {
		const {children, docPath, noNav} = this.props;
		return (
			<div
				className={classNames(compStyles.hcaContent, {[compStyles.noNav]: noNav})}>
				{noNav ? null : <Nav docPath={docPath}/>}
				<TOCSpy onTOCChange={this.onTOCChange.bind(this)}>
					<div id={'hcaContent'} className={compStyles.hcaContentInner}>{children}</div>
				</TOCSpy>
				{this.state.isTOC && !noNav ?
					<TOC activeTOC={this.state.activeTOC} docPath={docPath} isTOC={this.isTOC.bind(this)}/> : null}
			</div>
		);
	}
}

export default (props) => {

	return (
		<HCAContent {...props}/>
	);
}
