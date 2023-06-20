import NextHead from "next/head";

export const Head = (): JSX.Element => {
  return (
    <NextHead key="page-head">
      <title>HCA Data Portal</title>
      <link href="/bio-networks/favicons/favicon.ico" rel="icon" sizes="any" />
      <link
        href="/bio-networks/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/bio-networks/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
        type="image/png"
      />
      <link href="/bio-networks/favicons/site.webmanifest" rel="manifest" />
    </NextHead>
  );
};
