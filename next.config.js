/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack and use Webpack for stability
  // This resolves the "FATAL: An unexpected Turbopack error occurred" issue
  webpack: (config, { isDev, isServer }) => {
    if (isDev && !isServer) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
    }
    return config;
  },
  // Explicitly set turbopack to false if it's implicitly enabled or configured elsewhere
  // This might not be strictly necessary if webpack config is sufficient, but good for clarity
  experimental: {
    appDir: true,
    turbopack: false, // Ensure Turbopack is explicitly disabled
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 