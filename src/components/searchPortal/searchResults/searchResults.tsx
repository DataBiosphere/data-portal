/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search results component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SearchResult, { SearchResponse } from "../searchResult/searchResult";

interface Props {
  results: SearchResponse[];
  searchTerms: string;
}

export default function SearchResults({
  results,
  searchTerms,
}: Props): JSX.Element {
  return (
    <>
      {results.map((result) => (
        <SearchResult
          key={result.link}
          result={result}
          searchTerms={searchTerms}
        />
      ))}
    </>
  );
}
