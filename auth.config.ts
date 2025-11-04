import type { NextAuthConfig } from 'next-auth'

// Base URL configuration
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Configuración base de NextAuth que puede ser usada en Edge Runtime
 * Esta configuración NO incluye providers que requieren Node.js runtime
 */
export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/lectura')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return true
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      try {
        // Prevent redirects to internal auth routes
        if (url.includes('/if/') || url.includes('/user')) {
          return baseUrl
        }

        // For other redirects
        if (url.startsWith('http')) {
          const urlObj = new URL(url)
          if (urlObj.origin === baseUrl) {
            return urlObj.pathname + urlObj.search + urlObj.hash
          }
          return baseUrl
        }

        // Ensure URLs are relative
        if (url.startsWith('/')) {
          return url
        }
      } catch (e) {
        console.error('Redirect error:', e)
      }
      return baseUrl
    },
  },
  providers: [], // Los providers se agregan en el route.ts
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  cookies: {
    sessionToken: {
      name: isProduction ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: !isProduction,
  debug: false,
} satisfies NextAuthConfig
