/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying confirmation message from a successfully submitted Zendesk support request form.
 */

// Core dependencies
import React from 'react'

// Styles
import compStyles from './supportRequestSubmitted.module.css'

class SupportRequestSubmitted extends React.Component {
  render() {
    return (
      <div className={compStyles.supportRequestSubmitted}>
        <h2>Thank You</h2>
        <p>Your request has been submitted.</p>
      </div>
    )
  }
}

export default SupportRequestSubmitted
