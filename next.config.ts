import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { cpus: 2 },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/courses", destination: "/#courses", permanent: false },
      { source: "/faculty", destination: "/#faculty", permanent: false },
      { source: "/faq", destination: "/#faq", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/apply", destination: "/#apply", permanent: false },
      { source: "/apply-now", destination: "/#apply", permanent: false },
    ];
  },
};

export default nextConfig;
