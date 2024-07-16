import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phantom-localdev.s3.us-west-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mundo-app.s3.us-west-1.amazonaws.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/apple-app-site-association",
        destination: "/.well-known/apple-app-site-association.json",
      },
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/.well-known/apple-app-site-association.json",
      },
    ];
  },
};

export default nextConfig;
