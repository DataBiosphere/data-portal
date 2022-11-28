/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search partners component.
 */

// Core dependencies
import React, { useEffect, useState } from "react";

// App dependencies
import { Partner } from "../common/entities";
import SearchPartner from "../searchPartner/searchPartner";

// Styles
import { partners as searchPartners } from "./searchPartners.module.css";

interface Props {
  partners: Partner[];
  searchPath: string;
  searchTerms: string;
  selectedPartner: string;
}

export default function SearchPartners({
  partners,
  searchPath,
  searchTerms,
  selectedPartner: activePartner,
}: Props): JSX.Element | null {
  const [selectedPartner, setSelectedPartner] = useState<string>("");

  // Updates state selectedPartner.
  useEffect(() => {
    setSelectedPartner(activePartner);
  }, [activePartner]);

  /**
   * Update state selected partner.
   * @param partner - New selected partner.
   */
  const updateSelectedPartner = (partner: string) => {
    setSelectedPartner(partner);
  };

  return partners.length > 1 ? (
    <ul className={searchPartners}>
      {partners.map((partner) => (
        <SearchPartner
          key={partner.label}
          partner={partner}
          searchPath={searchPath}
          searchTerms={searchTerms}
          selectedPartner={selectedPartner}
          updateSelectedPartnerFn={updateSelectedPartner}
        />
      ))}
    </ul>
  ) : null;
}
