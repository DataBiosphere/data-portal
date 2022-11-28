/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal icon component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { ReactNode } from "react";

// App dependencies
import Color from "../ui/color/color";

// Styles
import {
  colorGrayLight,
  colorPrimary,
  colorWhite,
  icon,
} from "./icon.module.css";

interface Props {
  children: ReactNode;
  color?: Color;
  fontSize?: number;
}

const ICON_FONT_SIZE = 24; // default font size is 24px

export default function Icon({
  children,
  color = Color.DEFAULT,
  fontSize = ICON_FONT_SIZE,
}: Props): JSX.Element {
  const classNamesIcon = classNames(icon, {
    [colorGrayLight]: color === Color.GRAY_LIGHT,
    [colorPrimary]: color === Color.PRIMARY,
    [colorWhite]: color === Color.WHITE,
  });

  return (
    <span
      className={classNamesIcon}
      style={{ fontSize: fontSize === ICON_FONT_SIZE ? undefined : fontSize }}
    >
      {children}
    </span>
  );
}
