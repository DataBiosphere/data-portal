/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Page displaying 404 (page not found) errors.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// App dependencies
import Layout from "../components/layout";

// Styles
import * as compStyles from "./error.module.css";
import * as fontStyles from "../styles/fontsize.module.css";

function NotFoundPage() {
  return (
    <Layout homeTab={true} sectionTitle={"Page Not Found"}>
      <div className={compStyles.cellImage} />
      <h1>Oops!</h1>
      <p className={fontStyles.m}>
        We can’t find the page you were looking for.
      </p>
      <p className={fontStyles.m}>Here are some helpful links instead:</p>
      <p>
        <Link to="/">Home Page</Link>
      </p>
      <p>
        <Link to="/contact">Contact</Link>
      </p>
    </Layout>
  );
}

export default NotFoundPage;
