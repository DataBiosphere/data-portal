import {
  StaticImage,
  StaticImageProps,
} from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { ReactNode } from "react";
import { Figure as FigureWithCaption } from "./figure.styles";

export interface ImageProps extends StaticImageProps {
  caption?: ReactNode;
  hasBorder?: boolean;
}

export const Figure = ({
  caption,
  hasBorder = true,
  ...props /* Spread props to allow for StaticImage specific props StaticImageProps e.g. "height". */
}: ImageProps): JSX.Element => {
  return (
    <FigureWithCaption hasBorder={hasBorder}>
      <StaticImage {...props} />
      {caption && <figcaption>{caption}</figcaption>}
    </FigureWithCaption>
  );
};
