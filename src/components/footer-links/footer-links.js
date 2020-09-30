/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer links component.
 */

// Core dependencies
import React from "react";

// App dependencies
import FooterLink from "../footer-link/footer-link";
import * as FooterService from "../../utils/footer.service";

// Styles
import compStyles from "./footer-links.module.css";

class FooterLinks extends React.Component {

    render() {
        const {links, onFeedbackClicked} = this.props;
        const feedbackLink = {
            name: "Feedback",
            clickFn: onFeedbackClicked
        };
        links.push(feedbackLink);
        return (
            <div className={compStyles.links}>
                {links.map((link, l) => <FooterLink key={l} link={link}/>)}
            </div>
        );
    }
}

export default ({onFeedbackClicked}) => {

    const footerLinks = FooterService.getFooterLinks();

    return (
        <FooterLinks links={footerLinks} onFeedbackClicked={onFeedbackClicked}/>
    )
}
