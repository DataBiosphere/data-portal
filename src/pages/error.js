/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Page displaying 404 (page not found) errors.
 */

// Core dependencies
import React from "react";

// App dependencies
import Layout from "../components/layout";

// Styles
import compStyles from "./error.module.css";
import fontStyles from "../styles/fontsize.module.css";

const ErrorPage = () => (
  <Layout sectionTitle={"Error"}>
    <div className={compStyles.cellImage} />
    <h1>Oops!</h1>
    <p className={fontStyles.m}>
      An error has occurred processing your request.
    </p>
  </Layout>
);

export default ErrorPage;
