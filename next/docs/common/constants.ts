import * as C from "../../components";
import { Link } from "../../components/Layout/components/Content/components/Link/link";
import { Table } from "../../components/Layout/components/Content/components/Table/table";
import { StyledTable } from "../../components/Layout/components/Content/components/Table/table.styles";

export const MDX_COMPONENTS = {
  Alert: C.Alert,
  AnchorLink: C.AnchorLink,
  Attributions: C.Attributions,
  CallToActionButton: C.CallToActionButton,
  Figure: C.Figure,
  Link: C.Link,
  StyledTable,
  a: Link,
  table: Table,
};
