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
      { protocol: 'https', hostname: 'upload.wikimedia.org', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.dongsuh.co.kr', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'noogifurniture.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: '8apm.co.kr', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'breezm.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'logos-world.net', port: '', pathname: '/**' },
    ],
  },
};

export default nextConfig;
