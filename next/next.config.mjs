import nextMDX from "@next/mdx";
import withOptimizedImages from "next-optimized-images";
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the alias for the peer dependency
    config.resolve.alias["@emotion/react"] = path.resolve(
      process.cwd(),
      "node_modules/@emotion/react"
    );
    config.resolve.alias["@emotion/styled"] = path.resolve(
      process.cwd(),
      "node_modules/@emotion/styled"
    );
    config.resolve.alias["@mui/icons-material"] = path.resolve(
      process.cwd(),
      "node_modules/@mui/icons-material"
    );
    config.resolve.alias["@mui/material"] = path.resolve(
      process.cwd(),
      "node_modules/@mui/material"
    );
    config.resolve.alias["isomorphic-dompurify"] = path.resolve(
      process.cwd(),
      "node_modules/isomorphic-dompurify"
    );
    config.resolve.alias["next"] = path.resolve(
      process.cwd(),
      "node_modules/next"
    );
    config.resolve.alias["react"] = path.resolve(
      process.cwd(),
      "node_modules/react"
    );
    config.resolve.alias["react-dom"] = path.resolve(
      process.cwd(),
      "node_modules/react-dom"
    );
    config.resolve.alias["react-dropzone"] = path.resolve(
      process.cwd(),
      "node_modules/react-dropzone"
    );
    config.resolve.alias["uuid"] = path.resolve(
      process.cwd(),
      "node_modules/uuid"
    );
    config.resolve.alias["validate.js"] = path.resolve(
      process.cwd(),
      "node_modules/validate.js"
    );
    return config;
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

const mdxConfig = withMDX({
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  ...nextConfig,
});

export default withOptimizedImages(mdxConfig, {
  optimizeImagesInDev: true,
  handleImages: ["jpeg", "png", "svg"],
  imagesFolder: "images",
});
