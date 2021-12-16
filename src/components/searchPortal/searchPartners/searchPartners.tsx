/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search partners component.
 */

// Core dependencies
import React from "react";

// App dependencies
import SearchPartner, { Partner } from "../searchPartner/searchPartner";

// Styles
import { partners as searchPartners } from "./searchPartners.module.css";

interface Props {
  partners: Partner[];
  searchTerms: string;
}

export default function SearchPartners({
  partners,
  searchTerms,
}: Props): JSX.Element | null {
  const showPartners = partners.length > 1;

  return showPartners ? (
    <ul className={searchPartners}>
      {partners.map((partner) => (
        <SearchPartner
          key={partner.label}
          partner={partner}
          searchTerms={searchTerms}
        />
      ))}
    </ul>
  ) : null;
}
