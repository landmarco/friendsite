/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — matches how the site already deploys to GitHub Pages.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig