/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer link component.
 */

// Core dependencies
import Link from 'gatsby-link'
import React from 'react'

// Styles
import compStyles from './footer-link.module.css'
import fontStyles from '../../styles/fontsize.module.css'

let classNames = require('classnames')

class FooterLink extends React.Component {
  render() {
    const { link } = this.props,
      { clickFn, name, path } = link || {}
    const footerLinkClassName = classNames(
      fontStyles.bgDark,
      compStyles.link,
      fontStyles.s
    )
    return (
      <>
        {clickFn ? (
          <button className={compStyles.button} onClick={clickFn}>
            {name}
          </button>
        ) : (
          <Link to={path} className={footerLinkClassName}>
            {name}
          </Link>
        )}
      </>
    )
  }
}

export default FooterLink
