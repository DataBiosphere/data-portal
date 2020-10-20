/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal layout component; works as wrapper around site component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Banner from "./banner/banner";
import Footer from "./footer/footer";
import Header from "./header/header";
import HCAMain from "./hcaMain/hcaMain";
import PageHead from "./pageHead/pageHead";
import SEO from "./seo/seo";
import SupportRequest from "./supportRequest/supportRequest";

// Styles
import compStyles from "./layout.module.css";

let classNames = require("classnames");

require("katex/dist/katex.min.css");

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noScroll: false,
            supportRequestActive: false
        };
    }

    onMenuOpen = (event) => {

        this.setState({noScroll: !event});
    };

    onToggleSupportRequestForm = (active) => {

        this.setState({supportRequestActive: active});
    };

    render() {
        const {children, description, docPath, healthy, homePage, homeTab,
            metadataContent, nav, pageTitle, sectionTitle, showAllMetadata} = this.props;
        const {noScroll, supportRequestActive} = this.state;
        return (
            <div>
                <PageHead pageTitle={pageTitle}/>
                <SEO description={description} pageTitle={pageTitle}/>
                <div className={classNames(compStyles.site, {[compStyles.noScroll]: noScroll})}>
                    <Header onMenuOpen={this.onMenuOpen.bind(this)} homePage={homePage} docPath={docPath}/>
                    <Banner position={"top"} healthy={healthy}/>
                    {homePage ? children :
                        <HCAMain docPath={docPath}
                                 homeTab={homeTab}
                                 metadataContent={metadataContent}
                                 nav={nav}
                                 onMenuOpen={this.onMenuOpen.bind(this)}
                                 sectionTitle={sectionTitle}
                                 showAllMetadata={showAllMetadata}>{children}</HCAMain>}
                    <SupportRequest active={supportRequestActive} onToggle={(active) => this.onToggleSupportRequestForm(active)}/>
                    <Banner position={"bottom"}/>
                    <Footer onFeedbackClicked={() => this.onToggleSupportRequestForm(true)}/>
                    <div id="portal"/>
                </div>
            </div>
        )
    }
}

export default Layout;
