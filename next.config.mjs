/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Solo ignorar en desarrollo - en producción deben corregirse
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    // Solo ignorar en desarrollo - en producción deben corregirse
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    // Habilitar optimización en producción
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'auth.sergihno.cl',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
