/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Page displaying 404 (page not found) errors.
 */

// Core dependencies
import Link from "gatsby-link";
import {navigate} from "@reach/router";
import React from "react";

// App dependencies
import Layout from "../components/layout";

// Styles
import compStyles from "./error.module.css";
import fontStyles from "../styles/fontsize.module.css";
import globalStyles from "../styles/global.module.css";

const shouldPageRedirect = () => {

    const pathname = typeof window !== "undefined" ? window.location.pathname : "";

    if ( pathname === "/metadata" ) {

        navigate("/metadata/dictionary/biomaterial/cell_line");
    }
};

shouldPageRedirect();

function NotFoundPage() {
    return (
        <Layout homeTab={true} sectionTitle={"Page Not Found"}>
            <div className={compStyles.cellImage}/>
            <h1 className={globalStyles.md}>Oops!</h1>
            <p className={fontStyles.m}>We can’t find the page you were looking for.</p>
            <p className={fontStyles.m}>Here are some helpful links instead:</p>
            <p><Link to="/">Home Page</Link></p>
            <p><Link to="/contact">Contact</Link></p>
        </Layout>
    )
}

export default NotFoundPage;
