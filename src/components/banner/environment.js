/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal production environment component.
 */

// Core dependencies
import Cookies from 'js-cookie';
import React from 'react';

// Styles
import compStyles from './environment.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

class Environment extends React.Component {

	constructor(props) {
		super(props);
		this.accept.bind(this);
		this.state = {visible: false};
	}

	componentDidMount() {

		const {cookieName} = this.props;

		if (Cookies.get(cookieName) === undefined) {
			this.setState({visible: true});
		}

		if (Cookies.get(cookieName) === true) {
			this.setState({visible: false});
		}
	}

	accept = () => {

		const {cookieName} = this.props;

		Cookies.set(cookieName, true, { expires: new Date(2300, 1, 1) });
		this.setState({visible: false});
	};

	render() {

		if (!this.state.visible) {
			return null;
		}

		return (
			<div className={compStyles.environment}>
				<div className={globalStyles.bannerWrapper}>
					<div>
						<p className={classNames(fontStyles.s, fontStyles.bgDark, fontStyles.noMargin)}>{this.props.message}</p>
					</div>
					<div
						className={classNames(globalStyles.button, globalStyles.bgDark, globalStyles.outline, compStyles.narrow)}
						onClick={() => {
							this.accept()
						}}>OK
					</div>
				</div>
			</div>
		);
	}
}

export default Environment;
export {Cookies};
