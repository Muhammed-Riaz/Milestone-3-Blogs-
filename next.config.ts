/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // The protocol used by your image URLs
        hostname: "cdn.sanity.io", // Sanity's image CDN hostname
        pathname: "/images/**", // Match all images under the `/images` path
      },
    ],
  },
  return : [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self';",
        },
      ],
    },
  ]
  
};

module.exports = nextConfig;
