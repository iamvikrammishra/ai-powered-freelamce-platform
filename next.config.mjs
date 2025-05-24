/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['github.com', 'lh3.googleusercontent.com'],
  },
  // Indicate that we're using src directory for better code organization
  distDir: '.next',
  // Ensure experimental features are enabled if needed
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:3002']
    },
  },
}

export default nextConfig
