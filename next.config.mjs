/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pmmklsypwouryxzxzjmz.supabase.co",
        port: "",
        protocol: "https",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export", //static export
};
export default nextConfig;
