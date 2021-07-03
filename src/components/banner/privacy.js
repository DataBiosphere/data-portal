/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal privacy component.
 */

// Core dependencies
import Cookies from 'js-cookie'
import Link from 'gatsby-link'
import React from 'react'

// App dependencies
import ClickHandler from '../clickHandler/clickHandler'
import * as EnvironmentService from '../../utils/environment/environment.service'

// Styles
import compStyles from './privacy.module.css'
import fontStyles from '../../styles/fontsize.module.css'
import globalStyles from '../../styles/global.module.css'

let classNames = require('classnames')

class Privacy extends React.Component {
  constructor(props) {
    super(props)
    this.accept.bind(this)
    this.state = { visible: false }
  }

  componentDidMount() {
    const { cookieName } = this.props

    if (Cookies.get(cookieName) === undefined) {
      this.setState({ visible: true })
    }

    if (Cookies.get(cookieName) === true) {
      this.setState({ visible: false })
    }
  }

  accept = () => {
    const { cookieName } = this.props

    Cookies.set(cookieName, true, { expires: new Date(2300, 1, 1) })
    this.setState({ visible: false })
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    const privacyPath = EnvironmentService.isLungMAP()
      ? '/lungmap-privacy'
      : '/privacy'

    return (
      <div className={compStyles.privacy}>
        <div className={globalStyles.bannerWrapper}>
          <div>
            <p className={classNames(fontStyles.xxs, fontStyles.noMargin)}>
              <span>
                This website uses cookies for security and analytics purposes.
                By using this site, you agree to these uses. Learn more{' '}
              </span>
              <Link to={privacyPath}>here</Link>
              <span>.</span>
            </p>
          </div>
          <ClickHandler
            className={classNames(
              globalStyles.button,
              globalStyles.primary,
              globalStyles.outline,
              compStyles.narrow
            )}
            clickAction={() => this.accept()}
            tag={'div'}
          >
            Got it
          </ClickHandler>
        </div>
      </div>
    )
  }
}

export default Privacy
export { Cookies }
