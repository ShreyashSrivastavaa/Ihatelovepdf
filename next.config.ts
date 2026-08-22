import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        pptxgenjs: path.resolve(process.cwd(), 'node_modules/pptxgenjs/dist/pptxgen.bundle.js'),
      },
      fallback: {
        ...(config.resolve?.fallback || {}),
        fs: false,
        https: false,
        http: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
        zlib: false,
        url: false,
      },
    };

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: any) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );

    return config;
  },
};

export default nextConfig;
