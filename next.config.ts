import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'upload.wikimedia.org', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.dongsuh.co.kr', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'noogifurniture.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: '8apm.co.kr', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'breezm.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'logos-world.net', port: '', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/pres',
        destination: '/ko/press',
        permanent: true,
      },
      {
        source: '/ssmeprogram',
        destination: '/sme-startup-program',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/1BWS',
        destination: '/1BWS/index.html',
      },
      {
        source: '/1BWS/',
        destination: '/1BWS/index.html',
      },
      {
        source: '/1bws',
        destination: '/1BWS/index.html',
      },
      {
        source: '/1bws/',
        destination: '/1BWS/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/1BWS/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/1BWS',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/1bws',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
