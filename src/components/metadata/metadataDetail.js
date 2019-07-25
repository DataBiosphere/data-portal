/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata detail component.
 */

// Core dependencies
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// App dependencies
import HeadingTag from '../anchor/anchor';
import Linkify from 'react-linkify';

// Styles
import compStyles from './metadataDetail.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class MetadataDetail extends React.Component {

	render() {
		const {anchor, exampleOrEnum, description, groupRef, isRequired, label, type, unFriendly} = this.props;
		return (
			<div className={classNames(compStyles.metadataDetail, {[compStyles.byGroup]: groupRef})}>
					<span
						className={classNames({[fontStyles.xs]: !groupRef}, {[fontStyles.semiBold]: !groupRef}, {[fontStyles.l]: groupRef}, compStyles.title)}>{label}
						{isRequired ? <span className={fontStyles.xs}>*</span> : null}{groupRef ?
							<span className={classNames(fontStyles.xxs, compStyles.type)}>({type})</span> : null}
						{anchor ? <HeadingTag anchor={anchor}/> : null}</span>
				{unFriendly && !groupRef ? <CopyToClipboard text={unFriendly}>
					<span className={classNames(fontStyles.hcaCode, compStyles.unFriendly)}>
						{unFriendly.split('.').map((u, i, a) =>
							<span key={i}>{i !== 0 ? '.' : ''}{u}{i === a.length - 1 ? <i className='material-icons'>file_copy</i> : ''}</span>)}
					</span>
				</CopyToClipboard> : null}
				{type && !groupRef ? <span
					className={classNames(fontStyles.xxs, compStyles.type)}>{type}</span> : null}
				{description ? <Linkify
					className={classNames(fontStyles.xs, compStyles.description)}>{description}</Linkify> : null}
				{exampleOrEnum ?
					<span className={classNames(fontStyles.xs, compStyles.example)}>{exampleOrEnum}</span> : null}
			</div>
		);
	}
}

export default MetadataDetail;
