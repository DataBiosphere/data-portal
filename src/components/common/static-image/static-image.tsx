import React from "react";

export type ImageSrc = string | undefined;

export interface StaticImageProps {
  alt: string;
  height?: number;
  src: ImageSrc;
  width?: number;
}

export default function StaticImage({
  alt,
  height,
  src,
  width,
}: StaticImageProps): JSX.Element {
  return <img alt={alt} height={height} src={src} width={width} />;
}
