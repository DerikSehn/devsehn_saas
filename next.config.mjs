/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;

