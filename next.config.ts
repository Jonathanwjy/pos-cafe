import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://rixucdnhczzgnyhxajru.storage.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rixucdnhczzgnyhxajru.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
