import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/devops-sast-reports",
  trailingSlash: true,
};

export default nextConfig;
