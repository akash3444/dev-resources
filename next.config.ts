import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.google.com",
      },
      {
        hostname: "xwiqrnwysxhuuwdfigqc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
