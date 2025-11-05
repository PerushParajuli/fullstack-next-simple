import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"], //“Hey, it’s safe to fetch images from lh3.googleusercontent.com. I trust this host.”
  },
};

export default nextConfig;
