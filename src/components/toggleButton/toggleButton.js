/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toggle button component.
 */

// Core dependencies
import React from 'react'

// Styles
import compStyles from './toggleButton.module.css'

let classNames = require('classnames')

class ToggleButton extends React.Component {
  render() {
    const { children, className, clickAction } = this.props
    return (
      <button
        className={classNames(className, compStyles.toggle)}
        onClick={clickAction}
      >
        {children}
      </button>
    )
  }
}

export default ToggleButton
