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
import AnnouncementCatalog from "./announcementCatalog/announcementCatalog";
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
            scrollable: true,
            supportRequestActive: false
        };
    }

    onHandleSiteScroll = (scrollable) => {

        this.setState({scrollable: scrollable});
    };

    onToggleSupportRequestForm = (active) => {

        this.setState({supportRequestActive: active});
    };

    render() {
        const {activeLocation, children, description, docPath, healthy, homePage, homeTab,
            metadataContent, nav, pageTitle, sectionTitle} = this.props;
        const {scrollable, supportRequestActive} = this.state;
        return (
            <div>
                <PageHead pageTitle={pageTitle}/>
                <SEO description={description} pageTitle={pageTitle}/>
                <div className={classNames(compStyles.site, {[compStyles.noScroll]: !scrollable})}>
                    <Header onHandleSiteScroll={this.onHandleSiteScroll} homePage={homePage} docPath={docPath}/>
                    <AnnouncementCatalog/>
                    <Banner position={"top"} healthy={healthy}/>
                    {homePage ? children :
                        <HCAMain activeLocation={activeLocation}
                                 docPath={docPath}
                                 homeTab={homeTab}
                                 metadataContent={metadataContent}
                                 nav={nav}
                                 onHandleSiteScroll={this.onHandleSiteScroll}
                                 sectionTitle={sectionTitle}>{children}</HCAMain>}
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
