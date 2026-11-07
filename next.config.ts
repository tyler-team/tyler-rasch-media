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
      {
        source: '/ko/press/press-release-261103',
        destination: '/ko/press/1bws-sammy-rashad-middle-east-capital-exodus-261026',
        permanent: true,
      },
      {
        source: '/en/press/why-the-uae-injected-35-billion-dollars-into-egyptian-land',
        destination: '/en/press/1bws-sammy-rashad-middle-east-capital-exodus-261026-en',
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
      {
        source: '/buyeuropean',
        destination: '/buyeuropean/index.html',
      },
      {
        source: '/buyeuropean/',
        destination: '/buyeuropean/index.html',
      },
      {
        source: '/BuyEuropean',
        destination: '/buyeuropean/index.html',
      },
      {
        source: '/BuyEuropean/',
        destination: '/buyeuropean/index.html',
      },
      {
        source: '/buyeuropean2',
        destination: '/buyeuropean2/index.html',
      },
      {
        source: '/buyeuropean2/',
        destination: '/buyeuropean2/index.html',
      },
      {
        source: '/BuyEuropean2',
        destination: '/buyeuropean2/index.html',
      },
      {
        source: '/BuyEuropean2/',
        destination: '/buyeuropean2/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/1BWS/assets/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
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
      {
        source: '/buyeuropean/assets/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/buyeuropean/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/buyeuropean',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/BuyEuropean',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/buyeuropean2/assets/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/buyeuropean2/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/buyeuropean2',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
      {
        source: '/BuyEuropean2',
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
