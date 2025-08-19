/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for Vercel (enables API routes)
  // output: 'export', // Commented out for Vercel deployment
  trailingSlash: true,
  // Remove basePath for Vercel (will be root domain)
  // basePath: '/Grade6MathsTutor', // Commented out for Vercel
  // assetPrefix: '/Grade6MathsTutor', // Commented out for Vercel
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
