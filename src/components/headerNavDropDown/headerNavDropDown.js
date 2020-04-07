/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header nav drop down component.
 */

// Core dependencies
import React from 'react';

// Styles
import compStyles from './headerNavDropDown.module.css';

let classNames = require('classnames');

class HeaderNavDropDown extends React.Component {

	constructor(props) {
		super(props);
		this.state = {openDropDown: false};
		this.dropDown = React.createRef();
		this.toggleDropDown = this.toggleDropDown.bind(this);
	}

	componentDidMount() {

		document.addEventListener('mousedown', this.handleClick, false);
	};

	componentWillUnmount() {

		window.removeEventListener('mousedown', this.handleClick, false);
	}

	addDropDownClass = (child) => {

		const {stack} = this.props,
			{openDropDown} = this.state;

		const className = classNames(compStyles.dropDownMenu, {[compStyles.show]: openDropDown}, {[compStyles.stack]: stack});
		const props = {className};

		return React.cloneElement(child, props);
	};

	handleClick = (e) => {

		if ( this.dropDown.current && !this.dropDown.current.contains(e.target) ) {

			this.setState({openDropDown: false});
		}
	};

	toggleDropDown = () => {

		this.setState({openDropDown: !this.state.openDropDown})
	};

	render() {
		const {activeClassName, children} = this.props,
			label = children.find(child => child.type.name === 'HeaderNavDisplay'),
			list = children.find(child => child.type === 'ul'),
			menu = list ? this.addDropDownClass(list) : null;

		return (
			<li className={compStyles.dropDown} ref={this.dropDown}>
				<button className={activeClassName} onClick={this.toggleDropDown}>{label}</button>
				{menu}
			</li>
		);
	}
}

export default HeaderNavDropDown;
