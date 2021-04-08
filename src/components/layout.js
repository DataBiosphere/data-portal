/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal layout component; works as wrapper around site component.
 */

// Core dependencies
import React from "react";

// App dependencies
import AnnouncementCatalog from "./announcementCatalog/announcementCatalog";
import Banner from "./banner/banner";
import Footer from "./footer/footer";
import Header from "./header/header";
import HCAMain from "./hcaMain/hcaMain";
import PageHead from "./pageHead/pageHead";
import SEO from "./seo/seo";
import SupportRequest from "./supportRequest/supportRequest";

// Styles
import compStyles from "./layout.module.css";
import {GASource} from "../utils/dp-gtm/ga-source.model";

const classNames = require("classnames");

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

    onToggleSupportRequestForm = (active, source) => {
        
        this.setState({
            supportRequestActive: active,
            supportRequestSource: active ? source : null
        });
    };

    render() {
        const {activeLocation, children, description, docPath, healthy, homePage, homeTab,
            metadataContent, nav, pageTitle, sectionTitle} = this.props;
        const {scrollable, supportRequestActive, supportRequestSource} = this.state;
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
                    <SupportRequest active={supportRequestActive}
                                    source={supportRequestSource}
                                    onToggle={(active, source) => this.onToggleSupportRequestForm(active, source)}/>
                    <Banner position={"bottom"}/>
                    <Footer onFeedbackClicked={() => this.onToggleSupportRequestForm(true, GASource.FOOTER)}/>
                    <div id="portal"/>
                </div>
            </div>
        )
    }
}

export default Layout;
