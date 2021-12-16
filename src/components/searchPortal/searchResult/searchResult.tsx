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
  snippet as resultSnippet,
  url as resultUrl,
} from "./searchResult.module.css";

export interface SearchResponse {
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
  const { link, formattedUrl, snippet, title } = result;

  return (
    <div className={resultSnippet}>
      <span>
        <a href={link} rel="noopener">
          <p className={resultUrl}>{formattedUrl}</p>
          <h4>{title}</h4>
        </a>
        <p>{snippet}</p>
      </span>
    </div>
  );
}
