/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search result component.
 */

// Core dependencies
import React from "react";

// Styles
import {
  description,
  domain,
  snippet as resultSnippet,
  url as resultUrl,
} from "./searchResult.module.css";

export interface SearchResponse {
  displayLink: string;
  link: string;
  formattedUrl: string;
  snippet: string;
  title: string;
}

interface Props {
  result: SearchResponse;
  searchTerms: string /* TODO required for tracking */;
}

export default function SearchResult({ result }: Props): JSX.Element {
  const { displayLink, link, formattedUrl, snippet, title } = result;

  return (
    <div className={resultSnippet}>
      <span>
        <a href={link} rel="noopener">
          <p className={domain}>{displayLink}</p>
          <p className={resultUrl}>{formattedUrl}</p>
          <h4>{title}</h4>
        </a>
        <p className={description}>{snippet}</p>
      </span>
    </div>
  );
}
