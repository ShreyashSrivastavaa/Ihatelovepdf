import type { NextConfig } from "next";
import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config, { isServer, webpack }) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        pptxgenjs: path.resolve(process.cwd(), 'node_modules/pptxgenjs/dist/pptxgen.es.js'),
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

export default withBundleAnalyzer(nextConfig);
