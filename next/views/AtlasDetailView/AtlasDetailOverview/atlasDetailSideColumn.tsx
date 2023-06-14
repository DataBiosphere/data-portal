import { CollapsableSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import { Link as EmailLink, Typography } from "@mui/material";
import { useNetwork } from "contexts/networkContext";
import Link from "next/link";
import React from "react";

export const AtlasDetailSideColumn = () => {
  const { coordinators, contact } = useNetwork();

  return (
    <CollapsableSection title="Atlas Coordinators">
      {coordinators.map((coodinator) => (
        <Typography key={coodinator.fullName}>{coodinator.fullName}</Typography>
      ))}
      <Link href={`mailto:${contact.email}`} passHref>
        <EmailLink>{contact.email}</EmailLink>
      </Link>
    </CollapsableSection>
  );
};
