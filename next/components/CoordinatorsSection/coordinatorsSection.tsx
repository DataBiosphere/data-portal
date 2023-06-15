import { CollapsableSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import { Link as EmailLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface CoordinatorsSectionProps {
  coordinators: string[];
  email?: string;
  title: string;
}

export const CoordinatorsSection = ({
  coordinators,
  email,
  title,
}: CoordinatorsSectionProps): JSX.Element => {
  return (
    <CollapsableSection title={title}>
      {coordinators.map((coodinator) => (
        <Typography key={coodinator}>{coodinator}</Typography>
      ))}
      {email && (
        <Link href={`mailto:${email}`} passHref>
          <EmailLink>{email}</EmailLink>
        </Link>
      )}
    </CollapsableSection>
  );
};
