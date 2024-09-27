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
      {
        protocol: "https",
        hostname: "cultura-verde-bucket.s3.sa-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
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
  async redirects() {
    return [
      {
        source: '/sitemap-misc.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap-pt-page-2013-05.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // Adicione mais redirecionamentos conforme necessário
    ];
  },
};

export default nextConfig;