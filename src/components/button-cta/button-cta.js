/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal button cta component.
 * Provides styling to a call to action button.
 * Use of this component within markdown is possible.
 *
 * Children
 * --------
 * Children should have the following format:
 * <button-cta>Button Text</button-cta>
 *
 * For example,
 * <button-cta href="https://data.humancellatlas.org/explore" target="_blank">Explore</button-cta>
 *
 * Note
 * ----
 * - `href` and `target` are both required props of <button-cta> component.
 *
 * - `href` is the URL that the hyperlink points to e.g. "/guides" for an internal link or "https://data.humancellatlas.org/explore" for an external link.
 * - `target` is where to display the linked URL. Its value could be either: "_self" for internal links or "_blank" for external links.
 * - `spacer` is an additional prop (not required for use within markdown).
 *      The prop provides an additional 18px margin to the component bounds.
 *      This ensures there is adequate separation between component rendering and subsequent markdown text.
 *
 * - `href` undefined will default to "/".
 * - `target` undefined will default to "_self".
 * - `spacer` undefined will default to true.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// App dependencies
import {Relationship} from "../../utils/anchor/relationship.model";
import {Target} from "../../utils/anchor/target.model";

// Styles
import buttonStyles from "../button/button.module.css";
import {SurveyName} from "../survey/survey-name";
import * as DPGTMService from "../../utils/dp-gtm/dp-gtm.service";

const classNames = require("classnames");

function ButtonCta(props) {

  const {children, href = "/", spacer = true, target = Target.SELF} = props;
  const classNameButton = classNames(buttonStyles.buttonUnelevatedSecondary, {[buttonStyles.buttonSpacer]: spacer});
  const externalLink = target === Target.BLANK;

  /**
   * Track user clicks on CTA.
   * TODO generalize to handle other CTA's.
   */
  const trackSurveyLaunch = () => {
      DPGTMService.trackSurveyLaunch(SurveyName["2021_SPRING_MATRIX_UX"]);
  }

  return (
      externalLink ?
      <a className={classNameButton}
         href={href}
         onClick={trackSurveyLaunch}
         rel={Relationship.NOOPENER_NOREFERRER}
         target={target}>{children}</a> :
      <Link className={classNameButton} to={href}>{children}</Link>
  );
}

export default ButtonCta;
