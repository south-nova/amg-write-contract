/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    domains: ['amgcom.site'], // 허용할 외부 도메인 추가
  },
};

export default nextConfig;
