import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import { Coordinator } from "../../../../../@types/network";
import { SectionContent } from "../../section.styles";
import { Section } from "./coordinators.styles";

export interface CoordinatorsProps {
  coordinators: Coordinator[];
  email?: string;
  title: string;
}

export const Coordinators = ({
  coordinators,
  email,
  title,
}: CoordinatorsProps): JSX.Element => {
  return (
    <Section>
      <SectionContent>
        <SectionTitle title={title} />
        {coordinators.map(({ fullName }) => (
          <Typography key={fullName} variant={TEXT_BODY_500}>
            {fullName}
          </Typography>
        ))}
        {email && <Link label={email} url={`mailto:${email}`} />}
      </SectionContent>
    </Section>
  );
};
