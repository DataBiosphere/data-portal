/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Home page component.
 */

// Core dependencies
import Link from 'gatsby-link'
import React from 'react'

const IndexPage = () => (
    <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <p>Now I know!</p>
        <Link to="/page-2/">Go to page 2</Link>
    </div>
)

export default IndexPage
