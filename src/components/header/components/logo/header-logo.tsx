import React from "react";
import { Logo } from "../../common/entities";
import StaticImage from "../../../common/static-image/static-image";
import { Target } from "../../../../utils/anchor/target.model";

interface Props {
  logo: Logo;
}

export default function HeaderLogo({ logo }: Props): JSX.Element {
  const { alt, height, link, src, width } = logo;
  return (
    <a href={link} target={Target.SELF}>
      <StaticImage alt={alt} height={height} src={src} width={width} />
    </a>
  );
}
