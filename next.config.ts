import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.google.com",
      },
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "xwiqrnwysxhuuwdfigqc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
