import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allows all paths under this domain
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*', // Match all API routes
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://fanspherebackend.vercel.app' }, // Replace with your frontend domain
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  // Explicitly use Webpack to avoid Turbopack conflicts
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optional: Polyfills or other Webpack configurations
    }
    return config;
  },
  experimental: {
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/google", // frontend path
        destination: "https://fanspherebackend.vercel.app/api/auth/google", // backend path
      },
    ];
  },
};

// Enable bundle analyzer if ANALYZE=true
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
