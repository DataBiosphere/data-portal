import { SectionTitle } from "@databiosphere/findable-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { Typography } from "@mui/material";
import { Coordinator } from "../../../../../@types/network";
import { SectionContent } from "../../section.styles";
import { Section } from "./coordinators.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

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
          <Typography
            key={fullName}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
          >
            {fullName}
          </Typography>
        ))}
        {email && <Link label={email} url={`mailto:${email}`} />}
      </SectionContent>
    </Section>
  );
};
