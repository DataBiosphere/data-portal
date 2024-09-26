import { ReadonlyURLSearchParams } from "next/navigation";

export interface Error {
  code: number;
  message: string;
  status: string;
}

export type OnSearchFn = ({
  searchIndex,
  searchParams,
}: {
  searchIndex?: number;
  searchParams?: ReadonlyURLSearchParams;
}) => void;

export interface SearchPagination {
  nextPage: number;
  previousPage: number;
}

export interface SearchResponse {
  items?: SearchResponseItem[];
  queries: SearchResponseQuery;
}

export interface SearchResponseError {
  error: Error;
}

export interface SearchResponseItem {
  displayLink: string; // "data.humancellatlas.org".
  formattedUrl: string; // "https://support.terra.bio/.../360041068771--COVID-19-workspaces-data-an...".
  htmlFormattedUrl: string; // "https://support.<b>terra</b>.bio/.../360041068771--COVID-19-workspaces-data-an...".
  htmlSnippet: string; // "Mar 17, 2020 <b>...</b> Discover COVID-19 data and tools in <b>Terra</b> workspaces. Workspaces allow you to get hands-on experience with COVID-19-related data and analyses.".
  htmlTitle: string; // "COVID-19 workspaces, data and tools in <b>Terra</b> – <b>Terra</b> Support".
  kind: string; // "customsearch#result".
  link: string; // "https://support.terra.bio/hc/en-us/articles/360041068771--COVID-19-workspaces-data-and-tools-in-Terra".
  snippet: string; // "Mar 17, 2020 ... Discover COVID-19 data and tools in Terra workspaces. Workspaces allow you to get hands-on experience with COVID-19-related data and analyses.".
  title: string; // "COVID-19 workspaces, data and tools in Terra – Terra Support".
}

export interface SearchResponseQuery {
  nextPage?: SearchResponseRequest[];
  previousPage?: SearchResponseRequest[];
  request: SearchResponseRequest[];
}

export interface SearchResponseRequest {
  count: number;
  cx: string;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  searchTerms: string;
  startIndex: number;
  title: string;
  totalResults: string;
}
