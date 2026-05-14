import type { NextConfig } from "next";

const isDeployingToGH = process.env.DEPLOY_GH === 'true';

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isDeployingToGH ? "/dis" : "",
  assetPrefix: isDeployingToGH ? "/dis/" : "",
};

export default nextConfig;
