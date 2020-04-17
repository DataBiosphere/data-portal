/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal click handler component.
 * Available for use by non-interactive elements with click handlers.
 */

// Core dependencies
import React from 'react';

// Styles
import compStyles from './clickHandler.module.css';

let classNames = require('classnames');

class ClickHandler extends React.Component {

	handleKeyDown = (e, clickAction) => {

		if ( e.key === 'Enter' || e.key === ' ' ) {

			clickAction();
		}
	};

	render() {
		const {children, className, clickAction, id, tag: Tag} = this.props;

		return (
			<Tag className={classNames(className, compStyles.handler)} id={id} onClick={clickAction}
				 onKeyDown={(e) => this.handleKeyDown(e, clickAction)} role='button' tabIndex={0}>{children}</Tag>
		);
	}
}

export default ClickHandler;
