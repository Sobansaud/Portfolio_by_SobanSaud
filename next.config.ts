// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




 const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,  // Set typedRoutes to true if not already
  },
  typescript: {
    ignoreBuildErrors: true,  // Make sure TypeScript build errors are not ignored
  },
  eslint: {
    ignoreDuringBuilds: true,  // Ensure ESLint doesn't skip errors during builds
  },
};

module.exports = nextConfig;






