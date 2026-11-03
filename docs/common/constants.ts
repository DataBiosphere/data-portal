import { Attributions } from "@/components/About/components/Attributions/attributions";
import { Figure } from "@/components/common/Figure/figure";
import { Link } from "@/components/Layout/components/Content/components/Link/link";
import { Table } from "@/components/Layout/components/Content/components/Table/table";
import { StyledTable } from "@/components/Layout/components/Content/components/Table/table.styles";
import { Alert } from "@databiosphere/findable-ui/lib/components/common/Alert/alert";
import { AnchorLink } from "@databiosphere/findable-ui/lib/components/common/AnchorLink/anchorLink";
import { CallToActionButton } from "@databiosphere/findable-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import { Link as DXLink } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

export const MDX_COMPONENTS = {
  Alert,
  AnchorLink,
  Attributions,
  CallToActionButton,
  Figure,
  Link: DXLink,
  StyledTable,
  a: Link,
  table: Table,
};
