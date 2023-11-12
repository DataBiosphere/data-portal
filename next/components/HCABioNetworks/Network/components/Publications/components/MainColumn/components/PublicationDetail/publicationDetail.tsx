import {
  Link,
  LinkProps,
} from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Chip, Tooltip } from "@mui/material";
import React from "react";
import { Links } from "./publicationDetail.styles";

export interface PublicationDetailProps {
  label: string;
  links: Pick<LinkProps, "label" | "url">[];
  nTagLabel: string;
}

export const PublicationDetail = ({
  label,
  links,
  nTagLabel,
}: PublicationDetailProps): JSX.Element => {
  const showNTag = links.length > 1;
  return (
    <>
      <span>{label}:</span>
      <span>
        {showNTag ? (
          <Tooltip
            disableInteractive={false}
            placement="top"
            title={
              <Links>
                {links.map((link, i) => (
                  <Link key={i} {...link} />
                ))}
              </Links>
            }
          >
            <Chip label={`${links.length} ${nTagLabel}`} variant="ntag" />
          </Tooltip>
        ) : (
          <Link label={links[0].label} url={links[0].url} />
        )}
      </span>
    </>
  );
};
