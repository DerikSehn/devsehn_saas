/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com.br",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "deriksehnstorage.s3.amazonaws.com",
        port: "",
        pathname: "/email/**",
      },
      /* https://lh3.googleusercontent.com/a-/ALV-UjWqrLxJhbPVeY2EAWpsQ2jOumWRUxC490fKN6U1XpoJhs7XzM0o=s128-c0x00000000-cc-rp-mo */
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/public/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;

