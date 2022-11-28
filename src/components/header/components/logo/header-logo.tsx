import { Link } from "gatsby";
import React from "react";
import { Logo } from "../../common/entities";
import StaticImage from "../../../common/static-image/static-image";

interface Props {
  logo: Logo;
}

export default function HeaderLogo({ logo }: Props): JSX.Element {
  const { alt, height, link, src, width } = logo;
  return (
    <Link to={link}>
      <StaticImage alt={alt} height={height} src={src} width={width} />
    </Link>
  );
}
